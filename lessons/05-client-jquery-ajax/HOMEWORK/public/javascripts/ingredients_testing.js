var $add = $("#add_ingredient");
var $main_list = $("#main_list");

setName();
setAmount();
setPrice();
setAdd();

function setName(){
    $(".name").click(function(){
        var edit = $('<input>', {type:'text', value: $(this).text()});
        $(this).text('');

        $(this).append(edit);
        edit.focus();

        edit.blur(function(){
            $name = $(this).parent();
            $name.html($(this).val());

            $.post('edit_ingredient', {
                type: 'name',
                id: $name.parent()[0].id,
                name: $name.html()
            })
            .done(function(data, status){
                if( data === '{}' ) handleError('bad');
            })
            .error(handleError);
        });
    });
}

function setAmount(){
    $(".amount").click(function(){
        var edit = $('<input>', {type:'number', value: $(this).text()});
        $(this).text('');

        $(this).append(edit);
        edit.focus();

        edit.blur(function(){
            $span = $(this).parent();
            $span.html($(this).val());

            $.post('edit_ingredient', {
                type: 'amount',
                id: $span.parent()[0].id,
                amount: $span.html()
            })
            .done(function(data, status){
                if( data === '{}' ) handleError('bad');
            })
            .error(handleError);
        });
    });
}


function setPrice(){
    $(".price").click(function(){
        var edit = $('<input>', {type:'number', value: $(this).text(), step:'0.01'});
        $(this).text('');

        $(this).append(edit);
        edit.focus();

        edit.blur(function(){
            $span = $(this).parent();
            $span.html($(this).val());

            $.post('edit_ingredient', {
                type: 'price',
                id: $span.parent()[0].id,
                price: $span.html()
            })
            .done(function(data, status){
                if( data === '{}' ) handleError('bad');
            })
            .error(handleError);
        });
    });
}


function removeIngredient(id_){
    $.post('remove_ingredient', {
        id: id_
    })
    .done(function(data, status){
    })
        .error(handleError);

    var $remove = $("#"+id_);
    $remove.hide();
};


function setAdd(){
    $add.submit(function(event){
        event.preventDefault();
        var name = $add.find("[name='name']").val();
        var amount = $add.find("[name='amount']").val();
        var price = $add.find("[name='price']").val();

        $.post('add_ingredient', {
            name: name,
            amount: amount,
            price: price
        })
        .done(Update)
            .error(handleError);
    });
}


function Update(data, status){
    var $li = $('<li>', { id: data.id, class:'ingredient'});
    var $remove = $('<input>', {type: 'button', value:'Remove', onclick:'removeIngredient("'+data.id+'")'});
    var $spanAmount = $('<span>', {class:'amount'}).text(data.amount);
    var $spanName = $('<span>', {class:'name'}).text(data.name);
    var $spanPrice = $('<span>', {class:'price'}).text(data.price);

    $li.append($remove);
    $li.append(' (x');
    $li.append($spanAmount);
    $li.append(') ');
    $li.append($spanName);
    $li.append(': $');
    $li.append($spanPrice);

    $main_list.append($li);

    setName();
    setAmount();
    setPrice();

    // Reset the fields
    $add.find("[name='name']").val('');
    $add.find("[name='amount']").val('');
    $add.find("[name='price']").val('');

};


function handleError(data, status){
    console.log("ERROR: " + data);
};
