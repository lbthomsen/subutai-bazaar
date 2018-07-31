# subutai-bazaar

Node module for interacting with Subutai Bazaar.

## Installation

Install subutai-bazaar with

`npm install subutai-bazaar@latest`

## Usage

Example: 

```
var bazaar = require("subutai-bazaar");

var bazaarConnection = bazaar.login({
    url: "https://bazaar.subutai.io",
    email: "___YOUREMAIL___",
    password: "___YOURPASSWORD___"
})

bazaarConnection.environments(function (err, result) {
    if (err) {
        console.error("Error: %j", err);
    } else {
        result.forEach(function (env) {
            console.log("%s %s", env.environment_id, env.environment_name);
        })
    }
})
```

If you prefer promises, all methods will return a promise if called without a callback, so 
the above example could be rewritten as:

```
var bazaar = require("../subutai-bazaar");

var bazaarConnection = bazaar.login({
    url: "https://bazaar.subutai.io",
    email: "___YOUREMAIL___",
    password: "___YOURPASSWORD___"
})


bazaarConnection.environments()
    .then(function (result) {
        result.forEach(function (env) {
            console.log("%s %s", env.environment_id, env.environment_name);
        })
    });
```