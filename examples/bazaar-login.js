
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.getConnection({
    email: argv[0],
    password: argv[1]
})

console.log("Login cookie: %j", bazaarConnection.cookie);

