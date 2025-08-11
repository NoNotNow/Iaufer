// Main application entry point
import { updateStageView, updateView } from './view-renderer.js';
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
  loadCode();
  console.log("Code loaded");
  
  // Redraw grid on window resize
  window.addEventListener('resize', () => {
    setTimeout(() => {
      const drawGrid = () => {
        const canvas = document.getElementById('gridCanvas');
        const stage = document.getElementById('stage');
        
        if (!canvas || !stage) return;
        
        const ctx = canvas.getContext('2d');
        const stageRect = stage.getBoundingClientRect();
        
        canvas.width = stageRect.width;
        canvas.height = stageRect.height;
        
        const fontSize = parseFloat(getComputedStyle(document.body).fontSize);
        const gridSize = fontSize;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        
        for (let x = gridSize; x < canvas.width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      };
      drawGrid();
    }, 100);
  });
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener("DOMContentLoaded", main);