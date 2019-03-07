const formidable = require('formidable')
const fs = require('fs')

const { IncomingForm } = formidable

function show (req, res) {
  console.log("Request handler 'show' was called")
  res.writeHead(200, { 'Content-Type': 'image/png' })
  fs.createReadStream('/tmp/test.png').pipe(res)
}

function index (req, res) {
  console.log("Request handler 'index' was called")

  const body = [
    '<html>',
    '  <head>',
    '    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
    '  </head>',
    '  <body>',
    '    <form action="/upload" enctype="multipart/form-data" method="post">',
    '      <input type="file" name="upload" />',
    '      <input type="submit" value="Upload file" />',
    '    </form>',
    '  </body>',
    '</html>'
  ].join('\n')

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write(body)
  res.end()
}

function upload (req, res) {
  console.log("Request handler 'upload' was called")

  const form = new IncomingForm()
  console.log('About to parse...')
  form.parse(req, (error, fields, files) => {
    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.write('400 Something Bad Happened')
      res.end()
      return
    }
    console.log('Parsing complete')

    if (files.upload) {
      fs.rename(files.upload.path, '/tmp/test.png', error => {
        if (error) {
          fs.unlink('/tmp/test.png')
          fs.rename(files.upload.path, '/tmp/test.png')
        }
      })
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write('Received image:<br />')
    res.write('<img src="/show" />')
    res.end()
  })
}

exports.show = show
exports.index = index
exports.upload = upload
