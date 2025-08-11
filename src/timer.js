// Timer functionality
let startTime = null;
let timerInterval = null;
let timerStopped = false;

export function startTimer() {
  startTime = Date.now();
  timerStopped = false;
  updateTimerDisplay();
  
  timerInterval = setInterval(() => {
    updateTimerDisplay();
  }, 10); // Update every 10ms for smooth display
}

export function stopTimer() {
  timerStopped = true;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

export function resetTimer() {
  stopTimer();
  startTime = null;
  timerStopped = false;
  const timerElement = document.getElementById('timer');
  if (timerElement) {
    timerElement.textContent = '0.00';
  }
}

export function isTimerStopped() {
  return timerStopped;
}

function updateTimerDisplay() {
  if (startTime === null) return;
  
  const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
  const timerElement = document.getElementById('timer');
  
  if (timerElement) {
    timerElement.textContent = elapsed.toFixed(2);
  }
}