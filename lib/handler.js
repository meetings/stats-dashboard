/* handler.js
 */

var util = require('util')
var exec = require('child_process').exec

exports.root = function(response) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write(':-)')
    response.end()
}

exports.pool = function(response) {
    exec('git show-ref --tags test', function(err, stdout, stderr) {
        var refs = stdout.split(' ')

        response.writeHead(200, {'Content-Type': 'text/plain'})
        response.write('stats ' + refs[0])
        response.end()

        util.log('Pool responce sent: ' + refs[0])
    })
}

exports.favicon = function() {
    return
}
