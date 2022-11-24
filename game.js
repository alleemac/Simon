var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var score = 1;
var highscore = localStorage.getItem("highscore");


var level = 0;
var started = false;

//Start The Game
$(document).keypress(function(){
    if(started === false) {
        $("#level-title").text("GET READY");
        setTimeout(function() {
        $("#level-title").text("Level " + 1);
          }, 2500);
        var start = "sounds/start.wav";
        var audioStart = new Audio(start);
        audioStart.play();
        setTimeout(function() {
            nextSequence();
          }, 3500);
        started = true;
      }
    });

//Track What The User Clicks and Make Sound
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    //Increase The Level
    level++;
    $("#level-title").text("Level " + level);

    //Make Random Color
    var randomNumber = Math.round(Math.random() * 3);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    
    //Make Animation and Play Sound
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    };

    //The Sound Maker
    function playSound (name) {
    var colorSounds = "sounds/" + name + ".mp3";
    var audio = new Audio(colorSounds);
    audio.play();
    };

//The User Animation Click
$(".btn").click(function(){
 $(this).addClass("pressed");

 setTimeout(function(){
    $(".btn").removeClass("pressed");
},100);
});

//Check The Answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
      // Wrong Answer
    console.log("wrong");
    playSound("wrong-button");
    $("#level-title").text("Game Over.");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);
    setTimeout(function () {
      $("#level-title").text("Press Any Key To Start");
    }, 1000);
//High Score
    if (level > highscore) {
      highscore = level;
        localStorage.setItem("highscore", score);
        $("#level").text(level);      
    }
else{
    localStorage.setItem("highscore", score);
}

    startOver();
  }
};


// Restart Game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}




 