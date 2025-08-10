// Movement and direction controls
import { gameState, setDirection, parseNumber, withinBounds } from './game-state.js';
import { handleWallCollision } from './crash-handler.js';
import { updateView } from './view-renderer.js';
import { delay } from './code-executor.js';

export async function go(input) {
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
  updateView();
  
  // Add delay only when running a program
  if (gameState.isRunning) {
    await delay();
  }
}

export async function right(input) {
  setDirection(gameState.direction + parseNumber(input));
  updateView();
  
  // Add delay only when running a program
  if (gameState.isRunning) {
    await delay();
  }
}

export async function left(input) {
  setDirection(gameState.direction - parseNumber(input));
  updateView();
  
  // Add delay only when running a program
  if (gameState.isRunning) {
    await delay();
  }
}