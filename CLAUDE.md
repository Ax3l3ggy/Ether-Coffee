# Ether-Eye - Claude Code Reference

## Project Context
AI-powered industrial diagnostics demo for aseptic filling Line-Stop incidents. Shows how AI reduces recovery time from 6 hours → 45 minutes, saving $210K per incident.

## Tech Stack
- Next.js 15 (Pages Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Lucide icons
- No backend (all hardcoded demo data)

## Key Files
- `pages/dashboard.tsx` - Main demo (300+ lines, all features)
- `pages/index.tsx` - Landing page
- `PRD.md` - Full requirements (546 lines)
- `MVP-1-HOUR.md` - Build spec (221 lines)

## Dashboard Features (All Implemented)
1. 3-second analyzing animation on load
2. Live elapsed time & cost ticker ($11.57/sec)
3. Root cause card (94% confidence, equipment ID)
4. 3 sensor cards (critical/warning/normal status)
5. Cost comparison (traditional vs AI)
6. Interactive chat (3 pre-scripted Q&A)
7. 4-step checklist (functional checkboxes)
8. Approve button (enables when all checked)
9. Success modal (shows $210K savings)

## Hardcoded Data Structure
```typescript
INCIDENT = {id, line, station, diagnosis, confidence, equipment, timestamp}
SENSORS = [{id, name, value, normal, status}] // 3 sensors
COMPARISON = {traditional, etherEye, savings}
RECOVERY_STEPS = [string] // 4 steps
CHAT_RESPONSES = {seal, spec, procedure}
```

## State Management
```typescript
[isAnalyzing, setIsAnalyzing] // 3-sec animation
[elapsedSeconds, setElapsedSeconds] // auto-increment timer
[checkedSteps, setCheckedSteps] // boolean[4]
[showSuccessModal, setShowSuccessModal]
[activeResponse, setActiveResponse] // chat UI
```

## Design System
- Background: `bg-slate-900`
- Cards: `bg-slate-800 border-slate-700`
- Critical: `bg-red-500 text-red-400`
- Warning: `bg-amber-500 text-amber-400`
- Normal: `bg-green-500 text-green-400`
- Success: `bg-green-600`
- Dark theme via `className="dark"` wrapper

## Run/Deploy
```bash
npm install
npm run dev  # → localhost:3001/dashboard
git push     # Auto-deploy to Vercel
```

## Common Tasks

### Add New Sensor
Edit `SENSORS` array in `pages/dashboard.tsx` (line ~16)

### Change Timing
- Analysis duration: `setTimeout(..., 3000)` line ~51
- Timer interval: `setInterval(..., 1000)` line ~60

### Modify Chat Responses
Edit `CHAT_RESPONSES` object (line ~35)

### Update Cost Calculation
`costPerSecond = 11.57` in `calculateLiveCost()` (line ~75)

## What NOT to Change
- Don't add real API calls (demo uses hardcoded data)
- Don't add auth/users (out of scope)
- Don't create new pages (single dashboard demo)
- Keep all logic in dashboard.tsx (no need to extract components)

## Deployment Status
- GitHub: main branch (latest: 743da4f)
- Local: http://localhost:3001
- Vercel: Ready to connect repo

## Demo Presentation Flow
1. Load page → analyzing animation (3 sec)
2. Point to diagnosis + 94% confidence
3. Click 2-3 chat questions
4. Check all 4 recovery steps
5. Click approve → modal shows $210K
6. Close modal

Total: 2 minutes

## Architecture Notes
- Pages Router (not App Router)
- All state local to dashboard component
- No database/persistence
- No external dependencies beyond npm packages
- Mobile responsive via Tailwind grid
