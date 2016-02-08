var $add = $("#add_order");

var $ing = $('.ingredient');
$ing.each(function(ingdt){
    $select = $(this).find(".item");

    var $nsel = $("<select>", {class: 'item', onchange:'updatePrice()'});
    for( var i=0; i <= INGREDIENTS[this.id].amount; i++){    
        $nsel.append($("<option>", {value:i, text:i}));
    }

    $(this).append($nsel);
});

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
    e.each(function(elem){
        console.log($(this).parent()[0].id);
        var t = INGREDIENTS[$(this).parent()[0].id].price;
        //console.log(t);
        
        total_price += Number(this.value) * Number(t);
    });
    /*
    for(var i=0; i < e.length; i++){
        total_price += e[i].value * e[i].title;
    }
    */
    console.log("Updating!");
    
    var update = $("#price");
    update.html(total_price.toFixed(2));
    //update.html(total_price);
};
