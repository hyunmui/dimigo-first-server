const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 8000;

const eventHandler = require('./eventHandler');

const server = http.createServer((req, res) => {
    // console.log(`---------------${req.url}----------------------`);
    // console.log(req.rawHeaders, req.headers, req.method, req.url);
    // console.log('----------------------------------------');
    eventHandler.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType = '';

    switch (extension) {
        case '.jpg':
            contentType = 'image/png';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    try {
        fs.readFile(path.join(__dirname, req.url), '', (err, data) => {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } catch (error) {}
});

server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
