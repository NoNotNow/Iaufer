// Wall collision handling and animations
import { gameState, resetPosition } from './game-state.js';
import { updateView } from './view-renderer.js';
import { stop } from './code-executor.js';

export function handleWallCollision() {
  let stage = document.getElementById("stage");
  let avatar = document.getElementById("avatar");
  
  avatar.classList.add("wall-collision");
  stage.classList.add("wall-collision");
  
  setTimeout(() => {
    avatar.classList.remove("wall-collision");
    stage.classList.remove("wall-collision");
    resetPosition();
    updateView();
  }, 500);
  
  stop();
}