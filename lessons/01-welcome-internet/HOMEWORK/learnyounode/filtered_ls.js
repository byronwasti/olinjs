var filt = require('./usage.js');
dir = process.argv[2];
//console.log(dir);
ext = process.argv[3];

filt(dir, ext, function(err, data){
    for(var i=0; i < data.length; i++){
        console.log(data[i]);
    }
});
