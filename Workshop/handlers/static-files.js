const url = require('url');
const fs = require('fs');

function getContentType(url) {
    if (url.endsWith('.css')) {
        return 'text/css';
    }
    else if (url.endsWith('.html')) {
        return 'text/html';
    }
    else if (url.endsWith('.png')) {
        return 'image/png';
    }
    else if (url.endsWith('.js')) {
        return 'text/js';
    }
    else if(url.endsWith('.ico')){
        return 'image/x-icon';
    }
}

module.exports = (req, res) => {
    const pathName = url.parse(req.url).pathname;
    if(pathName.startsWith('/content') && req.method === 'GET'){
        fs.readFile(`./${pathName}`, (err, file) => {
            if(err){
                console.error(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                })
                res.write('404 Not found');
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': getContentType(pathName)
            })
            res.write(file);
            res.end();
        })
    }
    else {
        return true;
    }
}