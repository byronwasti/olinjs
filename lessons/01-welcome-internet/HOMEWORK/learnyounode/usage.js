var fs = require('fs');

module.exports = function(dir, ext, callback){
    fs.readdir(dir, function (err, list){
        if( err != null ){
            callback(err, null);
            return;
        }
        var filtered = list.filter(function(elem){
            elem_ = elem.split('.');
            if( elem_[elem_.length-1] === ext){
                if( elem_.length != 1 ){
                    return elem;
                }
            }
        });

        callback(null, filtered);

    });
};
