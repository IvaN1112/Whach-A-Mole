document.addEventListener("DOMContentLoaded", function () {
  // Start, Pause and Reset game
  const points = document.querySelector(".points-num");
  const buttons = document.querySelectorAll("button");
  const holes = document.querySelectorAll(".hole");
  const mole = document.createElement("img");
  mole.setAttribute("src", "mole.png");

  let timerInterval;
  let isGameRunning = false;
  let seconds = 0;
  let minutes = 0;
  let lastClickTime = 0;
  let lastHole, newHole;
  mole.classList.add("mole");
  mole.classList.add("show-mole");
  mole.draggable = false;
  mole.addEventListener("click", () => {
    mole.classList.add("clicked-mole");
    const now = Date.now(); // Get the current timestamp
    if (now - lastClickTime >= 700) {
      // Check if at least 1 second has passed since the last click
      setPoints();
      lastClickTime = now; // Update the last click timestamp
    }
  });

  setTime();
  setPoints(false);

  function startGame() {
    if (!isGameRunning) {
      isGameRunning = true;
      timerInterval = setInterval(updateGame, 700);
    }
  }

  function pauseGame() {
    holes[newHole].removeChild(mole);
    clearInterval(timerInterval);
    isGameRunning = false;
  }

  function resetGame() {
    holes[newHole].removeChild(mole);
    clearInterval(timerInterval);
    isGameRunning = false;
    seconds = 0;
    minutes = 0;
    //Clear timer, points and mole
    updateGame(false);
    setPoints(false);
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

    setTime();
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
          resetGame();
          break;
        default:
          console.log("Issue with finding button action:");
      }
    });
  });

  // Move Mole

  // Points
  function setPoints(updating = true) {
    if (updating) {
      let pointsValue = parseInt(points.innerText);
      pointsValue++;
      pointsValue = String(pointsValue);
      points.innerHTML = pointsValue;
    } else {
      points.innerHTML = "0";
    }
  }

  // Utility functions

  function addMole() {
    newHole = Math.floor(Math.random() * 6);
    while (newHole === lastHole) {
      newHole = Math.floor(Math.random() * 6);
    }
    holes[newHole].appendChild(mole);
    mole.classList.add("show-mole");
    lastClickTime = 0;
    setTimeout(() => {
      mole.classList.remove("clicked-mole");
      mole.classList.remove("show-mole");
    }, 700);
    lastHole = newHole;
  }

  function setTime() {
    const timeString = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    document.getElementsByClassName("time")[0].textContent = timeString;
  }
});
