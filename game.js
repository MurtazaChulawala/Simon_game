var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
var start = false;

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(() => {
                    nextSequence();    
                }, 1000);                        
            }}
    else{
        $("body").addClass("game-over");
        setTimeout(function (){$("body").removeClass("game-over")},200);
        PlaySound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        start = false;
        gamePattern = [];
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();        
}

function PlaySound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){$("#"+currentColour).removeClass("pressed")},100);
} 


$(".btn").on("click",function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});
$("html").on("keypress",function (){
    if (!start){
        level = -1;
        setTimeout(() => {
            nextSequence();            
        }, 450);
        start = true;
    }
});