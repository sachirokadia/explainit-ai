# ExplainIt AI

Build a polished React + Vite web app called ExplainIt AI.

PURPOSE:
Users enter any concept or topic and AI explains it at different levels of complexity.

CORE FLOW:

User enters a topic in a large input box.

User clicks "Explain It".

AI generates:

Explain Like I'm 5

Simple Explanation

Technical Explanation

Real-World Example

30-Second Summary

Display each result in a beautiful card.

Add a "😂 Make It Even Simpler" button that asks the AI to simplify the current explanation further.

Add a "Copy" button to each result card.

DESIGN:

Modern educational AI product.

Clean white/light background.

Large bold typography.

Soft rounded cards.

Subtle gradients.

Smooth hover and loading animations.

Responsive desktop/mobile layout.

Do NOT make it look like a generic AI-generated dashboard.

Keep the interface minimal and visually impressive.

LANDING UI:
Hero heading:
"Understand Anything. Instantly."

Subtitle:
"From blockchain to quantum physics — get explanations that actually make sense."

Large topic input:
"What do you want to understand?"

Example suggestion chips:
"Blockchain"
"Quantum Computing"
"APIs"
"Machine Learning"

Primary button:
"✨ Explain It"

RESULT UI:
Show the entered topic at the top.

Create five clearly separated cards:
👶 Explain Like I'm 5
🟢 Simple Explanation
🔬 Technical Explanation
🌎 Real-World Example
⚡ 30-Second Summary

FUNCTIONAL REQUIREMENTS:

Use React state.

Show loading state while AI responds.

Show a useful error message if the API fails.

Keep the UI functional, not just a static mockup.

Use environment variables for the AI API key.

Do not expose secrets directly in the frontend source code.

Do not add authentication, database, profiles, payments, admin panels, or unnecessary features. The goal is a polished working MVP.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/79bdf2c7-0176-470e-8977-2f0e1158fd12).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
