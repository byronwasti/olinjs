var $add = $("#add_order");

var $select = $(".item")
for( var i=0; i < $select.length; i++){
    var amount = 0 + $select[i].name;
    for( var i=0; i < amount; i++){
        var $option = $("<option>", { value:i+1 });
        $option.html( i+1 );
        $select.append($option);
    };
};

$add.submit( function(event){
    event.preventDefault();
    console.log("submitted");
    // gather items
    var order = {}; 
    $ing = $(".ingredient");
    $amounts = $(".item");
    for( var i=0; i < $ing.length; i++){
        order[$ing[i].id] = $amounts[i].value;
    }

    $.post('add_order', order).done(function(data, status){
        console.log(data);
        if( data === "{}" ){
            $("#status").html("There was an issue placing your order.");
        } else {
            $("#status").html("Thank you for the order!");
        }
    }).error(function(data, status){
        console.log("ERROR: " + data);
        $("#status").html("There was an issue placing your order!");
    });
});

updatePrice = function(){
    var e = $(".item");
    var total_price = 0;
    for(var i=0; i < e.length; i++){
        total_price += e[i].value * e[i].title;
    }
    
    var update = $("#price");
    update.html(total_price.toFixed(2));
};
