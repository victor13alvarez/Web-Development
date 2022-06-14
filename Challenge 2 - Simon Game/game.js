var simonColorsCode = ["green", "red", "yellow", "blue"]
var simonSequence = [];
var playerAnswers = [];
var playerIsPlaying = false;

const timer = ms => new Promise(response => setTimeout(response, ms));

$(document).keydown(handleKeyDown);
$().addClass("disable-select");
$(".btn").click(handleButtonClick);

// Handle KeyBoard events
function handleKeyDown(event) {
  //Game starts with "a" key
  if (event.key === "a" || event.key === "A") {
    startGame();
  }
}

// Handle Buttons click
function handleButtonClick(event) {
  //Get Button Color
  var colorPressed = event.target.id;
  if (playerIsPlaying) {
    handleAnswer(colorPressed);
  }
}

//Setup Game
function startGame() {
  $(document).off("keydown");
  playerAnswers = [];
  simonSequence = [];
  mainGameFlow();
}

//Main Game Flow
function mainGameFlow() {
  //Change Title
  $("h1").text("Level " + (simonSequence.length + 1));
  //Delete previous answers
  playerAnswers = [];
  //Create nextSequence
  nextSequence();
  //Display sequence
  displaySimonSequence();
}

// Create Simon sequence
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var colorPicked = simonColorsCode[randomNumber];
  simonSequence.push(colorPicked);
}

//Animate Simon butotn
async function animateSimonButton(color) {
  $("#" + color).addClass("pressed");
  await timer(100);
  $("#" + color).removeClass("pressed");

}

function playSimonButtonSound(audioName) {
  var audioClip = new Audio("./sounds/" + audioName + ".mp3");
  audioClip.play();
}

async function displaySimonSequence() {
  //For each element in simon sequence with inner delay
  for (var i = 0; i < simonSequence.length; i++) {
    var actualColor = simonSequence[i];
    animateSimonButton(actualColor);
    playSimonButtonSound(actualColor);
    await timer(500);
  }

  //Setup ready - Player Turn
  playerIsPlaying = true;

}

function handleAnswer(colorPressed) {
  playerAnswers.push(colorPressed);
  var lastAnswerPosition = playerAnswers.length - 1;

  //Manage right answer
  if (simonSequence[lastAnswerPosition] === colorPressed) {
    //Animate and Play Button pressed
    animateSimonButton(colorPressed);
    playSimonButtonSound(colorPressed);

    if (playerAnswers.length === simonSequence.length) {
      //Player no longer is playing
      playerIsPlaying = false;

      //SetUp new round
      setTimeout(() => {
        mainGameFlow();
      }, "1000");
    }
  }
  //Manage wrong answer
  else {
    handleEndGame();
  }

}

function handleEndGame() {
  playerIsPlaying = false;
  $("h1").text("END GAME PRESS A TO RESTART!")
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, "200");
  playSimonButtonSound("wrong");
  $(document).keydown(handleKeyDown);
}