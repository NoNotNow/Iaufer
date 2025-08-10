// Code execution and program control

// Non-blocking delay function
export function delay(ms = 300) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Transform user code to automatically add delays after each line
function transformCode(code) {
  // Split code into lines and process each one
  const lines = code.split('\n');
  const transformedLines = [];
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('/*')) {
      transformedLines.push(line);
      continue;
    }
    
    // Skip control structure lines (they don't need delays)
    if (trimmedLine.match(/^\s*(for|while|if|else|function|var|let|const|return|\}|\{)/)) {
      transformedLines.push(line);
      continue;
    }
    
    // Add the original line
    transformedLines.push(line);
    
    // Add delay after lines that contain movement commands
    if (trimmedLine.includes('go(') || trimmedLine.includes('left(') || trimmedLine.includes('right(')) {
      // Match the indentation of the current line
      const indentation = line.match(/^\s*/)[0];
      transformedLines.push(indentation + 'await delay();');
    }
  }
  
  return transformedLines.join('\n');
}

// Parse and prepare user code for execution
function parseUserCode(code) {
  if (!code.trim()) {
    throw new Error("No code to execute");
  }

  // Transform the user's code to add automatic delays
  const transformedCode = transformCode(code);
  console.log("Transformed code:", transformedCode);
  
  // Create an async function from the transformed code
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  return new AsyncFunction(`
    // Import movement functions and delay into execution context
    const { go, left, right } = await import('./movement.js');
    const { delay } = await import('./code-executor.js');
    
    // Transformed user's code with automatic delays
    ${transformedCode}
  `);
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

// Legacy execute function - no longer used but kept for compatibility
export function execute() {
  console.log("Legacy execute function called - use start() instead");
}