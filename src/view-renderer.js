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
  
  // Clear existing grid
  const existingGrid = stage.querySelectorAll('.grid-line');
  existingGrid.forEach(line => line.remove());
  
  // Clear existing obstacles
  const existingObstacles = stage.querySelectorAll('.obstacle');
  existingObstacles.forEach(obstacle => obstacle.remove());
  
  // Clear existing target
  const existingTarget = stage.querySelector('.target');
  if (existingTarget) existingTarget.remove();
  
  // Create grid lines
  createGridLines(stage);
  
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

function createGridLines(stage) {
  // Create vertical grid lines
  for (let x = 0; x <= gameState.stageSize.x + 2; x++) {
    const line = document.createElement('div');
    line.className = 'grid-line grid-line-vertical';
    line.style.left = x + 'em';
    stage.appendChild(line);
  }
  
  // Create horizontal grid lines
  for (let y = 0; y <= gameState.stageSize.y + 2; y++) {
    const line = document.createElement('div');
    line.className = 'grid-line grid-line-horizontal';
    line.style.top = y + 'em';
    stage.appendChild(line);
  }
}