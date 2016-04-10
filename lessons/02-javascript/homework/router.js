function route(handle, pathname, res, postData){
    console.log("Routing request to " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](res, postData);
    }else {
        console.log("No request handler found for " + pathname);
    }
}

exports.route = route;
