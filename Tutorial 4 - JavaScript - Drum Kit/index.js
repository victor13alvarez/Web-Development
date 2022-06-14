// Detecting Button Press
var buttons = document.querySelectorAll(".drum");
buttons.forEach((item, i) => {
  item.addEventListener("click", handleClick);
});

// Detecting keyboard Press
document.addEventListener("keydown", handleKeyDown);

// Manage button events
function handleClick(event) {
  var drumPressed = (event.srcElement.innerHTML);
  playButtonSound(drumPressed);
  playButtonAnimation(drumPressed);

}

function handleKeyDown(event) {
  var drumPressed = event.key;
  playButtonSound(drumPressed);
  playButtonAnimation(drumPressed);
}

// Play audio when button pressed
function playButtonSound(drumPressed) {
  var audioClip = new Audio();
  switch (drumPressed) {
    case "w":
      audioClip = new Audio("./sounds/tom-1.mp3");
      break;
    case "a":
      audioClip = new Audio("./sounds/tom-2.mp3");
      break;
    case "s":
      audioClip = new Audio("./sounds/tom-3.mp3");
      break;
    case "d":
      audioClip = new Audio("./sounds/tom-4.mp3");
      break;
    case "j":
      audioClip = new Audio("./sounds/snare.mp3");
      break;
    case "k":
      audioClip = new Audio("./sounds/crash.mp3");
      break;
    case "l":
      audioClip = new Audio("./sounds/kick-bass.mp3");
      break;
    default:
      console.log("Unexpected error. Trigger element: " + this);
  }
  audioClip.play();
}

// Play animation when button pressed
function playButtonAnimation(drumPressed) {
  var activeButton = document.querySelector("." + drumPressed);
  activeButton?.classList?.add("pressed");
  setTimeout(() => {
    activeButton?.classList?.remove("pressed");
  }, "100");
}