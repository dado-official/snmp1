let express = require("express");
let ping = require('ping');
let app = express();
let bodyParser = require('body-parser');
let snmp = require ("net-snmp");
let { StringDecoder } = require('string_decoder');
let BJSON = require('buffer-json')
const find = require('local-devices');


const cors = require('cors');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())


app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/areAlive",  function(req, res){
    console.log("ping")
    find().then(devices => {
        console.log(devices)
        res.json(devices)
    })
});

app.post("/snmpGet", function (req, res){
    let session = snmp.createSession (req.body.addr, "public");
    console.log("SNMP get: " + req.body.oid)
    session.get (req.body.oid, function (error, varbinds) {
        if (error) {
            console.error (error.toString ());
            res.json({err: error.toString()})
        } else {
            for (let i = 0; i < varbinds.length; i++) {
                if (snmp.isVarbindError (varbinds[i])){
                    console.error (snmp.varbindError (varbinds[i]));
                    res.json({err: snmp.varbindError (varbinds[i])});
                } else {
                    console.log (varbinds[i].oid + "|" + varbinds[i].value);
                    let data = {
                        oid: varbinds[i].oid,
                        value: varbinds[i].value
                    }

                    res.json(data)
                }
            }
        }
    });
})

app.post("/snmpWalk", function (req, res){
    console.log(req.body)
    let session = snmp.createSession (req.body.addr, "public");
    let oid = "0.0.0.0";
    let jString ={};
    let key = 'SNMPWalk';
    jString[key] = [];

    function doneCb (error) {
        if (error){
            console.error (error.toString ());
        } else {
            console.log(jString)
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(jString);
    }

    function feedCb (varbinds) {
        for (let i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError(varbinds[i])) {
                console.error("ERR:" + snmp.varbindError(varbinds[i]));
            } else {
                let data = {
                    oid: varbinds[i].oid,
                    value: varbinds[i].value
                }
                console.log(varbinds[i].oid);
                console.log(varbinds[i].value);
                jString[key].push(data);
            }
        }
    }

    console.log("Starting SNMP walk: " + req.body.addr)
    session.walk (oid, feedCb, doneCb)
});





