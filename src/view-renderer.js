// View rendering and DOM updates
import { gameState } from './game-state.js';

export function updateView() {
  let avatar = document.getElementById("avatar");
  let transform = "translate(" + gameState.position.x + "em, " + gameState.position.y + "em)";
  transform += "rotate(" + gameState.direction * 90 + "deg) ";

  avatar.style.transform = transform;
}

export function updateStageView() {
  let stage = document.getElementById("stage");
  stage.style.width = gameState.stageSize.x + 2 + "em";
  stage.style.height = gameState.stageSize.y + 2 + "em";
  
  // Clear existing obstacles
  const existingObstacles = stage.querySelectorAll('.obstacle');
  existingObstacles.forEach(obstacle => obstacle.remove());
  
  // Clear existing target
  const existingTarget = stage.querySelector('.target');
  if (existingTarget) existingTarget.remove();
  
  // Add obstacles to the stage
  gameState.obstacles.forEach(obstacle => {
    const obstacleElement = document.createElement('div');
    obstacleElement.className = 'obstacle';
    obstacleElement.style.left = obstacle.x + 'em';
    obstacleElement.style.top = obstacle.y + 'em';
    stage.appendChild(obstacleElement);
  });
  
  // Add target to the stage
  const targetElement = document.createElement('div');
  targetElement.className = 'target';
  targetElement.style.left = gameState.target.x + 'em';
  targetElement.style.top = gameState.target.y + 'em';
  stage.appendChild(targetElement);
}

export function drawGrid() {
  const canvas = document.getElementById('gridCanvas');
  const stage = document.getElementById('stage');
  
  if (!canvas || !stage) {
    console.log('Canvas or stage not found:', { canvas: !!canvas, stage: !!stage });
    return;
  }
  
  const ctx = canvas.getContext('2d');
  const rect = stage.getBoundingClientRect();
  
  console.log('Stage rect:', rect);
  
  // Set canvas size to match stage
  canvas.width = rect.width;
  canvas.height = rect.height;
  
  console.log('Canvas size set to:', canvas.width, 'x', canvas.height);
  
  // Calculate grid size in pixels (1em)
  const fontSize = parseFloat(getComputedStyle(document.body).fontSize);
  const gridSize = fontSize;
  
  console.log('Grid size (1em):', gridSize, 'px');
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Set line style
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 2;
  
  let lineCount = 0;
  
  // Draw vertical lines
  for (let x = gridSize; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    lineCount++;
  }
  
  // Draw horizontal lines
  for (let y = gridSize; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
    lineCount++;
  }
  
  console.log('Drew', lineCount, 'grid lines');
}