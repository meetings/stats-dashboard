/* router.js
 */

function route(requests, pathname, response) {
    if (typeof requests[pathname] === 'function') {
        requests[pathname](response)
    }
    else {
        response.writeHead(404, {'Content-Type': 'text/plain'})
        response.write('404 Not Found')
        response.end()
    }
}

exports.route = route
