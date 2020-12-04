let snmp = require('snmp-native');
// Create a Session with default settings.
let session = new snmp.Session();

// Create a Session with explicit default host, port, and community.
//let session = new snmp.Session({ host: 'localhost', port: 161, community: 'special' });

// Create an IPv6 Session.
//var session = new snmp.Session({ host: '2001:db8::42', family: 'udp6', community: 'private' });

function get () {
    session.get({oid: [1, 3, 6, 1, 4, 1, 42, 1, 0]}, function (error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
    });
}

function getNext () {
    session.getNext({oid: [1, 3, 6, 1, 4, 1, 42, 1, 0]}, function (error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
    });
}

function getAll () {
    let oids = [[1, 3, 6, 1, 4, 1, 42, 1, 0], [1, 3, 6, 1, 4, 1, 42, 2, 0]];
    session.getAll({oids: oids}, function (error, varbinds) {
        varbinds.forEach(function (vb) {
            console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
        });
    });
}

function getSubtree () {
    session.getSubtree({ oid: [1, 3, 6, 1, 4, 1, 42] }, function (error, varbinds) {
        if (error) {
            console.log('Fail :(');
        } else {
            varbinds.forEach(function (vb) {
                console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            });
        }
    });
}

function set () {
    session.set({oid: [1, 3, 6, 1, 4, 1, 42, 1, 0], value: 42, type: 2}, function (error, varbind) {
        if (error) {
            console.log('Fail :(');
        } else {
            console.log('The set is done.');
        }
    });
}
