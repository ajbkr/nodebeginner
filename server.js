const http = require('http')
const url = require('url')

const PORT = 3000

function start (route, handle) {
  function onRequest (req, res) {
    const pathname = url.parse(req.url).pathname
    console.log(`Request for '${pathname}' received; processing...`)
    route(handle, pathname, req, res)
  }

  http.createServer(onRequest).listen(PORT)
  process.stdout.write(`Listening on port ${PORT}...\n`)
}

exports.start = start
