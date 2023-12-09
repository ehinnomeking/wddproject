//Initial References throughout the js
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Setting up words to guess in the game
let options = {
  Global: [
    "Ecosystem",
    "Deforestation",
    "Climate",
    "Enviroment",
    "Ocean",
    "Forest",
  ],
  animals: ["Whale", "Tiger", "Penguins", "Panda", "Dolphin", "Turtle"],
  waste: [
    "OIl",
    "Fossil",
    "Biodegradable",
    "Plastic",
    "Trash",
    "Recyclable",
  ],
};

//Counts your wins and losses, and makes it start at 0
let winCount = 0;
let count = 0;
//An empty string 
let chosenWord = "";

//Displays buttons that give you an option of which topic you want the word to be from
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Disables other buttons to press after already choosing a topic
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Disables buttons with letters after pressing them
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Generates a word
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValue matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //At the start hides the letters, and clears the previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Code below chooses a random word from the list 
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //Makes place for correct letters to show up by using the span tag
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Makes each element display as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  winCount = 0;
  count = 0;

  //At the start erases all content and hides letters and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Code below creates letter buttons for the game
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
	//ASCII is an American Standard Code for Information Interchange
	//It's a common character encoding format for text data
    button.innerText = String.fromCharCode(i);
    //Makes the letters clickable 
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
	  //If array contains a clicked value then replaces the matched dash below with the letter which you chose
	  //Else if array does not contain a correct letter then draw on the canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
			//If letter is correct, increments winCount value by 1
            winCount += 1;
            //If winCount = the number of letter in a word then you win
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              //After winning blocks all actions
              blocker();
            }
          }
        });
      } else {
        //If letter is incorrect, increment loss count by 1
        count += 1;
        //If "count" is incremented by 1 then draws a limb of the man
        drawMan(count);
        //Count==6 becasue: 1 head, 2 arms, 2 legs, and 1 torso
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //Makes clicked buttons become blocked, making them unable to press again
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //InitialDrawing would draw the frame
  initialDrawing();
};

//Canvas where the stickam figurine is placed
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines of the figurine 
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
//head
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
//body
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
//leftarm
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
//rightarm
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
//leftleg
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
//rightleg
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //Initial frame
  const initialDrawing = () => {
    //Clears canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//For drawing the stickman figurine with lines
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//Without this the game cannot be replayed and cannot start, new mage
newGameButton.addEventListener("click", initializer);
window.onload = initializer;