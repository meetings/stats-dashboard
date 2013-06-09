/* pool.js, answering to /pool requests
 */

var fs = require("fs");

var intent = "stats";
var filename = "version";

exports.pool = function pool() {
    console.log("pool kutsuttiin");

	if (!fs.existsSync(filename)) {
		return "File not found";
	}

	var version = fs.readFileSync(filename, {encoding: "utf8"});

    return intent + " " + version;
}
