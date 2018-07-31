/*
 * Node module subutai-bazaar
 */

var request = require("request");
var sr = require("sync-request");

var defaultBazaarUrls = {
    default: "https://bazaar.subutai.io",
    prod: "https://bazaar.subutai.io",
    master: "https://masterbazaar.subutai.io",
    dev: "https://devbazaar.subutai.io"
};

var restPath = "/rest/v1/client/";

var BazaarConnection = function () {
    this.url = null;
    this.cookie = null;
}

BazaarConnection.prototype.getEnvironments = function (callback) {

    var options = {
        method: "GET",
        url: this.url + restPath + "environments",
        headers: {
            "Cookie": this.cookie
        }
    };

    if (callback) {
        request(options, function (err, resp, body) {
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

BazaarConnection.prototype.getPeers = function (spec, callback) {

    var options = {
        method: "GET",
        url: this.url + restPath + "peers/" + spec,
        headers: {
            "Cookie": this.cookie
        }
    };

    if (callback) {
        request(options, function (err, resp, body) {
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

exports.getConnection = function (initObject) {

    var bazaarConnection = new BazaarConnection();

    bazaarConnection.url = defaultBazaarUrls.default;
    if (initObject.url) {
        bazaarConnection.url = initObject.url;
    } else if (initObject.network) {
        bazaarConnection.url = defaultBazaarUrls[initObject.network];
    }

    if (initObject.email && initObject.password) {

        var res = sr("POST", bazaarConnection.url + restPath + "login", {

            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },

            body: "email=" + initObject.email + "&password=" + initObject.password

        });


        if (res.statusCode === 200) {
            bazaarConnection.cookie = res.headers["set-cookie"][0];
        } else {
            throw ({ error: "Wrong statuscode" });
        }
    }

    return bazaarConnection;

}

/*
 * vim: ts=4 et nowrap autoindent
 */