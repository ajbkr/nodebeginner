function route (handle, pathname, req, res) {
  console.log(`Routing a request for '${pathname}'...`)
  if (typeof handle[pathname] === 'function') {
    handle[pathname](req, res)
  } else {
    console.error(`Unmatched route: '${pathname}'`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found')
  }
}

exports.route = route
