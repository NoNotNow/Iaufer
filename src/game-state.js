// Game state management
export const gameState = {
  position: { x: 0, y: 0 },
  stageSize: { x: 20, y: 20 },
  direction: 1,
  obstacles: [
    // Top border (except entrance at 0,0)
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 13, y: 0 }, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 }, { x: 17, y: 0 }, { x: 18, y: 0 }, { x: 19, y: 0 }, { x: 20, y: 0 },
    
    // Left border
    { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 }, { x: 0, y: 10 }, { x: 0, y: 11 }, { x: 0, y: 12 }, { x: 0, y: 13 }, { x: 0, y: 14 }, { x: 0, y: 15 }, { x: 0, y: 16 }, { x: 0, y: 17 }, { x: 0, y: 18 }, { x: 0, y: 19 }, { x: 0, y: 20 },
    
    // Right border
    { x: 20, y: 1 }, { x: 20, y: 2 }, { x: 20, y: 3 }, { x: 20, y: 4 }, { x: 20, y: 5 }, { x: 20, y: 6 }, { x: 20, y: 7 }, { x: 20, y: 8 }, { x: 20, y: 9 }, { x: 20, y: 10 }, { x: 20, y: 11 }, { x: 20, y: 12 }, { x: 20, y: 13 }, { x: 20, y: 14 }, { x: 20, y: 15 }, { x: 20, y: 16 }, { x: 20, y: 17 }, { x: 20, y: 18 }, { x: 20, y: 19 }, { x: 20, y: 20 },
    
    // Bottom border (except exit at 18,18)
    { x: 1, y: 20 }, { x: 2, y: 20 }, { x: 3, y: 20 }, { x: 4, y: 20 }, { x: 5, y: 20 }, { x: 6, y: 20 }, { x: 7, y: 20 }, { x: 8, y: 20 }, { x: 9, y: 20 }, { x: 10, y: 20 }, { x: 11, y: 20 }, { x: 12, y: 20 }, { x: 13, y: 20 }, { x: 14, y: 20 }, { x: 15, y: 20 }, { x: 16, y: 20 }, { x: 17, y: 20 }, { x: 19, y: 20 }, { x: 20, y: 20 },
    
    // Internal maze walls creating single path
    // Block direct path down from start
    { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 }, { x: 1, y: 8 }, { x: 1, y: 9 }, { x: 1, y: 10 }, { x: 1, y: 11 }, { x: 1, y: 12 }, { x: 1, y: 13 }, { x: 1, y: 14 }, { x: 1, y: 15 }, { x: 1, y: 16 }, { x: 1, y: 17 },
    
    // Force path to go right first, then create zigzag
    { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 }, { x: 11, y: 1 }, { x: 12, y: 1 }, { x: 13, y: 1 }, { x: 14, y: 1 }, { x: 15, y: 1 }, { x: 16, y: 1 }, { x: 17, y: 1 }, { x: 18, y: 1 }, { x: 19, y: 1 },
    
    // Create corridor going down at x=19
    { x: 18, y: 2 }, { x: 17, y: 2 }, { x: 16, y: 2 }, { x: 15, y: 2 }, { x: 14, y: 2 }, { x: 13, y: 2 }, { x: 12, y: 2 }, { x: 11, y: 2 }, { x: 10, y: 2 }, { x: 9, y: 2 }, { x: 8, y: 2 }, { x: 7, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 2 }, { x: 2, y: 2 },
    
    // Continue zigzag pattern
    { x: 19, y: 3 }, { x: 19, y: 4 }, { x: 19, y: 5 }, { x: 19, y: 6 }, { x: 19, y: 7 }, { x: 19, y: 8 }, { x: 19, y: 9 }, { x: 19, y: 10 }, { x: 19, y: 11 }, { x: 19, y: 12 }, { x: 19, y: 13 }, { x: 19, y: 14 }, { x: 19, y: 15 }, { x: 19, y: 16 }, { x: 19, y: 17 },
    
    // Block path at bottom, force left turn
    { x: 2, y: 19 }, { x: 3, y: 19 }, { x: 4, y: 19 }, { x: 5, y: 19 }, { x: 6, y: 19 }, { x: 7, y: 19 }, { x: 8, y: 19 }, { x: 9, y: 19 }, { x: 10, y: 19 }, { x: 11, y: 19 }, { x: 12, y: 19 }, { x: 13, y: 19 }, { x: 14, y: 19 }, { x: 15, y: 19 }, { x: 16, y: 19 }, { x: 17, y: 19 }, { x: 19, y: 19 },
    
    // Final corridor to target
    { x: 18, y: 19 }, { x: 18, y: 17 }, { x: 18, y: 16 }, { x: 18, y: 15 }, { x: 18, y: 14 }, { x: 18, y: 13 }, { x: 18, y: 12 }, { x: 18, y: 11 }, { x: 18, y: 10 }, { x: 18, y: 9 }, { x: 18, y: 8 }, { x: 18, y: 7 }, { x: 18, y: 6 }, { x: 18, y: 5 }, { x: 18, y: 4 }, { x: 18, y: 3 }
  ],
  target: { x: 18, y: 18 }
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
  const avatarLeft = gameState.position.x;
  const avatarRight = gameState.position.x + 2;
  const avatarTop = gameState.position.y;
  const avatarBottom = gameState.position.y + 2;
  
  return gameState.obstacles.some(obstacle => {
    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + 2;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + 2;
    
    // Check for overlap in both x and y directions
    return !(avatarRight <= obstacleLeft || 
             avatarLeft >= obstacleRight || 
             avatarBottom <= obstacleTop || 
             avatarTop >= obstacleBottom);
  }
  );
}

export function checkTargetReached() {
  const avatarLeft = gameState.position.x;
  const avatarRight = gameState.position.x + 2;
  const avatarTop = gameState.position.y;
  const avatarBottom = gameState.position.y + 2;
  
  const targetLeft = gameState.target.x;
  const targetRight = gameState.target.x + 2;
  const targetTop = gameState.target.y;
  const targetBottom = gameState.target.y + 2;
  
  // Check for overlap in both x and y directions
  return !(avatarRight <= targetLeft || 
           avatarLeft >= targetRight || 
           avatarBottom <= targetTop || 
           avatarTop >= targetBottom);
}