var http = require("http");
var url = require("url");

function start(route, handle) {
    http.createServer(function(req, res){
        var postData = "";
        var pathname = url.parse(req.url).pathname;
        console.log("request received: " + pathname);

        req.setEncoding("utf8");
        req.addListener("data", function(chunk){
            postData += chunk;
            console.log("POST chunk : " + postData);
        });

        req.addListener("end", function(){
            route(handle, pathname, res, postData);
        });

    }).listen(8888);

    console.log("Server has started.");
}

exports.start = start;
