// Game state management
export const gameState = {
  position: { x: 0, y: 0 },
  stageSize: { x: 20, y: 20 },
  direction: 1,
  obstacles: [
    // Vertical walls
    { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 },
    { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 },
    { x: 12, y: 2 }, { x: 12, y: 3 }, { x: 12, y: 4 }, { x: 12, y: 5 },
    { x: 16, y: 8 }, { x: 16, y: 9 }, { x: 16, y: 10 }, { x: 16, y: 11 },
    
    // Horizontal walls
    { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 },
    { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 13, y: 10 }, { x: 14, y: 10 },
    { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 },
    { x: 14, y: 14 }, { x: 15, y: 14 }, { x: 17, y: 14 }, { x: 18, y: 14 },
    
    // Corner pieces and strategic blocks
    { x: 2, y: 12 }, { x: 10, y: 4 }, { x: 14, y: 6 }, { x: 6, y: 16 }
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