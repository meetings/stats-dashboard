/* server.js
 */

var http = require('http')
var url  = require('url')
var util = require('util')

var port = 8000

function start(route, requests) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        route(requests, pathname, response)
    }

    http.createServer(onRequest).listen(port)

    util.log('Server started on port ' + port)
}

exports.start = start
