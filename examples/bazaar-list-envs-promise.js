
var bazaar = require("../subutai-bazaar");

var argv = process.argv.slice(2);

var bazaarConnection = bazaar.login({
    url: argv[0],
    email: argv[1],
    password: argv[2]
})

bazaarConnection.environments()
    .then(function (result) {
        result.forEach(function (env) {
            console.log("%s %s", env.environment_id, env.environment_name);
        })
    });
