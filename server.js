const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 8000;

const eventHandler = require('./eventHandler');

const serveFile = async (filePath, contentType, statusCode, response) => {
    try {
        const data = await fs.promises.readFile(filePath);
        response.writeHead(statusCode, {
            'Content-Type': contentType,
        });
        response.end(data);
    } catch (error) {
        eventHandler.emit('log', `${error.name}: ${error.message}`, 'errLog.txt');
    }
};

const server = http.createServer((request, response) => {
    // console.log(`---------------${req.url}----------------------`);
    // console.log(req.rawHeaders, req.headers, req.method, req.url);
    // console.log('----------------------------------------');
    eventHandler.emit('log', `${request.url}\t${request.method}`, 'reqLog.txt');

    const extension = path.extname(request.url);

    const useViewFile = !extension || extension === '.html';
    let filePath = path.join(__dirname, useViewFile ? 'views' : '', `${request.url}`);
    if (!extension && fs.existsSync(path.join(filePath, 'index.html'))) {
        filePath = path.join(filePath, 'index.html');
    } else if (!extension && fs.existsSync(filePath + '.html')) {
        filePath += '.html';
    }
    let statusCode = 200;

    if (!fs.existsSync(filePath)) {
        statusCode = 404;
        filePath = path.join(__dirname, 'views/404.html');
    }

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

    serveFile(filePath, contentType, statusCode, response);
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
