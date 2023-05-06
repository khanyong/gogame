let playerATimeRemaining = 60 * 60; // 60 minutes in seconds
let playerBTimeRemaining = 60 * 60;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (currentPlayer === 'A') {
      playerATimeRemaining--;
      updateTimerDisplay('playerATimer', playerATimeRemaining);
    } else {
      playerBTimeRemaining--;
      updateTimerDisplay('playerBTimer', playerBTimeRemaining);
    }

    if (playerATimeRemaining === 0 || playerBTimeRemaining === 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
    }
  }, 1000);
}

function updateTimerDisplay(timerId, timeRemaining) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById(timerId).textContent = `Player ${currentPlayer}: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}
