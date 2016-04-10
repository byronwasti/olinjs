var net = require('net');

var server = net.createServer(function (socket){
    var sd = "";
    var date = new Date();
    sd = date.getFullYear() + '-' + '0' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

    socket.end(sd);
});

server.listen(process.argv[2]);
