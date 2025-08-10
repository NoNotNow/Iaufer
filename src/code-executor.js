// Code execution and program control
import { gameState } from './game-state.js';

// Non-blocking delay function
export function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function start() {
  if (gameState.isRunning) {
    stop();
    return;
  }

  let textbox = document.getElementById("code");
  let code = textbox.value.trim();

  if (!code) {
    console.log("No code to execute");
    return;
  }

  gameState.isRunning = true;
  console.log("Starting async execution...");

  try {
    // Create an async function from the user's code
    // We need to make movement functions available in the execution context
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const userFunction = new AsyncFunction(`
      // Import movement functions into execution context
      const { go, left, right } = await import('./movement.js');
      const { delay } = await import('./code-executor.js');
      
      // User's code
      ${code}
    `);

    await userFunction();
    console.log("Execution completed successfully");
  } catch (error) {
    console.error("Execution error:", error);
  } finally {
    gameState.isRunning = false;
  }
}

export function stop() {
  gameState.isRunning = false;
  console.log("Execution stopped");
}

// Legacy execute function - no longer used but kept for compatibility
export function execute() {
  console.log("Legacy execute function called - use start() instead");
}