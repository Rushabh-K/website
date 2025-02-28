let timer;
let timeLeft = 1500;
let running = false;
const timerDisplay = document.querySelector(".timer");

function setTimer(seconds, element) {
  clearInterval(timer);
  timeLeft = seconds;
  updateDisplay();
  running = false;
  document
    .querySelectorAll(".tabs button")
    .forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
}

function toggleTimer() {
  if (running) {
    clearInterval(timer);
    document.querySelector(".start-button").textContent = "START";
  } else {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alert("Time's up!");
      }
    }, 1000);
    document.querySelector(".start-button").textContent = "PAUSE";
  }
  running = !running;
}

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function addTask() {
  let taskText = prompt("Enter your task:");
  if (taskText) {
    let taskList = document.querySelector(".task-list");
    let taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskList.appendChild(taskItem);
  }
}
