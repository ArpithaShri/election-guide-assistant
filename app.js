/**
 * ElectIQ — Election Guide Assistant
 * Main Application Logic (Local Response System)
 */

(function() {
    "use strict";

    // 1. LOCAL RESPONSE DATA
    const responses = {
        registration: "To register as a voter in India, visit voterportal.eci.gov.in and fill Form 6 online. You need to be 18+ years old, an Indian citizen, and a resident of the constituency. Documents needed: Aadhaar card, passport photo, and address proof. Registration is free and takes 2-3 weeks to process.",
        voting: "On voting day, carry your EPIC (Voter ID) card or any approved photo ID to your assigned polling booth. Voting hours are 7am to 6pm. The EVM machine is simple — find your candidate, press the button next to their name and symbol. A beep confirms your vote. The entire process takes under 5 minutes.",
        timeline: "Indian general elections happen in multiple phases spread over 4-6 weeks. Phase 1: Voter Registration closes. Phase 2: Campaign period begins — candidates file nominations. Phase 3: Campaigning ends 48 hours before polling. Phase 4: Voting Day. Phase 5: Vote counting and results declared. The Election Commission announces all dates 3-4 months in advance.",
        results: "After voting ends, EVMs are sealed and stored securely. On counting day, EVMs are opened constituency by constituency under observer supervision. Results are updated live on results.eci.gov.in. A candidate needs the highest votes in their constituency to win (First Past The Post system). Final results are usually declared within 6-8 hours of counting starting.",
        candidates: "During elections, candidates must follow the Model Code of Conduct set by the Election Commission. Campaigns run for about 3-4 weeks. Candidates file nomination papers, pay a deposit, and campaign via rallies, ads, and door-to-door visits. Campaign spending has strict limits — Rs 95 lakhs per candidate for Lok Sabha elections.",
        eligibility: "You are eligible to vote in India if you are: 18 years or older, an Indian citizen, mentally sound, and enrolled in the electoral roll of your constituency. You cannot vote if you are a non-citizen, convicted and imprisoned, or declared of unsound mind by a court.",
        voterid: "EPIC stands for Electors Photo Identity Card — your Voter ID. Apply for it at voterportal.eci.gov.in after registering. It serves as both proof of registration and a general photo ID. If you lose it, apply for a duplicate on the same portal. Aadhaar, passport, or driving license are accepted as alternatives on voting day.",
        default: "I can help you with voter registration, the voting process, election timeline, candidate information, and understanding results. What would you like to know about Indian elections?"
    };

    // DOM Elements
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const topicButtons = document.querySelectorAll(".topic-btn");
    const timelineItems = document.querySelectorAll(".timeline-item");

    /**
     * Local Logic: Returns a response based on keywords
     * @param {string} userMessage 
     */
    function getElectionResponse(userMessage) {
        const msg = userMessage.toLowerCase();
        
        if (msg.includes("register") || msg.includes("registration") || msg.includes("form 6")) {
            return responses.registration;
        }
        if (msg.includes("vote") || msg.includes("voting") || msg.includes("booth") || msg.includes("evm") || msg.includes("ballot")) {
            return responses.voting;
        }
        if (msg.includes("timeline") || msg.includes("schedule") || msg.includes("phase") || msg.includes("date")) {
            return responses.timeline;
        }
        if (msg.includes("result") || msg.includes("count") || msg.includes("counting") || msg.includes("winner") || msg.includes("declared")) {
            return responses.results;
        }
        if (msg.includes("candidate") || msg.includes("campaign") || msg.includes("manifesto") || msg.includes("party")) {
            return responses.candidates;
        }
        if (msg.includes("eligible") || msg.includes("eligibility") || msg.includes("qualify") || msg.includes("who can vote")) {
            return responses.eligibility;
        }
        if (msg.includes("epic") || msg.includes("voter id") || msg.includes("voter card")) {
            return responses.voterid;
        }
        
        return responses.default;
    }

    /**
     * Appends a message to the chat container
     * @param {string} text - Message text
     * @param {string} sender - 'user' or 'ai' or 'error'
     */
    function appendMessage(text, sender) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        
        if (sender === "typing") {
            messageDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
            messageDiv.id = "typing-bubble";
        } else {
            messageDiv.textContent = text;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTo({ top: chatMessages.scrollHeight, behavior: 'smooth' });
        return messageDiv;
    }

    /**
     * Scans text for keywords to highlight timeline steps
     */
    function syncTimeline(text) {
        const lowerText = text.toLowerCase();
        let step = -1;

        if (lowerText.includes("register") || lowerText.includes("registration")) step = 0;
        else if (lowerText.includes("campaign") || lowerText.includes("candidate")) step = 1;
        else if (lowerText.includes("vote") || lowerText.includes("voting") || lowerText.includes("booth") || lowerText.includes("evm")) step = 2;
        else if (lowerText.includes("count") || lowerText.includes("counting")) step = 3;
        else if (lowerText.includes("result") || lowerText.includes("declared") || lowerText.includes("winner")) step = 4;

        if (step !== -1) {
            timelineItems.forEach((item, index) => {
                item.classList.toggle("active", index === step);
            });
        }
    }

    /**
     * Simulates a "thinking" AI using local responses
     */
    function handleElectionQuery(text) {
        // Show user message
        appendMessage(text, "user");
        userInput.value = "";
        sendBtn.disabled = true;

        // Show typing indicator
        const typingBubble = appendMessage("", "typing");

        // Simulate 800ms thinking time
        setTimeout(() => {
            typingBubble.remove();
            const responseText = getElectionResponse(text);
            
            // Add AI response
            appendMessage(responseText, "ai");
            
            // Highlight timeline
            syncTimeline(responseText);
            
            sendBtn.disabled = userInput.value.trim() === "";
        }, 800);
    }

    // Initialize application
    document.addEventListener("DOMContentLoaded", () => {
        // Initial Welcome Message
        appendMessage("Hello! I'm ElectIQ, your election guide. Ask me anything about voter registration, timelines, or the voting process.", "ai");

        // UI Listeners
        menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
        
        userInput.addEventListener("input", () => {
            sendBtn.disabled = userInput.value.trim() === "";
        });

        userInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleElectionQuery(userInput.value.trim());
        });

        sendBtn.addEventListener("click", () => handleElectionQuery(userInput.value.trim()));

        // Quick Topic Buttons
        topicButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const topic = btn.getAttribute("data-topic");
                handleElectionQuery(topic);
            });
        });

        // Language Selector placeholder
        document.getElementById("lang-select").addEventListener("change", (e) => {
            appendMessage(`Language preference updated to ${e.target.options[e.target.selectedIndex].text}.`, "ai");
        });
    });
})();
