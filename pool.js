/* pool.js, answering to /pool requests
 */

var fs = require("fs");

var intent = "stats";
var filename = process.env.VERSION_FILE;

exports.pool = function pool() {
	if (!fs.existsSync(filename)) {
		return "File not found";
	}

	var version = fs.readFileSync(filename, {encoding: "utf8"});

    return intent + " " + version;
}
