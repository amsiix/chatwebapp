function addMessageToChatHistory(message) {
    const chatHistory = document.getElementById("chat-history");
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
}


const API_URL = "http://localhost:3000/api";

// Fetch existing messages when the page loads
window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(`${API_URL}/messages`);
    const messages = await response.json();

    for (const message of messages) {
        addMessageToChatHistory(message.content);
    }
});

document.getElementById("chat-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const messageInput = document.getElementById("message");
    const messageText = messageInput.value;

    // Add message to the backend
    await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: messageText }),
    });

    addMessageToChatHistory(messageText);
    messageInput.value = "";
});


