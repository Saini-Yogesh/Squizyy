# AI Agent Operating Guidelines & Project Memory

This file is the **single source of truth** for AI coding agents (Cursor, VS Code Copilot, Claude Code, Windsurf, Gemini CLI, Codex, etc.) and human contributors working on the Squizyy / Drizzy codebase.

---

## 1. Mandatory AI Workflow & Operating Rules

Every AI agent working on this repository **must** adhere to the following protocol:

### Step 1: Context Loading & Targeted Discovery (Do NOT Scan Everything)
1. **Read `AGENTS.md` and `docs/ai/PROJECT_MAP.md` first**: Use the project map to locate the exact files, services, components, and models relevant to your task.
2. **Inspect ONLY relevant files**: Open only the target files and their direct dependencies.
3. **NEVER scan, print, or list the entire repository or full folder trees** unless explicitly asked by the user or strictly technically required.
4. **Reuse verified context**: Leverage verified project knowledge already present in the active conversation context. Only re-read files if they may have changed.
5. **Expand scope conservatively**: Deepen investigation only when debugging an unknown root cause, tracing an unmapped dependency, addressing security concerns, or confirming an API contract.

### Step 2: Safe Code Modification
1. **Check Git diff & existing behavior**: Before applying changes, inspect the file and `git diff` to understand existing logic and strictly preserve unrelated user changes.
2. **Maintain established patterns**:
   - Frontend components use **CSS Modules (`*.module.css`)**. Do NOT add Tailwind CSS classes or inline styles.
   - Global tokens live in `client/src/styles/variables.css`.
   - Backend routes follow the **Route -> Controller -> Service -> Model** architecture.
3. **Preserve business logic**: Never simplify or replace authentic UI, graphics, brand animations, copy, or business logic with placeholder stubs.

### Step 3: Incremental Documentation Maintenance
1. **Update docs ONLY when relevant**: If you added, moved, or removed files, updated API contracts, changed environment variables, or modified architectural patterns:
   - Incrementally update `docs/ai/PROJECT_MAP.md`.
   - Incrementally update `docs/ai/API_REFERENCE.md` if endpoints changed.
   - Incrementally update `docs/ai/ARCHITECTURE.md` if design patterns evolved.
   - Record significant milestones in `docs/ai/CHANGELOG.md`.
2. **Never regenerate entire documentation files**: Make surgical, incremental edits to preserve manual annotations and formatting.
3. **Run the doc verification script**: Run `npm run doc:verify` to ensure all file paths referenced in the project map exist on disk.

### Step 4: Verification & Honest Reporting
1. **Run relevant checks**:
   - Client build check: `npm run client:build`
   - Doc path verification: `npm run doc:verify`
   - Server health check: `node -e "require('./server/src/app');"`
2. **Never claim verification without running commands**: State precisely what checks were executed and what their exact exit statuses were.
3. **Provide concise summaries**: Report files modified, documentation updated, verification checks performed, and any edge cases or unresolved items.

---

## 2. Documentation Directory Map

All project knowledge is curated in `docs/ai/`:

| Document | Purpose | When to Consult |
| :--- | :--- | :--- |
| **`docs/ai/PROJECT_MAP.md`** | Verified file paths, feature-to-file mapping, entry points, and commands. | **Always consult first** before touching any code. |
| **`docs/ai/ARCHITECTURE.md`** | Design system, CSS Modules guidelines, state management, and backend patterns. | When designing components, altering state, or adding services. |
| **`docs/ai/API_REFERENCE.md`** | REST endpoints, request/response payloads, authentication, and HTTP status codes. | When writing or consuming backend APIs. |
| **`docs/ai/CHANGELOG.md`** | Chronological record of major architectural shifts, refactorings, and bug fixes. | When reviewing recent system changes or tracking modifications. |

---

## 3. Technology Stack Summary

- **Frontend (`client/`)**:
  - React 18, Vite 5, React Router v6.
  - **Styling**: Pure CSS Modules (`*.module.css`) + CSS Custom Properties. Tailwind CSS is prohibited.
  - **State**: `CartContext.jsx` with persistent `localStorage` and dual-API compatibility.
  - **Icons**: `lucide-react`.
  - **HTTP Client**: Axios (`client/src/services/api.js`) with 10s timeout and defensive data normalization.
- **Backend (`server/`)**:
  - Node.js, Express, Mongoose (MongoDB).
  - In-memory resilient mock fallbacks for zero-downtime offline development.
  - Input validation: RFC 5322 email regex, range clamps, centralized error handling.
- **Monorepo Scripts (Root `package.json`)**:
  - `npm run dev`: Runs frontend (5173) and backend (5000) concurrently.
  - `npm run client:build`: Generates frontend production bundle in `client/dist/`.
  - `npm run doc:verify`: Validates all referenced paths in documentation and checks for drift.

---

## 4. Cross-IDE Compatibility Setup

This `AGENTS.md` file is the universal reference. If your tool requires its own configuration file, create a lightweight pointer rather than duplicating instructions:

- **Claude Code**: See `CLAUDE.md` (points to `AGENTS.md`).
- **Cursor**: See `.cursorrules` (points to `AGENTS.md`).
- **GitHub Copilot**: See `.github/copilot-instructions.md` (points to `AGENTS.md`).
- **Gemini CLI / Code**: See `GEMINI.md` (points to `AGENTS.md`).
- **Windsurf / Others**: Direct agent to read `AGENTS.md` and `docs/ai/PROJECT_MAP.md` at task inception.
