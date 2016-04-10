var fs = require('fs');
var file_read = process.argv[2];

function reader(callback){
    fs.readFile(file_read, function(err, data){
        if( err == true){
            return false;
        }
        callback(data.toString())
    });
}

//var str = buf.toString().split('\n');

function print_data(data){
    //console.log(data);
    line_count = data.split('\n');
    //console.log(line_count);
    console.log(line_count.length-1);
}

reader(print_data);
