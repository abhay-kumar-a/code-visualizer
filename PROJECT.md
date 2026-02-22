# Code Visualizer Project

## Project Overview
A web-based tool to visualize algorithms, manage code snippets, and browse coding patterns for technical interview preparation.

## Tech Stack
| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 + TypeScript | UI components |
| Build Tool | Vite | Dev server & bundling |
| Styling | Tailwind CSS | Utility-first CSS |
| Routing | React Router DOM | Client-side routing |
| Database | Firebase Firestore (with localStorage fallback) | Cloud data storage |
| Visualization | HTML Canvas | Algorithm animations |

## Project Structure
```
/src
  /components
    /Layout          - Header.tsx, Footer.tsx
    /Visualizer      - Canvas.tsx, Controls.tsx
    /SnippetList     - SnippetCard.tsx, SnippetForm.tsx, SnippetDetail.tsx
    /ProblemViewer   - ProblemCard.tsx, SolutionTabs.tsx
    /common          - Button.tsx, Modal.tsx, Tag.tsx
  /hooks             - useLocalStorage.ts, useAnimation.ts
  /lib               - firebase.ts (Firebase config)
  /utils
    /algorithms      - sorting.ts, searching.ts
    /visualizers     - helpers.ts
    firebaseStorage.ts - Firestore CRUD with localStorage fallback
    storage.ts       - (deprecated, replaced by firebaseStorage.ts)
  /data              - problems.json, patterns.json
  /pages
    Home.tsx
    Visualize.tsx
    Snippets.tsx
    SnippetDetailPage.tsx
    EditSnippetPage.tsx
    Problems.tsx
    ProblemDetail.tsx
    Patterns.tsx
    PatternDetail.tsx
  App.tsx
  main.tsx
  index.css
```

## Features Implemented

### 1. Algorithm Visualizer (`/visualize`)
- **Sorting:** Bubble Sort, Selection Sort, Insertion Sort
- **Searching:** Binary Search, Linear Search
- **Controls:** Play, Pause, Reset, Step (next/prev), Speed slider
- **Visual:** Canvas-based bar chart with highlighted comparisons

### 2. Code Snippets (`/snippets`) - FULL CRUD
- **Create:** Modal form with title, code, language, tags, notes
- **Read:** Card list view + detail page view
- **Update:** Edit modal and dedicated edit page
- **Delete:** Confirmation dialog before deletion
- **Storage:** Firebase Firestore with localStorage fallback

### 3. Interview Problems (`/problems`)
- 5 pre-loaded problems (Two Sum, Binary Search, Max Subarray, etc.)
- Filter by difficulty (Easy/Medium/Hard)
- Search by title/tags
- Detail view with solution code and complexity analysis

### 4. Coding Patterns (`/patterns`)
- 6 patterns (Two Pointers, Sliding Window, Fast & Slow, BFS, DFS, Binary Search)
- When to use, template code, example problems

## Firebase Integration

### Configuration
Create `.env` file in project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Setup Steps
1. Go to https://console.firebase.google.com
2. Create new project
3. Enable Firestore Database (start in test mode)
4. Get config from Project Settings → Your apps → Web app
5. Add values to `.env` file

### Fallback Behavior
- If Firebase not configured → Uses browser localStorage
- Shows "Local Storage" badge instead of "Cloud Sync"
- Displays warning banner with Firebase setup link

## Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript check
```

## Deployment

### Vercel (Recommended for Frontend)
1. Push code to GitHub
2. Import repo in Vercel
3. Add `.env` variables in Vercel dashboard
4. Deploy

### Hugging Face Spaces
1. Create new Space (Docker SDK)
2. Push code with `Dockerfile`, `nginx.conf`
3. Add `.env` variables in Space settings
4. Auto-builds and deploys

## Files for Deployment
| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build (Node → Nginx) |
| `nginx.conf` | SPA routing config |
| `.dockerignore` | Exclude unnecessary files |
| `.env.example` | Template for environment variables |

## Key Decisions Made
- **2026-02-22:** Used TypeScript for type safety
- **2026-02-22:** Used HTML Canvas (simpler than D3.js for basic animations)
- **2026-02-22:** Firebase Firestore with localStorage fallback for data persistence
- **2026-02-22:** Functional components with React hooks (no class components)
- **2026-02-22:** Async/await for Firebase operations

## Pending Tasks / Future Enhancements
- [ ] Add more algorithms (Merge Sort, Quick Sort, Heap Sort)
- [ ] Add graph/tree visualizations
- [ ] Add code syntax highlighting (Prism/highlight.js)
- [ ] Add user authentication (Firebase Auth)
- [ ] Add Spring Boot backend option (for Java developers)
- [ ] Add more interview problems
- [ ] Add dark/light theme toggle

## Known Issues
- None currently

## Notes for AI Sessions
- **Last session date:** 2026-02-22
- **Last session summary:** 
  - Completed full CRUD for code snippets
  - Integrated Firebase Firestore with localStorage fallback
  - Created interactive UI with View/Edit/Delete buttons
  - Added deployment configs for Hugging Face Spaces
- **Important context:**
  - User is a Java backend developer (learning React)
  - `.env` file is gitignored - must create locally
  - Run `npm run typecheck` before committing
  - Firebase is optional - app works with localStorage
