// View rendering and DOM updates
import { gameState } from './game-state.js';

export function drawGrid() {
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
}

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
  
  // Draw grid after stage is updated
  setTimeout(drawGrid, 0);
}