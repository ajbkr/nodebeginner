const requestHandlers = require('./request-handlers')
const router = require('./router')
const server = require('./server')

// Uncomment to suppress logging messages
// console.log = _ => {}

const handle = {
  '/': requestHandlers.index,
  '/show': requestHandlers.show,
  '/upload': requestHandlers.upload
}

server.start(router.route, handle)
