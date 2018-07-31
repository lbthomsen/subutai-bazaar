
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.getConnection({
    email: argv[0],
    password: argv[1]
})

bazaarConnection.getPeers("own", function (err, result) {
    if (err) {
        console.error("Error: %j", err);
    } else {
        result.forEach(function (peer) {
            console.log("Peer: %j", peer);
        })
    }
})
