// Event handlers for the application
import { go, left, right } from './movement.js';
import { start, stop } from './code-executor.js';
import { saveCode } from './save-load.js';

export function setupEventListeners() {
  // Set up button event listeners
  document.getElementById("goButton").addEventListener("pointerdown", go);
  document.getElementById("leftButton").addEventListener("pointerdown", left);
  document.getElementById("rightButton").addEventListener("pointerdown", right);
  document.getElementById("startButton").addEventListener("pointerdown", start);
  document.getElementById("stopButton").addEventListener("pointerdown", stop);
  document.getElementById("saveButton").addEventListener("pointerdown", saveCode);
}