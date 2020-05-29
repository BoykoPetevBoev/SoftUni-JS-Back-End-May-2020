const http = require('http');
const port = 3000;
const handlers = require('./handlers')

console.log(`Server started on port: ${port}`);

http.createServer((req, res) => {
    for(let handler of handlers) {
        if(!handler(req, res)){
            break;
        }
    }
}).listen(port);