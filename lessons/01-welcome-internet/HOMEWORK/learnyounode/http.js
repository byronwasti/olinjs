var http = require('http');
var bl = require('bl');

var array = [];
var count = 0;

function print_all(){
    for( var j=0; j < 3; j++){
        console.log(array[j]);
    }

}

function http_get(i){
    http.get(process.argv[2+i], function(response){
        response.pipe(bl(function(err, data){
            if( err ){
                console.error(err);
            }
            array[i] = data.toString();
            //console.log(i);
            count ++;

            //console.log(array);
            if( count === 3 ){
                print_all();
            }
        }));
    });
}
for(var i=0; i < 3; i++){
    http_get(i);
}
