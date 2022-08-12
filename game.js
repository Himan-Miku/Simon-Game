var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function () {
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Failure");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart.");

        restartGame();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var idForChosenColor = "#"+randomChosenColor;
    $(idForChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
}

function playSound(name) {
    var colorAudio = new Audio("sounds/"+name+".mp3");
    colorAudio.play();
}

function animatePress(currentColor) {

    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
    $("#"+currentColor).removeClass("pressed");
    }, 100);

}

function restartGame() {
    level = 0;
    gamePattern = [];
    started = false;
}


