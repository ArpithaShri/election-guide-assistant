/**
 * ElectIQ — Election Guide Assistant
 * Main Application Logic
 */

(function() {
    "use strict";

    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    /**
     * Appends a message to the chat container
     * @param {string} text - The message content
     * @param {string} sender - 'user' or 'ai'
     */
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Handles the user message submission
     */
    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        // Add user message
        appendMessage(text, "user");
        userInput.value = "";

        // Simulate AI response (to be replaced with Gemini API)
        setTimeout(() => {
            appendMessage("I'm your ElectIQ assistant. I'm currently in development, but soon I'll be able to help you with all your election-related questions using the Gemini API!", "ai");
        }, 600);
    }

    // Initialize application
    document.addEventListener("DOMContentLoaded", () => {
        console.log("ElectIQ initialized");

        // Add welcome message
        appendMessage("Hello! I'm ElectIQ. How can I help you navigate the upcoming election today?", "ai");

        // Event Listeners
        sendBtn.addEventListener("click", handleSend);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSend();
        });
    });
})();
