/**
 * ElectIQ — Election Guide Assistant
 * Main Application Logic
 */

(function() {
    "use strict";

    // DOM Elements
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const topicButtons = document.querySelectorAll(".topic-btn");

    /**
     * Appends a message to the chat container
     * @param {string} text - Message text
     * @param {string} sender - 'user' or 'ai'
     */
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Smooth scroll to bottom
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        });
    }

    /**
     * Updates the send button state based on input
     */
    function updateSendButtonState() {
        sendBtn.disabled = userInput.value.trim() === "";
    }

    /**
     * Handles sending a message
     */
    function handleSend() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, "user");
        userInput.value = "";
        updateSendButtonState();

        // Simulated AI response
        setTimeout(() => {
            appendMessage("Thank you for your question about '" + text + "'. I'm currently being trained on the latest election data and will be able to provide detailed answers soon!", "ai");
        }, 800);
    }

    // Initialize application
    document.addEventListener("DOMContentLoaded", () => {
        // 1. Initial Welcome Message
        appendMessage("Hello! I'm ElectIQ, your election guide. Ask me anything about voter registration, timelines, or the voting process.", "ai");

        // 2. Menu Toggle (Mobile)
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });

        // 3. Close sidebar when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 992 && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        });

        // 4. Quick Topic Buttons
        topicButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const topic = btn.getAttribute("data-topic");
                userInput.value = topic;
                userInput.focus();
                updateSendButtonState();
            });
        });

        // 5. Input Events
        userInput.addEventListener("input", updateSendButtonState);
        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleSend();
        });
        sendBtn.addEventListener("click", handleSend);

        // 6. Language Selector (Placeholder logic)
        document.getElementById("lang-select").addEventListener("change", (e) => {
            console.log("Language changed to:", e.target.value);
            appendMessage("Language switched to " + e.target.options[e.target.selectedIndex].text + ". (Translation feature coming soon!)", "ai");
        });
    });
})();
