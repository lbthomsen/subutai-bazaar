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
    this.debug = false;
}

BazaarConnection.prototype.handleRequest = function(options, callback) {

    if (this.debug) request.debug = true;

    if (callback) {
        request(options, function (err, resp, body) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, JSON.parse(body));
            }
        });
        return null;
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

BazaarConnection.prototype.getEnvironments = function (callback) {

    var options = {
        method: "GET",
        url: this.url + restPath + "environments",
        headers: {
            "Cookie": this.cookie
        }
    };

    return this.handleRequest(options, callback);

}

BazaarConnection.prototype.getPeers = function (spec, callback) {

    var options = {
        method: "GET",
        url: this.url + restPath + "peers/" + spec,
        headers: {
            "Cookie": this.cookie
        }
    };

    return this.handleRequest(options, callback);

}

BazaarConnection.prototype.updatePeerScope = function (peerId, scope, callback) {

    var options = {
        method: "PUT",
        url: this.url + restPath + "peers/" + peerId + "/scope/" + scope,
        headers: {
            "Cookie": this.cookie
        }
    };

    return this.handleRequest(options, callback);

}

BazaarConnection.prototype.updatePeerName = function (peerId, name, callback) {

    var options = {
        method: "PUT",
        url: this.url + restPath + "peers/" + peerId + "/name/" + scope,
        headers: {
            "Cookie": this.cookie
        }
    };

    return this.handleRequest(options, callback);

}

BazaarConnection.prototype.createEnvironment = function (environment, callback) {

    var options = {
        method: "POST",
        url: this.url + restPath + "environments",
        headers: {
            "Cookie": this.cookie
        }, 
        body: JSON.stringify(environment)
    };

    return this.handleRequest(options, callback);

}

exports.getConnection = function (initObject) {

    var bazaarConnection = new BazaarConnection();

    bazaarConnection.url = defaultBazaarUrls.default;
    if (initObject.url) {
        bazaarConnection.url = initObject.url;
    } else if (initObject.network) {
        bazaarConnection.url = defaultBazaarUrls[initObject.network];
    }

    if (initObject.debug) bazaarConnection.debug = true;

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