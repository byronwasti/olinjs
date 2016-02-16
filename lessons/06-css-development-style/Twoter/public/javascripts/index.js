$submit = $('#submitBox');
$posts = $('#posts');
$users = $('#users');

function newPost( text, username, append ){
    var $user = $('#examplePostUsername').clone();
    var $post = $('#examplePost').clone();
    $user.id = '';
    $post.id = '';
    $user.html("- " + username);
    $post.html(text);

    if( append ){
        $posts.append($post);
        $posts.append($user);
    } else {
        $posts.prepend($user);
        $posts.prepend($post);
    }
}

$submit.submit(function(event){
    event.preventDefault();

    var username = $submit.find(".userName").val();
    var text = $submit.find(".text").val();

    //console.log( username + ": " + text);

    $.post('twote', {
        text: text
    })
    .done(function(data, status){
        $submit.find(".text").val("");

        console.log(data);
        newPost( data.post.text, data.author);
        if( data.new_author ){
            var $user = $('#exampleUser').clone();
            $user.id = '';
            $user.html(data.author.name);
            console.log($user);
            $users.append($user);
        }
    })
    .error(function(data, status){
        console.error(data);
        alert('Please sign in to post your dank twotes');
        //$('#login').append($('<p>').html('Pl
    });
    
});

$(".byUser").click(function(event){
    console.log("clicked: "+ this.id);
    $.get('byUser', {
        id: this.id, test: 'test'
    })
    .done(function(data, status){
        console.log(data);
        $posts.empty();
        post_list = data.map(function(post){
            newPost( post.text, post.author.name, true );
        });
    })
    .error(function(data,status){
        console.error(data);
    });
});
