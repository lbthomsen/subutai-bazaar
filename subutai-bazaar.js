/*
 * Node module subutai-bazaar
 */

var request = require("request");
var sr = require("sync-request");

var BazaarConnection = function () {
    this.url = null;
    this.cookie = null;
}   

BazaarConnection.prototype.environments = function (callback) {

    var options = {
        method: "GET",
        url: this.url + "/rest/v1/client/environments",
        headers: {
            "Cookie": this.cookie
        }
    };

    if (callback) {
        request(options, function(err, resp, body) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, JSON.parse(body));
            }
        });
    } else {
        return new Promise(function (resolve, reject) {
            // Do async job
            request.get(options, function (err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(body));
                }
            })
        })
    }

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

    if (res.statusCode === 200) {
        var bazaarConnection = new BazaarConnection();
        bazaarConnection.url = initObject.url;
        bazaarConnection.cookie = res.headers["set-cookie"][0];

        return bazaarConnection;
    } else {
        throw ({ error: "Wrong statuscode" });
    }

}

/*
 * vim: ts=4 et nowrap autoindent
 */