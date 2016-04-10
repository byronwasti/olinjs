var url = require('url');
var http = require('http');

var server = http.createServer(function(req,res){
    if (req.method != 'GET'){
        return res.end('nope!\n');
    }
    res.writeHead(200, {'Content-Type':'application/json'});

    var url_ = url.parse(req.url, true);
    var time = new Date(url_.query.iso);

    if( url_.pathname === '/api/parsetime'){
        out = {hour: time.getHours(),
            minute: time.getMinutes(),
            second: time.getSeconds()
        }
        return res.end(JSON.stringify(out));
    } else if( url_.pathname === '/api/unixtime'){
        return res.end(JSON.stringify({unixtime: time.getTime()}));
    }
    
});

server.listen(process.argv[2]);
