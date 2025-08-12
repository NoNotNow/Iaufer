// Movement and direction controls
import { gameState, setDirection, parseNumber, withinBounds, checkTargetReached } from './game-state.js';
import { handleWallCollision } from './crash-handler.js';
import { handleObstacleCollision, handleTargetReached } from './crash-handler.js';
import { checkObstacleCollision } from './game-state.js';
import { updateView } from './view-renderer.js';

// Turn left (counterclockwise)
export function left() {
  const newDirection = (gameState.direction + 3) % 4; // +3 is same as -1 in mod 4
  setDirection(newDirection);
  updateView();
}

// Turn right (clockwise)
export function right() {
  const newDirection = (gameState.direction + 1) % 4;
  setDirection(newDirection);
  updateView();
}

// Check if the avatar can move forward without hitting an obstacle
export function free() {
  const x = gameState.position.x;
  const y = gameState.position.y;
  const direction = gameState.direction;
  
  let spaces = 0;
  let currentX = x;
  let currentY = y;
  
  // Keep checking spaces in the current direction until we hit something
  while (true) {
    // Calculate the next position
    let nextX = currentX;
    let nextY = currentY;
    
    switch (direction) {
      case 0: // North
        nextY = currentY - 1;
        break;
      case 1: // East
        nextX = currentX + 1;
        break;
      case 2: // South
        nextY = currentY + 1;
        break;
      case 3: // West
        nextX = currentX - 1;
        break;
    }
    
    // Check bounds
    if (nextX < 0 || nextX > gameState.stageSize.x || nextY < 0 || nextY > gameState.stageSize.y) {
      break;
    }
    
    // Check for obstacles
    const avatarLeft = nextX;
    const avatarRight = nextX + 2;
    const avatarTop = nextY;
    const avatarBottom = nextY + 2;
    
    const hasObstacle = gameState.obstacles.some(obstacle => {
      const obstacleLeft = obstacle.x;
      const obstacleRight = obstacle.x + 1;
      const obstacleTop = obstacle.y;
      const obstacleBottom = obstacle.y + 1;
      
      // Check for overlap in both x and y directions
      return !(avatarRight <= obstacleLeft || 
               avatarLeft >= obstacleRight || 
               avatarBottom <= obstacleTop || 
               avatarTop >= obstacleBottom);
    });
    
    if (hasObstacle) {
      break;
    }
    
    // This space is free, count it and move to the next position
    spaces++;
    currentX = nextX;
    currentY = nextY;
  }
  
  return spaces;
}

export function go(input) {
  let steps = parseNumber(input);
  
  // Use free() to determine how many steps we can actually take
  const availableSteps = free();
  const actualSteps = Math.min(steps, availableSteps);
  
  // Move the actual number of steps
  switch (gameState.direction) {
    case 0:
      gameState.position.y -= actualSteps;
      break;
    case 1:
      gameState.position.x += actualSteps;
      break;
    case 2:
      gameState.position.y += actualSteps;
      break;
    case 3:
      gameState.position.x -= actualSteps;
      break;
  }
  
  // If we couldn't take all the requested steps, handle collision
  if (actualSteps < steps) {
    // Check what stopped us - bounds or obstacle
    if (!withinBounds()) {
      handleWallCollision();
      return;
    }
    if (checkObstacleCollision()) {
      handleObstacleCollision();
      return;
    }
  }
  
  // Check if target is reached after movement
  if (checkTargetReached()) {
    handleTargetReached();
    return;
  }
}