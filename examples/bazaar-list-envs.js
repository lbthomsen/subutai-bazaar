
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

    var bazaarConnection = bazaar.login({
        url: argv[0], 
        email: argv[1], 
        password: argv[2]
    })

    console.log("Login cookie: %j", bazaarConnection.cookie);
    
