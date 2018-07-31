
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.getConnection({
    email: argv[0],
    password: argv[1]
})

bazaarConnection.getEnvironments()
    .then(function (result) {
        result.forEach(function (env) {
            console.log("%s %s", env.environment_id, env.environment_name);
        })
    });
