let express = require("express");
let ping = require('ping');
let app = express();
let bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/isAlive",  function(req, res){
    console.log("checking if IP is alive: ")
    console.log(req.body)
    ping.sys.probe(req.body.addr, function (isAlive) {
            console.log("ping")
            if (isAlive) {
                res.send(true)
            } else {
                res.send(false)
            }
        }
    )
});





