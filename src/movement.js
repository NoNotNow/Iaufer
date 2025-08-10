// Movement and direction controls
import { gameState, setDirection, parseNumber, withinBounds, checkTargetReached } from './game-state.js';
import { handleWallCollision } from './crash-handler.js';
import { handleObstacleCollision, handleTargetReached } from './crash-handler.js';
import { checkObstacleCollision } from './game-state.js';
import { updateView } from './view-renderer.js';

// Check if the avatar can move forward without hitting an obstacle
export function free() {
  const { x, y } = gameState.position;
  const direction = gameState.direction;
  
  // Calculate the position one step ahead
  let nextX = x;
  let nextY = y;
  
  switch (direction) {
    case 0: // North
      nextY = y - 1;
      break;
    case 1: // East
      nextX = x + 1;
      break;
    case 2: // South
      nextY = y + 1;
      break;
    case 3: // West
      nextX = x - 1;
      break;
  }
  
  // Check bounds
  if (nextX < 0 || nextX >= gameState.gridSize || nextY < 0 || nextY >= gameState.gridSize) {
    return false;
  }
  
  // Check for obstacles
  return !gameState.obstacles.some(obstacle => obstacle.x === nextX && obstacle.y === nextY);
}

export function go(input) {
  let steps = parseNumber(input);
  switch (gameState.direction) {
    case 0:
      gameState.position.y -= steps;
      break;
    case 1:
      gameState.position.x += steps;
      break;
    case 2:
      gameState.position.y += steps;
      break;
    case 3:
      gameState.position.x -= steps;
      break;
  }

  if (!withinBounds()) handleWallCollision();
  if (checkObstacleCollision()) handleObstacleCollision();
  if (checkTargetReached()) handleTargetReached();
  updateView();
}

export function right(input) {
  setDirection(gameState.direction + parseNumber(input));
  updateView();
}

export function left(input) {
  setDirection(gameState.direction - parseNumber(input));
  updateView();
}