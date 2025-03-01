let pomodoroTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;
let currentTab = "pomodoro";
let timerInterval = null;
let isRunning = false;
let totalSeconds = pomodoroTime;

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  document.querySelector(".timer").textContent = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function setTimer(seconds, button) {
  document
    .querySelectorAll(".tabs button")
    .forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  currentTab = button.textContent.toLowerCase().replace(/[^a-z]/g, "");
  totalSeconds = seconds;
  isRunning = false;
  clearInterval(timerInterval);
  updateDisplay();
}

function toggleTimer() {
  isRunning = !isRunning;
  const button = document.querySelector(".start-button");
  button.textContent = isRunning ? "PAUSE" : "START";

  if (isRunning) {
    timerInterval = setInterval(() => {
      totalSeconds--;
      updateDisplay();
      if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        button.textContent = "START";
        // Add alarm sound here if desired
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
  }
}

function openSettings() {
  document.getElementById("settingsModal").style.display = "block";
  document.getElementById("pomodoroSetting").value = pomodoroTime / 60;
  document.getElementById("shortBreakSetting").value = shortBreakTime / 60;
  document.getElementById("longBreakSetting").value = longBreakTime / 60;
}

function closeSettings() {
  document.getElementById("settingsModal").style.display = "none";
}

function saveSettings() {
  pomodoroTime =
    Math.max(1, document.getElementById("pomodoroSetting").value) * 60;
  shortBreakTime =
    Math.max(1, document.getElementById("shortBreakSetting").value) * 60;
  longBreakTime =
    Math.max(1, document.getElementById("longBreakSetting").value) * 60;

  // Update current timer if viewing the modified type
  const currentTimes = {
    pomodoro: pomodoroTime,
    shortbreak: shortBreakTime,
    longbreak: longBreakTime,
  };

  if (currentTimes[currentTab] !== totalSeconds) {
    totalSeconds = currentTimes[currentTab];
    updateDisplay();
  }

  closeSettings();
}

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === document.getElementById("settingsModal")) {
    closeSettings();
  }
};

// Initialize display
updateDisplay();
