document.addEventListener("DOMContentLoaded", function () {
  //Global values
  const buttons = document.querySelectorAll("button");
  const points = document.querySelector(".points-num");
  const holes = document.querySelectorAll(".hole");
  const mole = document.createElement("img");
  setupMole(mole);

  let holeInterval, timerInterval;
  let isGameRunning = false;
  let seconds = 0;
  let minutes = 0;
  let lastClickTime = 0;
  let lastHole, newHole;

  const MOLE_APPEAR_DELAY = 700;

  //Setting up button actions and initial values
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  });

  setTime();
  setPoints(false);

  function startGame() {
    if (!isGameRunning) {
      isGameRunning = true;
      holeInterval = setInterval(addMole, MOLE_APPEAR_DELAY);
      timerInterval = setInterval(updateTimer, 1000);
    }
  }

  function pauseGame() {
    holes[newHole].removeChild(mole);
    clearInterval(holeInterval);
    clearInterval(timerInterval);
    isGameRunning = false;
  }

  function resetGame() {
    if (holes[newHole].contains(mole)) {
      holes[newHole].removeChild(mole);
    }
    clearInterval(holeInterval);
    clearInterval(timerInterval);
    isGameRunning = false;
    seconds = 0;
    minutes = 0;
    //Clear timer, points and mole
    updateTimer(false);
    setPoints(false);
  }

  //Updates timer and mole position
  function updateTimer(updating = true) {
    if (updating) {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
    }

    setTime();
  }

  // Utility functions

  function setTime() {
    const timeString = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    document.getElementsByClassName("time")[0].textContent = timeString;
  }

  function setPoints(updating = true) {
    if (updating) {
      let pointsValue = parseInt(points.innerText);
      pointsValue++;
      pointsValue = String(pointsValue);
      points.innerText = pointsValue;
    } else {
      points.innerText = "0";
    }
  }

  function setupMole(mole) {
    mole.setAttribute("src", "mole.png");
    mole.classList.add("mole");
    mole.draggable = false;
    mole.addEventListener("click", () => {
      const now = Date.now(); //
      if (now - lastClickTime >= MOLE_APPEAR_DELAY) {
        // Check if at least MOLE_APPEAR_DELAY ms has passed since the last click
        mole.classList.add("clicked-mole");
        setPoints();
        lastClickTime = now; // Update the last click timestamp
      }
    });
  }

  function addMole() {
    newHole = Math.floor(Math.random() * 6);
    while (newHole === lastHole) {
      newHole = Math.floor(Math.random() * 6);
    }
    holes[newHole].appendChild(mole);
    mole.classList.add("show-mole");
    lastClickTime = 0;
    //After MOLE_APPEAR_DELAY, remove it from the screen.
    setTimeout(() => {
      removeMole();
    }, MOLE_APPEAR_DELAY);
    lastHole = newHole;
  }

  function removeMole() {
    mole.classList.remove("clicked-mole");
    mole.classList.remove("show-mole");
  }

  function handleButtonClick(e) {
    const action = e.currentTarget.classList[0];
    switch (action) {
      case "start":
        startGame();
        break;
      case "pause":
        pauseGame();
        break;
      case "reset":
        resetGame();
        break;
      default:
        console.log("Issue with finding button action:");
    }
  }
});
