// Selecting necessary DOM elements
const word = document.querySelector("#word");
const timeLeftEl = document.querySelector("#time-left");
const scoreEl = document.querySelector("#score");
const userInput = document.querySelector("#user-input");
const gameContainer = document.querySelector(".game-container");
const gameModeOptions = document.querySelector("#game-mode");

// Game variables
let randomWord;
let score = 0;
let time = 10;
let setIntervalID;
let isTimerStart = false;

// Retrieve game mode from local storage or default to 'medium'
let GameMode = localStorage.getItem("GameMode") || "medium";
gameModeOptions.value = GameMode;

// Array of words for the typing game
const words = [
  "Apple", "Ball", "Cat", "Dog", "Elephant", "Fish", "Grape", "Hat", "Ice", "Jug",
  "Kite", "Lion", "Moon", "Nest", "Orange", "Pen", "Queen", "Rain", "Sun", "Tree",
  "Umbrella", "Violin", "Water", "Xylophone", "Yarn", "Zebra", "Air", "Boat", "Car",
  "Duck", "Egg", "Frog", "Goat", "House", "Ink", "Jelly", "Key", "Lamp", "Mango",
  "Nose", "Octopus", "Parrot", "Quilt", "Rabbit", "Star", "Tiger", "Unicorn", "Van",
  "Whale", "Yak"
];

// Function to get a random word from the words array
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

// Function to display a new word
function displayWord() {
  randomWord = getRandomWord();
  word.textContent = randomWord;
}

// Function to handle user input and check if it matches the displayed word
function handleUserInput(e) {
  if (!isTimerStart) {
    startTimer(); // Start timer on first input
    isTimerStart = true;
  }
  if (e.target.value.trim().toLowerCase() === randomWord.toLowerCase()) {
    score++; // Increase score
    displayWord(); // Display a new word
    addExtraTime(); // Add extra time based on game mode
    userInput.value = ""; // Clear input field
    scoreEl.textContent = score; // Update score display
  }
}

// Function to add extra time based on the selected game mode
function addExtraTime() {
  if (GameMode === "easy") {
    time += 6;
  } else if (GameMode === "medium") {
    time += 3;
  } else if (GameMode === "hard") {
    time += 2;
  }
}

// Function to handle game over scenario
function gameOver() {
  clearInterval(setIntervalID); // Stop timer
  gameContainer.innerHTML = `<h2>Game is over! You typed ${score} words correctly.</h2> 
                              <button onclick="window.location.reload()">Reload</button>`;
}

// Function to start the timer
function startTimer() {
  setIntervalID = setInterval(() => {
    time--;
    timeLeftEl.textContent = time;
    if (time <= 0) {
      clearInterval(setIntervalID);
      gameOver();
    }
  }, 1000); // Decrease time every second
}

// Function to handle game mode selection and store preference
function selectGameMode(e) {
  GameMode = e.target.value;
  localStorage.setItem("GameMode", GameMode);
}

// Event listeners to initialize the game
document.addEventListener("DOMContentLoaded", () => {
  displayWord(); // Show the first word
  userInput.addEventListener("input", handleUserInput); // Listen for user input
  gameModeOptions.addEventListener("change", selectGameMode); // Listen for game mode changes
});