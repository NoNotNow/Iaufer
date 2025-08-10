// Movement and direction controls
import { gameState, setDirection, parseNumber, withinBounds } from './game-state.js';
import { crash } from './crash-handler.js';
import { updateView } from './view-renderer.js';

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

  if (!withinBounds()) crash();
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