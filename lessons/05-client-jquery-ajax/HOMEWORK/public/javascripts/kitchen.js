function completeOrder(_id){
    console.log("done!");
    console.log(_id);
    $post = $("#"+_id);
    console.log($post);
    $post.hide();

    $.post('complete_order', {_id:_id})
        .done(function(data, status){
        });
}

function deleteOrder(_id){
    console.log("done!");
    console.log(_id);
    $post = $("#"+_id);
    console.log($post);
    $post.hide();

    $.post('remove_order', {_id:_id})
        .done(function(data, status){
        });
}
