
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.getConnection({
    network: "master",
    email: argv[0],
    password: argv[1],
    debug: true
})

bazaarConnection.createEnvironment({
    environmentName: "Testing 1 2 3", 
    nodes: [{
            peerId: "744D04AEDEF1811210613E2197CD0B46C050EEDE", 
            hostname: "h1", 
            templateName: "debian-stretch", 
            quota: {
                containerSize: "SMALL"
            }
    }]
}, function (err, result) {
    if (err) {
        console.error("Error: %j", err);
    } else {
        console.log("%j", result);
    }
})
