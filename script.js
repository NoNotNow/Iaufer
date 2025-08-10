let position = { x: 0, y: 0 };
let stageSize = { x: 20, y: 20 };
let direction = 1;

function go(input) {
  let steps = number(input);
  switch (direction) {
    case 0:
      position.y -= steps;
      break;
    case 1:
      position.x += steps;
      break;
    case 2:
      position.y += steps;
      break;
    case 3:
      position.x -= steps;
      break;
  }

  if (!withinBounds()) crash();
  updateView();
}
function right(input) {
  setDirection(direction + number(input));
  updateView();
}
function left(input) {
  setDirection(direction - number(input));
  updateView();
}
function updateView() {
  let avatar = document.getElementById("avatar");
  let transform = "translate(" + position.x + "em, " + position.y + "em)";
  transform += "rotate(" + direction * 90 + "deg) ";

  avatar.style.transform = transform;
}
function setDirection(v) {
  direction = v % 4;
  if (direction < 0) direction += 4;
}
function updateStageView() {
  let stage = document.getElementById("stage");
  stage.style.width = stageSize.x + 2 + "em";
  stage.style.height = stageSize.y + 2 + "em";
}

function withinBounds() {
  if (position.x < 0 || position.x > stageSize.x) return false;
  if (position.y < 0 || position.y > stageSize.y) return false;
  return true;
}
function crash() {
  let stage = document.getElementById("stage");
  let avatar = document.getElementById("avatar");
  avatar.classList.add("crash");
  stage.classList.add("crash");
  setTimeout(() => {
    avatar.classList.remove("crash");
    stage.classList.remove("crash");
    direction = 1;
    position.x = 0;
    position.y = 0;
    updateView();
  }, 500);
  clearInterval(interval);
}
function number(input) {
  let steps = 1;
  if (typeof input === "number") steps = input;
  return steps;
}
let interval;
let currentLine = 0;
let lines = [];

function start() {
  if (interval) clearInterval(interval);

  let textbox = document.getElementById("code");
  let code = textbox.value;

  // Split code into lines and filter out empty lines
  lines = code.split("\n").filter((line) => line.trim() !== "");
  currentLine = 0;

  if (lines.length > 0) {
    interval = setInterval(execute, 300);
  }
}

function execute() {
  if (currentLine < lines.length) {
    let line = lines[currentLine].trim();
    console.log(`Executing line ${currentLine + 1}: ${line}`);

    try {
      eval(line);
    } catch (error) {
      console.error(`Error on line ${currentLine + 1}:`, error);
    }

    currentLine++;
  } else {
    currentLine = 0;

    console.log("All lines executed");
  }
}

function stop() {
  if (interval) clearInterval(interval);
  interval = null;
  currentLine = 0;
  console.log("Execution stopped");
}

function main() {
  // Add event listeners to buttons
  document.getElementById("goButton").addEventListener("pointerdown", () => go());
  document.getElementById("leftButton").addEventListener("pointerdown", () => left());
  document.getElementById("rightButton").addEventListener("pointerdown", () => right());
  document.getElementById("startButton").addEventListener("pointerdown", start);
  document.getElementById("stopButton").addEventListener("pointerdown", stop);
  
  updateStageView();
  updateView();
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);