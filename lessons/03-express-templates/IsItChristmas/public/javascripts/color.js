function getRandomColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

document.addEventListener("DOMContentLoaded", function(event){
    var name = document.getElementById('clickme');
    name.addEventListener("click", function(){
        name.style.color = getRandomColor();
    });
});
