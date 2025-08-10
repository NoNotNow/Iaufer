// Code execution and program control

// Global execution state
let isRunning = false;
let currentExecution = null;

// Non-blocking delay function
export function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generic wrapper function that adds delay and other logic
function createWrappedFunction(originalFunction) {
  return async function(input) {
    originalFunction(input);
    await delay();
  };
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
  return new AsyncFunction('go', 'left', 'right', `
    // User's transformed code with movement functions available as parameters
    ${transformedCode}
  `);
}

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