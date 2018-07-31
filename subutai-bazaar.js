/*
 * Node module subutai-bazaar
 */

var request = require("request");
var sr = require("sync-request");

var BazaarConnection = function () {
    this.url = null;
    this.cookie = null;
}

BazaarConnection.prototype.restRequest = function(method, path, callback) {
    request(this.url);
}

BazaarConnection.prototype.environments = function(callback) {

}

exports.login = function (initObject) {

    if (!initObject.url) {
        throw "Unknown url";
    }

    var res = sr("POST", initObject.url + "/rest/v1/client/login", {

        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },

        body: "email=" + initObject.email + "&password=" + initObject.password

    });

    if (res.statusCode  === 200) {
        var bazaarConnection = new BazaarConnection();
        bazaarConnection.url = initObject.url;
        bazaarConnection.cookie = res.headers["set-cookie"][0];

        return bazaarConnection;
    } else {
        throw({error: "Wrong statuscode"});
    }

}

/*
 * vim: ts=4 et nowrap autoindent
 */