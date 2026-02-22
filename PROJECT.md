# Code Visualizer Project

## Project Overview
A web-based tool to visualize code structure, algorithms, and coding patterns for interview preparation.

## Tech Stack
- Frontend: React with TypeScript
- Build tool: Vite
- Visualization: HTML Canvas (D3.js available)
- Styling: Tailwind CSS
- Routing: React Router

## Project Structure
```
/src
  /components
    /Layout - Header, Footer
    /Visualizer - Canvas, Controls
    /SnippetList - SnippetCard, SnippetForm, SnippetDetail
    /ProblemViewer - ProblemCard, SolutionTabs
    /common - Button, Modal, Tag
  /hooks - useLocalStorage, useAnimation
  /utils
    /algorithms - sorting (bubble, selection, insertion), searching (binary, linear)
    /visualizers - helpers
    storage.ts - localStorage helpers for snippets
  /data - problems.json, patterns.json
  /pages - Home, Visualize, Snippets, Problems, ProblemDetail, Patterns, PatternDetail
  App.tsx
  main.tsx
  index.css
```

## Current Progress
| Feature | Status | Notes |
|---------|--------|-------|
| Project setup | Completed | Vite + React + TypeScript |
| Folder structure | Completed | All folders created |
| Layout components | Completed | Header, Footer |
| Common components | Completed | Button, Modal, Tag |
| Custom hooks | Completed | useLocalStorage, useAnimation |
| Visualizer components | Completed | Canvas, Controls |
| Pages | Completed | All 7 pages |
| Algorithm implementations | Completed | 3 sorting, 2 searching |
| Seed data | Completed | 5 problems, 6 patterns |

## Completed Tasks
- [x] Initialize React + Vite + TypeScript project
- [x] Configure Tailwind CSS
- [x] Set up React Router
- [x] Create Layout components (Header, Footer)
- [x] Create common components (Button, Modal, Tag)
- [x] Create custom hooks (useLocalStorage, useAnimation)
- [x] Create Visualizer components (Canvas, Controls)
- [x] Implement sorting algorithms (bubble, selection, insertion)
- [x] Implement searching algorithms (binary, linear)
- [x] Create all pages (Home, Visualize, Snippets, Problems, Patterns)
- [x] Add seed data for problems and patterns

## Pending Tasks
- [ ] Add more algorithms (merge sort, quick sort, BFS, DFS)
- [ ] Add linked list visualization
- [ ] Add tree visualization
- [ ] Add graph visualization
- [ ] Add user preferences (theme toggle)
- [ ] Add code syntax highlighting
- [ ] Add more interview problems

## Decisions Made
- 2024-02-22: Used TypeScript for type safety
- 2024-02-22: Used HTML Canvas for visualizations (D3.js available for complex needs)
- 2024-02-22: Used localStorage for data persistence (no backend for MVP)

## Known Issues
- None currently

## Next Steps
1. Add more sorting algorithms (merge sort, quick sort)
2. Add graph/tree visualizations
3. Add code syntax highlighting with Prism or highlight.js

## Commands
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type check: `npm run typecheck`

## Notes for AI Sessions
- Last session date: 2024-02-22
- Last session summary: Project initialization completed with all core features
- Important context: Use `npm run typecheck` before committing changes
