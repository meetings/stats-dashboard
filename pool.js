/* pool.js, answering to /pool requests
 */

var fs = require("fs");

var intent = "stats";
var filename = process.env.VERSION_FILE;

exports.pool = function pool() {
	if (!fs.existsSync(filename)) {
		return "File not found";
	}

    fs.readFile(filename, {encoding: 'utf8'}, function(err, data) {
        if (err) {
            return 'File cannot be read';
        }

        return getPoolName() + ' ' + data;
    })
}

function getPoolName() {
    var prefix = os.hostname().split('-')[0];
    if (prefix === 'live')  prefix = 'stable';
    if (prefix === 'alpha') prefix = 'beta';
    return prefix + '-' + intent;
}
