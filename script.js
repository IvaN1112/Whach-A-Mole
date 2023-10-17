// Start, Pause and Reset game

let timerInterval;
let gamePaused = true;
let seconds = 0;
let minutes = 0;
let lastClickTime = 0;
const points = document.querySelector(".points-num");
const buttons = document.querySelectorAll("button");
const holes = document.querySelectorAll(".hole");
let lastHole, newHole;
let activeHole;
const mole = document.createElement("img");
mole.setAttribute("src", "mole.png");

document.addEventListener("DOMContentLoaded", function () {
  mole.classList.add("mole");
  mole.classList.add("active-mole");
  mole.draggable = false;
  mole.addEventListener("click", () => {
    if (!gamePaused) {
      const now = Date.now(); // Get the current timestamp
      if (now - lastClickTime >= 1000) {
        // Check if at least 1 second has passed since the last click
        updatePoints();
        console.log("Function executed once per second on click.");
        lastClickTime = now; // Update the last click timestamp
      }
    }
  });
});

function startGame() {
  gamePaused = false;
  timerInterval = setInterval(updateGame, 1000);
}

function pauseGame() {
  gamePaused = true;
  holes[newHole].removeChild(mole);
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  //Clear timer and points
  updateGame(false);
  updatePoints(false);
}

function updateGame(updating = true) {
  //Updating timer values
  if (updating) {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    addMole();
  }
  const timeString = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  document.getElementsByClassName("time")[0].textContent = timeString;
}

function addMole() {
  newHole = Math.floor(Math.random() * 6);
  while (newHole === lastHole) {
    newHole = Math.floor(Math.random() * 6);
  }
  holes[newHole].appendChild(mole);
  mole.classList.add("active-mole");
  lastClickTime = 0;
  setTimeout(() => {
    mole.classList.remove("active-mole");
  }, 1000);
  lastHole = newHole;
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const action = e.currentTarget.classList[0];
    switch (action) {
      case "start":
        startGame();
        break;
      case "pause":
        pauseGame();
        break;
      case "reset":
        resetTimer();
        break;
      default:
        console.log("Issue with finding button action:");
    }
  });
});

// Move Mole

// Points
function updatePoints(updating = true) {
  if (updating) {
    let pointsValue = parseInt(points.innerText);
    pointsValue++;
    pointsValue = String(pointsValue);
    points.innerHTML = pointsValue;
  } else {
    points.innerHTML = "0";
  }
}
