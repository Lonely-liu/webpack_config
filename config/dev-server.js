const fs = require('fs')
const http = require('http')
const path = require('path')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-type': 'text/html'
  })
  fs.readFile(path.join(__dirname, '../dist/html/about.html'), (err, data) => {
    if (err) {
      throw Error(err)
    }
    res.end(data)
  })
}).listen(8088)
