
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.getConnection({
    network: "master",
    email: argv[0],
    password: argv[1],
    debug: true
})

bazaarConnection.deleteEnvironment("8714ceef-2704-4808-8bae-caba853f8363", function (err, result) {
    if (err) {
        console.error("Error: %j", err);
    } else {
        console.log("%j", result);
    }
})
