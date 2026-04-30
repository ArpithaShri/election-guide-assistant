# ElectIQ — Election Guide Assistant

## Overview
ElectIQ is a web-based assistant designed to help voters navigate election information, understand candidates, and make informed decisions using AI-powered insights. It provides a clean, user-friendly interface to simplify the voting process.

## Vertical
Civic Tech / Public Information / Education

## Approach
- **Vanilla Implementation**: Built using pure HTML, CSS, and JavaScript for maximum performance and compatibility.
- **Client-Side AI**: Integrates with the Gemini API to provide intelligent responses and summarize election data.
- **Civic Design System**: Uses a clean, trust-focused "Deep Navy" and "Pure White" palette with "Accent Red" for critical highlights.
- **Accessible & Responsive**: Designed to be readable and usable across all modern devices.

## Google Services Used
- **Gemini API**: Powers the assistant's intelligence for summarizing complex documents and answering user queries.
- **Google Fonts**: Uses the "DM Sans" font family for modern, clean typography.

## How to Run
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Setup API Key**:
   - Open `config.js`.
   - Replace `"YOUR_API_KEY_HERE"` with your actual Google Gemini API key.
3. **Launch the app**:
   - Open `index.html` directly in any modern web browser.
   - Alternatively, use a local server like Live Server (VS Code extension) or `python -m http.server`.

## Assumptions
- Users have access to a modern web browser with ES6 support.
- A valid Google Gemini API key is provided in `config.js`.
- The application is intended for informational and educational purposes only.
