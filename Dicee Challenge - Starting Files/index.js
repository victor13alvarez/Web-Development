var randomNumber1 = Math.round(Math.random() * 5 + 1);
var randomNumber2 = Math.round(Math.random() * 5 + 1);

var img1Path = "./images/dice" + randomNumber1 + ".png";
var img2Path = "./images/dice" + randomNumber2 + ".png";

var img1Element = document.querySelector(".img1");
var img2Element = document.querySelector(".img2");
var titleElement = document.querySelector("h1");


img1Element.setAttribute("src", img1Path);
img2Element.setAttribute("src", img2Path);


if (randomNumber1 < randomNumber2) {
  titleElement.innerHTML = "🚩Player1 WINS"
} else if (randomNumber1 > randomNumber2) {
  titleElement.innerHTML = "Player2 WINS🚩"
} else {
  titleElement.innerHTML = "DRAW!"
}