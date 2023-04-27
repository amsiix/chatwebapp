document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "http://localhost:3000/api";
    const submitBtn = document.getElementById("submit-btn");
    const messageInput = document.getElementById("message-input");
    const messageContainer = document.getElementById("message-container");
  
    // Fetch and display existing messages
    fetch(`${API_URL}/messages`)
      .then((response) => response.json())
      .then((messages) => {
        messages.forEach((message) => {
          displayMessage(message);
        });
      });
  
    // Handle form submission
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      const content = messageInput.value.trim();
      if (content) {
        fetch(`${API_URL}/messages`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        })
          .then((response) => response.json())
          .then((message) => {
            displayMessage(message);
            messageInput.value = "";
          });
      }
    });
  
    // Display messages
    function displayMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.textContent = message.content;
      messageContainer.appendChild(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  });
  