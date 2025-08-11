// Main application entry point
import { updateStageView, updateView } from './view-renderer.js';
import { setupEventListeners } from './event-handlers.js';
  console.log("All cookies:", document.cookie);
  console.log("Cookie array:", cookies);
import { loadCode } from './save-load.js';

    console.log("Checking cookie:", name, "=", value);
function main() {
  console.log("Main function called");
      console.log("Found saved code, textbox element:", textbox);
  setupEventListeners();
  console.log("Event listeners set up");
        console.log("Code loaded into textbox:", decodeURIComponent(value));
  updateStageView();
  console.log("Stage view updated");
  updateView();
  console.log("View updated");
  loadCode();
  console.log("Code loaded");
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);
  console.log("loadCode() function called");