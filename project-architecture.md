# Project Architecture - Code Visualizer

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          BROWSER (Client)                               │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      React Application                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │   │
│  │  │  Pages   │  │Components│  │  Hooks   │  │   Utils      │   │   │
│  │  │          │  │          │  │          │  │              │   │   │
│  │  │ Home     │  │ Header   │  │useAnim.. │  │ algorithms   │   │   │
│  │  │Visualize │  │ Footer   │  │useLocal..│  │ firebaseSt.. │   │   │
│  │  │Snippets  │  │ Canvas   │  │          │  │ storage     │   │   │
│  │  │Problems  │  │ Controls │  │          │  │             │   │   │
│  │  │Patterns   │  │ Modal    │  │          │  │             │   │   │
│  │  └────┬─────┘  └────┬─────┘  └──────────┘  └──────┬───────┘   │   │
│  │       │            │                               │            │   │
│  │       └────────────┼───────────────────────────────┘            │   │
│  │                    │                                            │   │
│  │              ┌─────▼─────┐                                      │   │
│  │              │ React     │                                      │   │
│  │              │ Router    │                                      │   │
│  │              └─────┬─────┘                                      │   │
│  └────────────────────┼────────────────────────────────────────────┘   │
│                       │                                                │
│           ┌──────────┴──────────┐                                    │
│           │                     │                                    │
│           ▼                     ▼                                    │
│  ┌─────────────────┐    ┌─────────────────┐                          │
│  │  Local Storage  │    │ Firebase        │                          │
│  │  (Browser)     │    │ Firestore       │                          │
│  │                │    │ (Cloud)         │                          │
│  └─────────────────┘    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

### Snippets CRUD Flow
```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CREATE SNIPPET                                  │
│  ┌──────────┐     ┌─────────────┐     ┌──────────────────┐           │
│  │ User     │────▶│ Snippets    │────▶│ firebaseStorage  │           │
│  │ fills    │     │ Page        │     │ .saveSnippet()   │           │
│  │ form     │     │             │     │                  │           │
│  └──────────┘     └─────────────┘     └────────┬─────────┘           │
│                                                  │                     │
│                           ┌──────────────────────┼────────────────────┐  │
│                           │                      │                    │  │
│                           ▼                      ▼                    ▼  │
│                   ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│                   │ Firebase     │    │ localStorage │    │ Update   │ │
│                   │ Firestore   │    │ (fallback)  │    │ State    │ │
│                   │ (Cloud)     │    │ Browser     │    │ UI       │ │
│                   └──────────────┘    └──────────────┘    └──────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         READ SNIPPETS                                   │
│  ┌──────────┐     ┌─────────────┐     ┌──────────────────┐           │
│  │ Page     │     │ Snippets    │────▶│ firebaseStorage  │           │
│  │ loads    │     │ useEffect   │     │ .getSnippets()  │           │
│  │          │     │             │     │                  │           │
│  └──────────┘     └─────────────┘     └────────┬─────────┘           │
│                                                  │                     │
│                           ┌──────────────────────┼────────────────────┐  │
│                           │                      │                    │  │
│                           ▼                      ▼                    ▼  │
│                   ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│                   │ Firebase     │    │ localStorage │    │ Set      │ │
│                   │ returns      │    │ returns      │    │ Snippets │ │
│                   │ Array        │    │ Array        │    │ State    │ │
│                   └──────────────┘    └──────────────┘    └──────────┘ │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         DELETE SNIPPET                                  │
│  ┌──────────┐     ┌─────────────┐     ┌──────────────────┐           │
│  │ User     │────▶│ Confirm     │────▶│ firebaseStorage  │           │
│  │ clicks   │     │ Dialog      │     │ .deleteSnippet() │           │
│  │ delete   │     │             │     │                  │           │
│  └──────────┘     └─────────────┘     └────────┬─────────┘           │
│                                                  │                     │
│                           ┌──────────────────────┼────────────────────┐  │
│                           │                      │                    │  │
│                           ▼                      ▼                    ▼  │
│                   ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│                   │ Firebase     │    │ localStorage │    │ Filter   │ │
│                   │ delete doc  │    │ remove item │    │ from UI  │ │
│                   └──────────────┘    └──────────────┘    └──────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
App
├── BrowserRouter
│   └── Routes
│       ├── Route: /
│       │   └── Home
│       │
│       ├── Route: /visualize
│       │   └── Visualize
│       │       ├── Canvas (algorithm visualization)
│       │       └── Controls (play/pause/speed)
│       │
│       ├── Route: /snippets
│       │   └── Snippets (CRUD page)
│       │       ├── SnippetCard[] (list)
│       │       └── Modal → SnippetForm
│       │
│       ├── Route: /snippets/:id
│       │   └── SnippetDetailPage
│       │
│       ├── Route: /snippets/:id/edit
│       │   └── EditSnippetPage
│       │
│       ├── Route: /problems
│       │   └── Problems
│       │       └── ProblemCard[]
│       │
│       ├── Route: /problems/:id
│       │   └── ProblemDetail
│       │
│       ├── Route: /patterns
│       │   └── Patterns
│       │
│       └── Route: /patterns/:id
│           └── PatternDetail
│
├── Header (layout)
│   └── Nav → Link[]
│
└── Footer (layout)
```

---

## Module Architecture

