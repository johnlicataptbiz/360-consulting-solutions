# Copilot / AI Agent Instructions ✅

## Quick summary
- This repo is a **Vite + React (TypeScript)** SPA with a small **Node proxy server** (`server.js`) that serves `/dist` and proxies HubSpot and Gemini (Gemini is used via `@google/generative-ai`).
- Two copies of the app exist (root and `360-consulting-solutions/`) — commands and CI generally target the root `package.json`. When making changes, prioritize editing the root files; the nested copy should be synchronized as needed.

## Key files to read first 🔧
- `server.js` — proxy endpoints, HubSpot logic, and AI prompt + response handling (see `generateAIStrategy`).
- `components/CustomCalendar.tsx` — UI that consumes `/api/hubspot/oro/availability/MonthInfo`.
- `components/AIStrategist.tsx` — client gating UX, calls `/api/ai/strategist` with `{ input, email }`.
- `components/ConsultModal.tsx` — booking UI that ties into the calendar.
- `constants.tsx`, `types.ts` — canonical shapes and site-wide data.
- `README.md` — contains run/deploy notes and environment variable hints.

## Important endpoints & shapes (concrete examples) 📡
- GET `/api/hubspot/oro/availability/MonthInfo?month=YYYY-MM&timezone=Your/Zone` -> returns `{ days: [{ date: 'YYYY-MM-DD', slots: [{start, end}] }], durationMs }`.
- POST `/api/hubspot/oro/book` -> JSON body `{ firstName, lastName, email, timezone, duration, startTime }` (server validates required fields).
- POST `/api/ai/strategist` -> JSON `{ input, email }` ; server expects a JSON response with `strategy`, `operations`, `legacy` (see prompt in `generateAIStrategy`).

## Dev & debugging workflow ⚙️
- Install: `npm install`
- Frontend dev: `npm run dev` (Vite)
- Server (proxy/API): `npm start` (runs `server.js`, default port 3000)
- To test full flow locally: 
  - Run server (`npm start`) and frontend (`npm run dev`) concurrently
  - Set `VITE_HUBSPOT_PROXY_BASE_URL=http://localhost:3000` in `.env.local` so client fetches go to local server
  - For AI features, set `GEMINI_API_KEY` (or `VITE_GEMINI_API_KEY`) in the environment before starting the server
- Healthcheck: `GET /health` -> `{ ok: true, agent: 'antigravity-v1' }` (quick server verification)
- Build + static preview: `npm run build` then `npm run preview` (or deploy with `npm run deploy` using Surge)

## Conventions & gotchas ⚠️
- Vite env vars must use `VITE_` prefix for client consumption (e.g. `VITE_HUBSPOT_PROXY_BASE_URL`, `VITE_HUBSPOT_MEETING_URL`). Server reads `GEMINI_API_KEY` or `VITE_GEMINI_API_KEY`.
- The frontend uses a **gated UX**: AIStrategist shows a loading animation then asks for email before POSTing to the AI endpoint.
- `server.js` expects the model output to be valid JSON (it strips code fences and `JSON.parse`'s the result). When changing prompts, ensure the model returns strict JSON.
- HubSpot booking logic uses `HUBSPOT_MEETING_SLUG` parsing and timezone-aware date keys — tests and debugging should preserve timezone behavior.
- Default proxy used in dev files: `https://360consulting.up.railway.app`. Replace with local server in `.env.local` for local testing.

## When you change AI prompts or API behavior 🧪
- Update the prompt and include a short example input -> expected JSON output in a comment near the prompt (in `server.js`).
- Add a reproducible sample request (curl or small test) and note it in `README.md`.
- Log lead captures consistently (server logs `[LEAD] AI Strategist request from: <email>`).

## If something's unclear ❓
- Confirm whether you should edit the root app or the nested `360-consulting-solutions/` copy before making wide changes. If uncertain, prefer the root files and update both copies only if intentional.

---
If you'd like, I can now:
1) Open a short PR adding basic tests around the AI endpoint and a sample request, or
2) Add a short troubleshooting checklist to `README.md` for running the combined frontend+server locally.

Please tell me which follow-up you'd prefer or what I should change in this guidance.