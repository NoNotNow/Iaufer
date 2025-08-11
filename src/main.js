// Main application entry point
import { updateStageView, updateView, drawGrid } from './view-renderer.js';
import { setupEventListeners } from './event-handlers.js';
import { loadCode } from './save-load.js';

function main() {
  console.log("Main function called");
  setupEventListeners();
  console.log("Event listeners set up");
  updateStageView();
  console.log("Stage view updated");
  updateView();
  console.log("View updated");
  drawGrid();
  console.log("Grid drawn");
  loadCode();
  console.log("Code loaded");
  
  // Redraw grid on window resize
  window.addEventListener('resize', drawGrid);
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);