// Calendar functionality
const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendar(month, year) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  monthYear.textContent = `${months[month]} ${year}`;
  calendarDays.innerHTML = "";

  // Fill in the days from the previous month
  for (let i = 0; i < startingDay; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    li.textContent = prevMonthLastDay - startingDay + i + 1;
    calendarDays.appendChild(li);
  }

  // Fill in the days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const li = document.createElement("li");
    if (
      i === currentDate.getDate() &&
      month === currentDate.getMonth() &&
      year === currentDate.getFullYear()
    ) {
      li.classList.add("active");
    }
    li.textContent = i;
    calendarDays.appendChild(li);
  }

  // Fill in the days from the next month
  const totalCells = startingDay + daysInMonth;
  const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;
  for (let i = 1; i <= remainingCells; i++) {
    const li = document.createElement("li");
    li.classList.add("inactive");
    li.textContent = i;
    calendarDays.appendChild(li);
  }
}

prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Initial render
renderCalendar(currentMonth, currentYear);
let toggle = document.querySelector(".toggle");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let close = document.querySelector(".close");
let body = document.querySelector(".body");
let searchBx = document.querySelector(".searchBx");
let searchOpen = document.querySelector(".searchOpen");
let searchClose = document.querySelector(".searchClose");
toggle.addEventListener("click", () => {
  toggel.classList.toggle("active");
  left.classList.toggle("active");
  right.classList.toggle("overlay");
  body.style.overflow = "hidden";
});
close.onclick = () => {
  toggle.classList.remove("active");
  left.classList.remove("active");
  right.classList.remove("overlay");
};
searchOpen.onclick = () => {
  searchBx.classList.add("active");
};
searchClose.onclick = () => {
  searchBx.classList.remove("active");
};
window.onclick = (e) => {
  if (e.target == right) {
    toggle.classList.remove("active");
    left.classList.remove("active");
    right.classList.remove("overplay");
    body.style.overflow = "";
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.name} - Due: ${task.dueDate}, Priority: ${task.priority}, Assigned To: ${task.assignTo}`;
    taskList.appendChild(li);
  });
});

//dropdown js section
function toggleMenu() {
  document.getElementById("dropdownMenu").classList.toggle("active");
}
document.addEventListener("click", function (event) {
  var profileBtn = document.querySelector(".profile-btn");
  var dropdown = document.getElementById("dropdownMenu");
  if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});
