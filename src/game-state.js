// Game state management
export const gameState = {
  position: { x: 0, y: 0 },
  stageSize: { x: 20, y: 20 },
  direction: 1,
  obstacles: [
    { x: 5, y: 5 },
    { x: 10, y: 8 },
    { x: 15, y: 12 },
    { x: 7, y: 15 }
  ]
};

export function resetPosition() {
  gameState.position.x = 0;
  gameState.position.y = 0;
  gameState.direction = 1;
}

export function withinBounds() {
  if (gameState.position.x < 0 || gameState.position.x > gameState.stageSize.x) return false;
  if (gameState.position.y < 0 || gameState.position.y > gameState.stageSize.y) return false;
  return true;
}

export function setDirection(v) {
  gameState.direction = v % 4;
  if (gameState.direction < 0) gameState.direction += 4;
}

export function parseNumber(input) {
  let steps = 1;
  if (typeof input === "number") steps = input;
  return steps;
}

export function checkObstacleCollision() {
  return gameState.obstacles.some(obstacle => 
    obstacle.x === gameState.position.x && obstacle.y === gameState.position.y
  );
}