// Crash handling and animations
import { gameState, resetPosition } from './game-state.js';
import { updateView } from './view-renderer.js';
import { stop } from './code-executor.js';

export function crash() {
  let stage = document.getElementById("stage");
  let avatar = document.getElementById("avatar");
  
  avatar.classList.add("crash");
  stage.classList.add("crash");
  
  setTimeout(() => {
    avatar.classList.remove("crash");
    stage.classList.remove("crash");
    resetPosition();
    updateView();
  }, 500);
  
  stop();
}