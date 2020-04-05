const gameContainer = document.getElementById("game");

const gifs = [
  "https://media1.giphy.com/media/DgLsbUL7SG3kI/source.gif", 
  "https://media.giphy.com/media/xTiTnKH3dDw1ww53R6/giphy.gif",
  "https://media.giphy.com/media/3Fdskc7J0timI/giphy.gif",
  "https://media.giphy.com/media/9zXWAIcr6jycE/giphy.gif",
  "https://giffiles.alphacoders.com/118/118787.gif",
  "https://media1.giphy.com/media/DgLsbUL7SG3kI/source.gif",
  "https://media.giphy.com/media/xTiTnKH3dDw1ww53R6/giphy.gif",
  "https://media.giphy.com/media/3Fdskc7J0timI/giphy.gif",
  "https://media.giphy.com/media/9zXWAIcr6jycE/giphy.gif",
  "https://giffiles.alphacoders.com/118/118787.gif"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledGifs = shuffle(gifs);

// this function loops over the array of gifs
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForGifs(gifArray) {
  for (let gif of gifArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(gif);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//start a click counter in global scope so we can reference it inside handleCardClick
let countClicks = 0;
//Same for class names
let prevClassNames = [];
//Same for the previous image
let prevImgs = [];

// TODO: Implement this function!
function handleCardClick(event) {  
  //function to compare our gifs - this is not run until it is called down below
  function compareGifs() {
    let lastTwoClassNames = prevClassNames.splice(-2, 2);
    let lastTwoImgs = prevImgs.splice(-2, 2);
    //if the class names in the array prevClassNames both match each other, then stop this function
    if(lastTwoClassNames.every(item => item === lastTwoClassNames[0])) {
      return;
    } else {//if they don't, then turn them back to blank cards after 1 second, by removing newImg from the parent div
      setTimeout(function() {
        for(let img of lastTwoImgs) {
          img.firstElementChild.remove();
        }
      }, 1000);
    }
  }

  // you can use event.target to see which element was clicked
  const newImg = document.createElement("img");//create a brand new img element
  newImg.src = event.target.className;//set the source of the image equal to the className of the div that was clicked on
  newImg.classList.add("resize-gif");//add this resize-gif class to the new img element, so that the image will take up the full width and height of the div
  event.target.append(newImg);//append this new img element to the div that's clicked on

  countClicks += 1;//add 1 to the click counter
  prevClassNames.push(event.target.className);//add the className, or the link to the gif in the div, to the prevClassNames array

  prevImgs.push(event.target);//set newImg to a variable so we can reference it in the compareGifs function

  if(countClicks % 2 === 0) {//as soon as we click on 2 divs, we need to check to see if they match or not, so we'll call our compareGifs function
    compareGifs();
  }
}

// when the DOM loads, this will create all 10 of our empty divs
createDivsForGifs(shuffledGifs);
