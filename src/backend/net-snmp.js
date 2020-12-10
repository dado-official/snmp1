const snmp = require("net-snmp");

let options = {
    port: 8080,
    retries: 1,
    timeout: 5000,
    backoff: 1.0,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1,
    backwardsGetNexts: true,
    idBitsSize: 32
};
const session = snmp.createSession("127.0.0.1", "public", options);
const oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.6.0"];

// eslint-disable-next-line no-unused-vars
function get() {

    console.log ("1")
    session.get(oids, function (error, varbinds) {
        console.log("2")
        if (error) {
            console.log("3")
            return "Error: " + error;
        } else {
            console.log("4")
            for (let i = 0; i < varbinds.length; i++)
                if (snmp.isVarbindError(varbinds[i]))
                    return "VarbindError: " + snmp.varbindError(varbinds[i])
                else
                    return "Else: " + varbinds[i].oid + " = " + varbinds[i].value;
        }
        session.close();
    });
}

// eslint-disable-next-line no-unused-vars
function trap() {
    session.trap(snmp.TrapType.LinkDown, function (error) {
        if (error)
            console.error(error);
    });
}

module.exports = {get}
