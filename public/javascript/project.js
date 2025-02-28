document.addEventListener("DOMContentLoaded", function () {
  const projectsList = document.getElementById("projects");
  const addProjectButton = document.getElementById("add-project");
  const projectDetailsSection = document.getElementById("project-details");
  const projectForm = document.getElementById("project-form");
  const cancelProjectButton = document.getElementById("cancel-project");
  const searchInput = document.getElementById("search");
  const filterSelect = document.getElementById("filter");
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  function renderProjects(filteredProjects = projects) {
    projectsList.innerHTML = "";
    filteredProjects.forEach((project) => {
      const li = document.createElement("li");
      li.className = "project-card";
      li.draggable = true;
      li.innerHTML = `
                    <strong>${project.name}</strong> (${project.company})<br>
                    Priority: ${project.priority}<br>
                    Due Date: ${project.dueDate}<br>
                    ${
                      project.file
                        ? `<a href="${project.file}" download>Download File</a>`
                        : ""
                    }
                    <button class="edit-btn" data-id="${
                      project.id
                    }">Edit</button>
                    <button class="delete-btn" data-id="${
                      project.id
                    }">Delete</button>
                `;
      projectsList.appendChild(li);
    });
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", function () {
        projects = projects.filter((p) => p.id !== parseInt(this.dataset.id));
        saveProjectsToLocalStorage();
        renderProjects();
      });
    });
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const project = projects.find(
          (p) => p.id === parseInt(this.dataset.id)
        );
        if (project) {
          document.getElementById("project-name").value = project.name;
          document.getElementById("company-name").value = project.company;
          document.getElementById("priority").value = project.priority;
          document.getElementById("due-date").value = project.dueDate;
          projectDetailsSection.style.display = "block";
          projectForm.onsubmit = function (event) {
            event.preventDefault();
            project.name = document.getElementById("project-name").value;
            project.company = document.getElementById("company-name").value;
            project.priority = document.getElementById("priority").value;
            project.dueDate = document.getElementById("due-date").value;
            saveProjectsToLocalStorage();
            renderProjects();
            projectDetailsSection.style.display = "none";
            projectForm.reset();
          };
        }
      });
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", event.target.dataset.id);
      });
      card.addEventListener("dragover", function (event) {
        event.preventDefault();
      });
      card.addEventListener("drop", function (event) {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain");
        const draggedElement = document.querySelector(
          `[data-id="${draggedId}"]`
        );
        const targetElement = event.target.closest(".project-card");
        if (
          draggedElement &&
          targetElement &&
          draggedElement !== targetElement
        ) {
          const draggedIndex = projects.findIndex(
            (p) => p.id === parseInt(draggedId)
          );
          const targetIndex = projects.findIndex(
            (p) => p.id === parseInt(targetElement.dataset.id)
          );
          [projects[draggedIndex], projects[targetIndex]] = [
            projects[targetIndex],
            projects[draggedIndex],
          ];
          saveProjectsToLocalStorage();
          renderProjects();
        }
      });
    });
  }

  function saveProjectsToLocalStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  addProjectButton.addEventListener(
    "click",
    () => (projectDetailsSection.style.display = "block")
  );
  cancelProjectButton.addEventListener(
    "click",
    () => (projectDetailsSection.style.display = "none")
  );

  projectForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("project-file");
    const file = fileInput.files[0];
    let fileUrl = "";
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        fileUrl = e.target.result;
        saveProject(fileUrl);
      };
      reader.readAsDataURL(file);
    } else {
      saveProject(fileUrl);
    }
  });

  function saveProject(fileUrl) {
    const project = {
      id: Date.now(),
      name: document.getElementById("project-name").value,
      company: document.getElementById("company-name").value,
      priority: document.getElementById("priority").value,
      dueDate: document.getElementById("due-date").value,
      file: fileUrl,
    };
    projects.push(project);
    saveProjectsToLocalStorage();
    renderProjects();
    projectDetailsSection.style.display = "none";
    projectForm.reset();
    checkDeadlines();
  }

  function checkDeadlines() {
    const today = new Date().toISOString().split("T")[0];
    projects.forEach((project) => {
      if (project.dueDate === today) {
        alert(`Reminder: Your project "${project.name}" is due today!`);
      }
    });
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProjects = projects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm) ||
        project.company.toLowerCase().includes(searchTerm)
    );
    renderProjects(filteredProjects);
  });

  filterSelect.addEventListener("change", function () {
    const filterValue = this.value;
    const filteredProjects =
      filterValue === "all"
        ? projects
        : projects.filter((project) => project.priority === filterValue);
    renderProjects(filteredProjects);
  });

  renderProjects();
  checkDeadlines();
});
