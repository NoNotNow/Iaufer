// Event handlers for the application
import { go, left, right } from './movement.js';
import { start, stop } from './code-executor.js';
import { saveCode } from './save-load.js';
import { resetPosition } from './game-state.js';
import { updateView } from './view-renderer.js';

function handleReset() {
  resetPosition();
  updateView();
}

export function setupEventListeners() {
  // Set up button event listeners
  document.getElementById("goButton").addEventListener("pointerdown", go);
  document.getElementById("leftButton").addEventListener("pointerdown", left);
  document.getElementById("rightButton").addEventListener("pointerdown", right);
  document.getElementById("resetButton").addEventListener("pointerdown", handleReset);
  document.getElementById("startButton").addEventListener("pointerdown", start);
  document.getElementById("stopButton").addEventListener("pointerdown", stop);
  document.getElementById("saveButton").addEventListener("pointerdown", saveCode);
}