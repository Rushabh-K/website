function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("show");
}

function sendMessage() {
  const sender = document.getElementById("sender").value;
  const receiver = document.getElementById("receiver").value;
  const messageInput = document.getElementById("message");
  const message = messageInput.value.trim();

  if (!message) return;

  const chatBox = document.getElementById("chatBox");
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const messageElement = document.createElement("div");
  messageElement.className = "message sent";
  messageElement.innerHTML = `
            <strong>${sender}</strong>
            <p>${message}</p>
            <span class="message-time">${time}</span>
        `;

  chatBox.appendChild(messageElement);
  messageInput.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Close dropdown when clicking outside
window.onclick = function (event) {
  if (!event.target.matches(".profile-btn")) {
    const dropdowns = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }
  }
};
