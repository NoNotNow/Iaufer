// Main application entry point
import { updateStageView, updateView } from './view-renderer.js';
import { setupEventListeners } from './event-handlers.js';
import { loadCode } from './save-load.js';

function main() {
  console.log("Main function called");
  console.log("Main function called");
  setupEventListeners();
  console.log("Event listeners set up");
  console.log("Event listeners set up");
  updateStageView();
  console.log("Stage view updated");
  console.log("Stage view updated");
  updateView();
  console.log("View updated");
  console.log("View updated");
  loadCode();
  console.log("Code loaded");
  console.log("Code loaded");
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);