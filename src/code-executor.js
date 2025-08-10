// Code execution and program control

// Non-blocking delay function
export function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Wrapper functions that add delays and other logic
async function wrappedGo(input) {
  const { go } = await import('./movement.js');
  go(input);
  await delay();
}

async function wrappedLeft(input) {
  const { left } = await import('./movement.js');
  left(input);
  await delay();
}

async function wrappedRight(input) {
  const { right } = await import('./movement.js');
  right(input);
  await delay();
}

// Transform user code to use wrapped functions
function transformCode(code) {
  // Replace function calls with wrapped versions
  let transformedCode = code
    .replace(/\bgo\(/g, 'await go(')
    .replace(/\bleft\(/g, 'await left(')
    .replace(/\bright\(/g, 'await right(');
  
  return transformedCode;
}

// Parse and prepare user code for execution
function parseUserCode(code) {
  if (!code.trim()) {
    throw new Error("No code to execute");
  }

  // Transform the user's code to use wrapped functions
  const transformedCode = transformCode(code);
  console.log("Transformed code:", transformedCode);
  
  // Create an async function from the transformed code
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  return new AsyncFunction(`
    // Import wrapped movement functions into execution context
    const go = this.wrappedGo;
    const left = this.wrappedLeft;
    const right = this.wrappedRight;
    
    // Transformed user's code
    ${transformedCode}
  `).bind({ wrappedGo, wrappedLeft, wrappedRight });
}

let isRunning = false;
let currentExecution = null;

// Execute user function continuously until stopped
async function executeUntilStopped(userFunction) {
  while (isRunning) {
    try {
      await userFunction();
      // If we reach here and still running, the program completed - run again
      if (isRunning) {
        console.log("Program completed, restarting...");
      }
    } catch (error) {
      console.error("Execution error:", error);
      break;
    }
  }
}

export async function start() {
  if (isRunning) {
    stop();
    return;
  }

  let textbox = document.getElementById("code");
  let code = textbox.value;

  try {
    // Parse the user's code
    const userFunction = parseUserCode(code);
    
    isRunning = true;
    console.log("Starting continuous execution...");
    
    // Start continuous execution
    currentExecution = executeUntilStopped(userFunction);
    await currentExecution;
    
    console.log("Execution stopped");
  } catch (error) {
    console.error("Parse error:", error);
  } finally {
    isRunning = false;
    currentExecution = null;
  }
}

export function stop() {
  isRunning = false;
  console.log("Execution stopped");
}