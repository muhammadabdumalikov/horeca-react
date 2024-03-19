const express = require('express')
const http = require('http')
const app = express()
const path = require('path')

const server = http.createServer(app)

const _dirname = path.dirname('');
const buildPath = path.join(_dirname, './build');

app.use(express.static(buildPath))

app.get('/*', function (req, res) {
    res.sendFile(
        path.join(__dirname, './build/index.html'),
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    )
})

server.listen(5001, () => console.log('Listening to port: 5001'))
