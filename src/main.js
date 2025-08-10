// Main application entry point
import { updateStageView, updateView } from './view-renderer.js';
import { setupEventListeners } from './event-handlers.js';

function main() {
  setupEventListeners();
  updateStageView();
  updateView();
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);