### 1. Firebase Storage Module
```
firebaseStorage.ts
│
 ├── interface Snippet
 │    ├── id: string
 │    ├── title: string
 │    ├── code: string
 │    ├── language: string
 │    ├── tags: string[]
 │    ├── notes: string
 │    ├── createdAt: Date
 │    └── updatedAt: Date
 │
 ├── getSnippets()        → Promise<Snippet[]>
 ├── saveSnippet(data)    → Promise<Snippet>
 ├── updateSnippet(id, data) → Promise<Snippet | null>
 ├── deleteSnippet(id)    → Promise<boolean>
 │
 └── isUsingFirebase()     → boolean
     │
     ├── If Firebase configured → Firestore operations
     └── If not configured → localStorage fallback
```

### 2. Algorithm Module
```
algorithms/
│
 ├── sorting.ts
 │    ├── bubbleSort(arr)    → SortStep[]
 │    ├── selectionSort(arr) → SortStep[]
 │    └── insertionSort(arr)  → SortStep[]
 │
 └── searching.ts
      ├── binarySearch(arr, target) → SearchStep[]
      └── linearSearch(arr, target)  → SearchStep[]

Visualization Steps:
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Array State  │───▶│ Comparison   │───▶│ Sorted       │
│ [5,3,8,1]   │    │ [3,5]        │    │ [1,3,5,8]   │
└──────────────┘    └──────────────┘    └──────────────┘
     Step 0             Step 1              Step N
```

### 3. Animation Hook
```
useAnimation(steps, options)
│
 ├── State
 │    ├── currentStep: number
 │    ├── currentData: T
 │    ├── isPlaying: boolean
 │    └── totalSteps: number
 │
 └── Methods
      ├── play()     → starts auto-advance
      ├── pause()    → stops auto-advance
      ├── reset()    → goes to step 0
      ├── step()     → advance one step
      └── goToStep() → jump to specific step
```

---

## State Management

### Local Component State (useState)
- Page-specific data (forms, filters)
- UI state (modals, loading)
- Temporary form inputs

### Custom Hooks
- `useLocalStorage` - Persist data in browser
- `useAnimation` - Algorithm visualization control

### Firebase/Realtime
- Snippets data synced from Firestore
- Real-time updates when data changes

---

## Routing Flow

```
User Action          URL Change        Component Loaded
─────────────────────────────────────────────────────
Click "Visualize"   → /visualize     → Visualize page
Click "Snippets"    → /snippets      → Snippets page
Click snippet       → /snippets/:id  → SnippetDetailPage
Click "Edit"        → /snippets/:id/edit → EditSnippetPage
Click problem       → /problems/:id  → ProblemDetail
Click pattern       → /patterns/:id  → PatternDetail
```

---

## Environment Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│                      Environment Variables                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Development (.env)              Production (Vercel/HF)         │
│  ─────────────────────            ───────────────────────        │
│  VITE_FIREBASE_API_KEY=...      VITE_FIREBASE_API_KEY=...     │
│  VITE_FIREBASE_AUTH_DOMAIN=...  VITE_FIREBASE_AUTH_DOMAIN=... │
│  VITE_FIREBASE_PROJECT_ID=...   VITE_FIREBASE_PROJECT_ID=...  │
│  ...                             ...                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Build & Deployment Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT                                     │
│                                                                          │
│  npm run dev                                                           │
│     │                                                                  │
│     ▼                                                                  │
│  Vite Dev Server (localhost:5173)                                      │
│     │                                                                  │
│     ├── HMR (Hot Module Replacement)                                   │
│     └── Source maps enabled                                             │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION BUILD                                │
│                                                                          │
│  npm run build                                                         │
│     │                                                                  │
│     ├── TypeScript compilation (tsc -b)                                │
│     ├── ESLint checking                                                │
│     ├── Vite bundling                                                  │
│     │                                                                  │
│     │    ┌─────────────────────────────────────────────┐               │
│     │    │              Output (dist/)                │               │
│     │    │                                             │               │
│     │    │  index.html                                │               │
│     │    │  assets/                                   │               │
│     │    │    ├── index-xxxxx.js   (bundle)          │               │
│     │    │    └── index-xxxxx.css  (styles)          │               │
│     │    │                                             │               │
│     │    └─────────────────────────────────────────────┘               │
│     │                                                                  │
│     ▼                                                                  │
│  npm run preview  OR  Deploy to Vercel/HuggingFace                     │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Data Models

### Snippet (Firestore Collection: snippets)
```typescript
{
  id: string;              // Auto-generated by Firestore
  title: string;           // Required
  code: string;            // Required
  language: string;        // "javascript" | "typescript" | "python" | etc.
  tags: string[];         // Array of tags
  notes: string;          // Optional notes
  createdAt: Timestamp;   // Server timestamp
  updatedAt: Timestamp;   // Server timestamp
}
```

### Problem (Static JSON)
```typescript
{
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  solution: string;
  timeComplexity: string;
  spaceComplexity: string;
  tags: string[];
}
```

### Pattern (Static JSON)
```typescript
{
  id: string;
  name: string;
  description: string;
  whenToUse: string[];
  templateCode: string;
  examples: string[];
}
```

---

## Key Files Summary

| File | Purpose |
|------|---------|
| `App.tsx` | Main router & layout |
| `firebaseStorage.ts` | CRUD operations with fallback |
| `firebase.ts` | Firebase initialization |
| `algorithms/sorting.ts` | Sorting algorithm implementations |
| `algorithms/searching.ts` | Search algorithm implementations |
| `useAnimation.ts` | Animation control hook |
| `Canvas.tsx` | Algorithm visualization component |
| `problems.json` | Static problem data |
| `patterns.json` | Static pattern data |
| `.env.example` | Environment template |

---

## Security Notes

- Firebase rules should be configured for production
- `.env` file contains secrets - never commit to git
- localStorage is not secure for sensitive data
- Consider Firebase Auth for user-specific data
