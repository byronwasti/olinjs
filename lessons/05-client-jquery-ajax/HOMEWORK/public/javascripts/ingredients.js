var $add = $("#add_ingredient");
var $main_list = $("#main_list");

var removeIngredient = function(id_){
    console.log("remove me!");
    console.log(id_);


    $.post('remove_ingredient', {
        id: id_
    })
    .done(function(data, status){
    })
        .error(handleError);

    var $remove = $("#"+id_);
    $remove.hide();
};

var increaseIngredient = function(id_){
    console.log("Increase!");
    console.log(id_);

    $.post('plus_ingredient', {id:id_})
    .done(function(data, status){
        var $up = $("#"+data._id);
        data.amount += 1;
        $up.find('[class="amount"]').html("(x"+data.amount+")");
    }).error(handleError);
};

var decreaseIngredient = function(id_){
    console.log("Decrease!");
    console.log(id_);

    $.post('minus_ingredient', {id:id_})
    .done(function(data, status){
        var $up = $("#"+data._id);
        data.amount -= 1;
        $up.find('[class="amount"]').html("(x"+data.amount+")");
    }).error(handleError);
};

var Update = function(data, status){
    console.log(data);
    var onclick = 'removeIngredient("' +data._id+ '");';
    var $remove_butt = $("<input>", {type: 'button', value: 'Remove', onclick: onclick});

    var onclick = 'increaseIngredient("' +data._id+ '");';
    var $plus_butt = $("<input>", {type: 'button', value: '+', onclick: onclick});

    var onclick = 'decreaseIngredient("' +data._id+ '");';
    var $minus_butt = $("<input>", {type: 'button', value: '-', onclick: onclick});

    // Add buttons and text to list field
    var $list = $("<li>",{id: data._id});
    $list.append($remove_butt);
    $list.append('(x'+data.amount+') ' + data.name + ': $' + data.price +' ');
    $list.append($minus_butt);
    $list.append($plus_butt);
    $main_list.append($list);
    console.log(data);

    // Reset the fields
    $add.find("[name='name']").val('');
    $add.find("[name='amount']").val('');
    $add.find("[name='price']").val('');

};

var handleError = function(data, status){
    console.log("ERROR: " + data);
};

$add.submit(function(event){
    event.preventDefault();
    var name = $add.find("[name='name']").val();
    var amount = $add.find("[name='amount']").val();
    var price = $add.find("[name='price']").val();

    console.log("Adding Ingredient");
    $.post('add_ingredient', {
        name: name,
        amount: amount,
        price: price
    })
    .done(Update)
        .error(handleError);
});
