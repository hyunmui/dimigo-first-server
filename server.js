const http = require('http');
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    console.log(`---------------${req.url}----------------------`);
    console.log(req.rawHeaders, req.headers, req.method);
    console.log('----------------------------------------');

    res.writeHead(200);
    res.end('Hello NodeJS!');
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
