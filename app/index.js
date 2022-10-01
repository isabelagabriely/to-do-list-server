const http = require('http');
const header = require('./requests/header-response')
const { handleGetRequest, handlePostRequest, handlePutRequest, handleDeleteRequest } = require('./requests/request-handler')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res)
            break;
        case "POST":
            await handlePostRequest(req, res)
            break;
        case "PUT":
            await handlePutRequest(req, res)
            break;
        case "DELETE":
            await handleDeleteRequest(req, res)
            break;
        default:
            header.setBadRequest(res)
            res.end()
            break;
    }
});

server.listen(port, hostname, () => {
    console.log('TO-DO List Server');
    console.log(`Servidor iniciado na ULR: http://${hostname}:${port}/`);
});
