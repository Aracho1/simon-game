var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

  var level = 0;


$(document).keypress(function() {
  if (gamePattern.length === 0) {
    nextSequence();
  };
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("h1").text("Level " + level++);
};

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $("#" + userChosenColour).fadeOut(100).fadeIn(100);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play(name);
};


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
      console.log("Wrong");
      playSound("wrong");
      $("h1").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over")
      }, 200);
      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
}
