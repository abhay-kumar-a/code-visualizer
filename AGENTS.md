# AI Agent Instructions

## Project Context
This is a Code Visualizer project - a web-based tool to visualize code structure, dependencies, and flow.

## Tech Stack
- Frontend: React
- Backend: Node.js
- Build tool: Vite
- Visualization: D3.js

## Development Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## Code Style
- Use functional components with hooks
- Follow existing file structure patterns
- Use TypeScript for type safety
- No unnecessary comments in code

## Before Committing
1. Run `npm run lint`
2. Run `npm run typecheck`
3. Run `npm test`
4. Ensure all checks pass

## Important Notes
- Update PROJECT.md after completing significant work
- Keep components small and focused
- Follow React best practices



# Code Visualization & Interview Prep Website – Agent Implementation Guide

This document provides a step‑by‑step guide for an AI agent (or developer) to build a fully functional web application that visualizes coding problems, algorithms, and patterns to help with technical interview preparation.

---

## 📋 Project Overview

**Goal:** Create an interactive learning tool where users can:
- Watch step‑by‑step animations of algorithms (sorting, searching, etc.).
- Save and organize code snippets with key learning points.
- Browse a library of common interview questions with visual explanations.
- Explore coding patterns (sliding window, two pointers, etc.) through examples.

**Target Audience:** Self‑learners preparing for coding interviews.

**Key Features:**
- Algorithm visualizer with play/pause/step controls.
- Snippet manager with localStorage persistence.
- Pre‑loaded interview problem library.
- Pattern explorer with template code.
- Clean, responsive UI.

---

## 🧱 Technology Stack (Recommended)

| Layer          | Choice                                    | Reason                                    |
|----------------|-------------------------------------------|-------------------------------------------|
| **Frontend**   | React (with Vite) + React Router          | Fast setup, component‑based, easy routing |
| **Styling**    | Tailwind CSS                               | Utility‑first, rapid UI development       |
| **Visualization** | HTML Canvas (or D3.js if needed)        | Simple and performant for animations      |
| **State/Storage** | React Context + localStorage              | No backend needed for MVP                  |
| **Deployment** | Vercel / Netlify                           | Free and easy for static sites             |

> **Note:** You may add a backend later (Node.js + MongoDB) for user accounts and sharing, but the MVP is frontend‑only.

---

## 📁 Folder Structure (to be created)
code-visualizer/
├── public/
├── src/
│ ├── assets/ # images, icons
│ ├── components/
│ │ ├── Layout/
│ │ │ ├── Header.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── Sidebar.jsx (optional)
│ │ ├── Visualizer/
│ │ │ ├── Canvas.jsx
│ │ │ ├── Controls.jsx
│ │ │ └── index.js
│ │ ├── CodeEditor/
│ │ │ └── Editor.jsx (simple textarea or Monaco)
│ │ ├── SnippetList/
│ │ │ ├── SnippetCard.jsx
│ │ │ ├── SnippetForm.jsx
│ │ │ └── SnippetDetail.jsx
│ │ ├── ProblemViewer/
│ │ │ ├── ProblemCard.jsx
│ │ │ ├── SolutionTabs.jsx
│ │ │ └── index.js
│ │ └── common/
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ └── Tag.jsx
│ ├── hooks/
│ │ ├── useLocalStorage.js
│ │ └── useAnimation.js
│ ├── utils/
│ │ ├── algorithms/
│ │ │ ├── bubbleSort.js
│ │ │ ├── binarySearch.js
│ │ │ └── ...
│ │ ├── visualizers/
│ │ │ ├── drawArray.js
│ │ │ └── drawLinkedList.js
│ │ └── storage.js # localStorage helpers
│ ├── data/
│ │ ├── problems.json # seed problems
│ │ └── patterns.json # seed patterns
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Visualize.jsx
│ │ ├── Snippets.jsx
│ │ ├── Problems.jsx
│ │ ├── ProblemDetail.jsx
│ │ ├── Patterns.jsx
│ │ └── PatternDetail.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md



---

## 🗓️ Development Phases

### **Phase 0: Project Setup** (Estimated: 1 day)

#### Tasks
- [ ] Initialize React + Vite project:
  ```bash
  npm create vite@latest code-visualizer -- --template react
  cd code-visualizer


  npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p