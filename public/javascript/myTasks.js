document.addEventListener("DOMContentLoaded", async () => {
  const loadTasks = async () => {
    try {
      const response = await fetch("/efficientHours/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();
      renderTasks(tasks);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderTasks = (tasks) => {
    taskList.innerHTML = tasks
      .map(
        (task) => `
        <li>
            <span>${task.name}</span>
            <span>Priority: ${task.priority}</span>
            <span>Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
            <span>Progress: ${task.progress}%</span>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        </li>
    `
      )
      .join("");
  };
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTask = {
      name: taskNameInput.value,
      priority: priorityInput.value,
      dueDate: dueDateInput.value,
      progress: parseInt(progressInput.value),
    };

    try {
      const response = await fetch("/efficientHours/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to save task");

      taskForm.reset();
      await loadTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Initial load
  await loadTasks();
});

// Add this function to BOTH pages' scripts
async function deleteTask(taskId) {
  try {
    const response = await fetch(`/efficientHours/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) throw new Error("Delete failed");
    window.location.reload(); // Refresh the page to reflect changes
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete task");
  }
}
