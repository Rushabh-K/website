let tasks = [];
const taskList = document.getElementById("tasks");
const taskForm = document.getElementById("task-form");
const taskDetails = document.getElementById("task-details");
const addTaskBtn = document.getElementById("add-task");
const cancelTaskBtn = document.getElementById("cancel-task");
const taskNameInput = document.getElementById("task-name");
const priorityInput = document.getElementById("priority");
const dueDateInput = document.getElementById("due-date");
const progressInput = document.getElementById("task-progress");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

addTaskBtn.addEventListener("click", () => {
  taskDetails.style.display = "block";
});

cancelTaskBtn.addEventListener("click", () => {
  taskDetails.style.display = "none";
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {
    name: taskNameInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    progress: progressInput.value,
  };

  tasks.push(task);
  renderTasks();
  taskDetails.style.display = "none";
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <span>${task.name}</span>
            <span>Priority: ${task.priority}</span>
            <span>Due Date: ${task.dueDate}</span>
            <span>Progress: ${task.progress}%</span>
        `;
    taskList.appendChild(taskItem);
  });
}

searchInput.addEventListener("input", filterTasks);
filterSelect.addEventListener("change", filterTasks);

function filterTasks() {
  const query = searchInput.value.toLowerCase();
  const filter = filterSelect.value;

  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.name.toLowerCase().includes(query);
    const matchesFilter = filter === "all" || task.priority === filter;
    return matchesQuery && matchesFilter;
  });

  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
            <span>${task.name}</span>
            <span>Priority: ${task.priority}</span>
            <span>Due Date: ${task.dueDate}</span>
            <span>Progress: ${task.progress}%</span>
        `;
    taskList.appendChild(taskItem);
  });
}
