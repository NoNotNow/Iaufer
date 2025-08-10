// Code execution and program control
import { gameState } from './game-state.js';

export function start() {
  if (gameState.interval) clearInterval(gameState.interval);

  let textbox = document.getElementById("code");
  let code = textbox.value;

  // Split code into lines and filter out empty lines
  gameState.lines = code.split("\n").filter((line) => line.trim() !== "");
  gameState.currentLine = 0;

  if (gameState.lines.length > 0) {
    gameState.interval = setInterval(execute, 300);
  }
}

export function execute() {
  if (gameState.currentLine < gameState.lines.length) {
    let line = gameState.lines[gameState.currentLine].trim();
    console.log(`Executing line ${gameState.currentLine + 1}: ${line}`);

    try {
      eval(line);
    } catch (error) {
      console.error(`Error on line ${gameState.currentLine + 1}:`, error);
    }

    gameState.currentLine++;
  } else {
    gameState.currentLine = 0;
    console.log("All lines executed");
  }
}

export function stop() {
  if (gameState.interval) clearInterval(gameState.interval);
  gameState.interval = null;
  gameState.currentLine = 0;
  console.log("Execution stopped");
}