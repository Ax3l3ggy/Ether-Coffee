# Product Requirements Document: Ether-Eye Demo

## Executive Summary

Ether-Eye is an AI-powered industrial diagnostic system designed to transform Ether Coffee's Line-Stop recovery process from hours of manual investigation to seconds of intelligent root cause analysis. This PRD outlines the **demo prototype** - a mock frontend application that simulates the core user experience and value proposition.

**Demo Goal**: Showcase how Ether-Eye would reduce Line-Stop recovery time from 4-6 hours to under 30 minutes through intelligent root cause diagnosis and guided recovery protocols.

**Technical Scope**: Frontend-only application with simulated telemetry data and mock AI responses. No backend integration, real sensor connections, or live AI models.

---

## Problem Statement

### Current State Pain Points

**1. The Data Blizzard Challenge**
- 55,000 sensors generating millions of data points per second
- During Line-Stop events, technicians face overwhelming error logs with no contextual guidance
- Manual correlation of sensor anomalies across temperature, pressure, flow rate, and PH systems takes hours

**2. The Sterility Mystery**
- Root cause identification requires manual review of static 400-page technical PDFs
- Documentation written in highly technical language not optimized for crisis response
- Average investigation time: 2-4 hours per incident

**3. The High-Stakes Recovery Dilemma**
- SOP Cleaning (re-sterilization) takes 4-6 hours regardless of actual root cause
- Incorrect diagnosis leads to repeat Line-Stops, compounding losses
- Each minute of downtime = thousands in lost revenue + tens of thousands of gallons discarded
- Wrong decisions risk consumer illness and brand-destroying recalls

### Industry Context

Aseptic filling is a zero-fault-tolerance environment. A Loss of Sterility (LOS) event isn't just a production delay—it's a potential food safety crisis. The current "better safe than sorry" approach of full line cleaning for every anomaly is economically unsustainable and operationally inefficient.

---

## Solution Overview

### Ether-Eye: The Industrial Detective

Ether-Eye is a three-layer AI system that operates as the technician's trusted co-pilot during Line-Stop events:

**Layer 1: Real-Time Telemetry Intelligence**
- Continuous monitoring of all 55,000 sensors with pattern recognition
- Anomaly detection that distinguishes true sterility threats from transient sensor glitches
- Pre-incident alerting for early intervention (predictive mode)

**Layer 2: Domain Knowledge Extraction**
- RAG (Retrieval-Augmented Generation) system ingesting 400-page technical manuals
- Natural language interface to query equipment specifications, SOP procedures, and historical incident patterns
- Context-aware responses that cite specific manual sections with page references

**Layer 3: Root Cause Diagnosis & Recovery Orchestration**
- Multi-modal analysis combining telemetry patterns with equipment knowledge
- Confidence-scored diagnosis with decision tree visualization
- Step-by-step recovery protocols tailored to the specific failure mode
- Safety validation checks before recommending line restart vs. full SOP cleaning

---

## Key Features

### 1. Incident Dashboard (Crisis Command Center)

**When a Line-Stop occurs:**

```
┌─────────────────────────────────────────────────────────────────┐
│ ETHER-EYE INCIDENT #2847                                        │
│ Line 3 - Aseptic Fill Station Alpha                            │
│ Stopped: 14:23:47 PST | Elapsed: 00:02:34                      │
└─────────────────────────────────────────────────────────────────┘

🔴 ROOT CAUSE IDENTIFIED (Confidence: 94%)
───────────────────────────────────────────────────────────────────
Steam Pressure Drop in Sterilization Tunnel (Zone 4)
├─ Primary Trigger: Pressure sensor PT-4472 shows 15% deviation
├─ Correlated Events: Temperature lag in TT-4473 (2.3s delay)
└─ Historical Pattern: Matches 7 previous incidents (all resolved)

📊 SUPPORTING EVIDENCE
───────────────────────────────────────────────────────────────────
• Steam supply pressure: 285 PSI → 242 PSI (target: 290 PSI)
• Zone 4 tunnel temp: 138°C → 134°C (critical threshold: 135°C)
• No anomalies detected in: seals, flow rates, PH sensors

📋 RECOMMENDED RECOVERY PATH
───────────────────────────────────────────────────────────────────
✓ Short Recovery Protocol (Estimated: 45 minutes)
  1. Inspect steam trap ST-447 for blockage
  2. Verify boiler output pressure at header
  3. Run Zone 4 re-sterilization cycle (localized)
  4. Validate sensor readings return to baseline

❌ Full SOP Cleaning NOT required (unless inspection reveals physical contamination)

⚠️  SAFETY CHECKS REQUIRED BEFORE RESTART
───────────────────────────────────────────────────────────────────
[ ] Steam pressure stable for 5 minutes at target
[ ] Zone 4 temperature readings within ±1°C tolerance
[ ] Visual inspection of tunnel seals completed
[ ] Product contact surfaces validated sterile

[ASK ETHER-EYE]  [VIEW TELEMETRY]  [EXPORT REPORT]
```

**Key UX Principles:**
- **Technician-first language**: Translates sensor IDs (PT-4472) to physical locations ("Steam trap near Fill Station Alpha, left side")
- **Confidence scoring**: Never presents diagnosis without probability and supporting evidence
- **Historical context**: "We've seen this 7 times before—here's what worked"
- **Decision tree visualization**: Shows why other failure modes were ruled out

---

### 2. Conversational Technical Assistant

**Natural language interface to the knowledge base:**

```
Technician: "What's the proper steam pressure range for Zone 4?"

Ether-Eye:
According to Technical Manual TM-4472 (Section 3.2.4, Page 87):

Zone 4 Sterilization Tunnel Requirements:
• Operating pressure: 285-295 PSI
• Critical low threshold: 280 PSI (triggers alarm)
• Sterility compromise threshold: <275 PSI for >30 seconds

Current reading: 242 PSI ⚠️  BELOW CRITICAL

Recommended action: Immediate investigation of steam supply before
considering line restart.

[View full section] [Related procedures] [Historical incidents]
```

**Capabilities:**
- Multi-document search across equipment manuals, SOPs, incident logs
- Contextual responses that know "Zone 4" refers to the specific equipment involved in current incident
- Citation-backed answers with PDF page references for verification
- Ability to explain technical jargon ("What does 'tunnel seal integrity' mean?")

---

### 3. Predictive Monitoring Mode

**Proactive detection before Line-Stop:**

```
⚠️  EARLY WARNING - Line 3
───────────────────────────────────────────────────────────────────
Detected drift in steam pressure trend (Zone 4)
• Current: 287 PSI (within spec, but declining)
• Rate of change: -2 PSI per hour
• Predicted critical threshold breach: ~45 minutes

Recommended: Schedule preventive inspection during next planned
changeover (SKU transition in 23 minutes)

This could prevent Line-Stop #2847 ✓
```

**Value proposition:**
- Shift from reactive crisis management to proactive maintenance
- Prevent Line-Stops entirely through early intervention
- Reduce false positives by learning normal operational variations

---

### 4. Post-Incident Analytics

**Learning system that improves over time:**

- Incident pattern library: Clusters similar failures for faster future diagnosis
- Recovery effectiveness tracking: Did the recommended protocol work?
- Sensor reliability scoring: Which sensors produce false alarms?
- Cost impact modeling: Calculate actual savings per incident

---

## User Personas & Flows

### Primary: Plant Floor Technician (Maria)

**Profile:**
- 8 years experience in aseptic operations
- High mechanical aptitude, limited data science background
- Works 12-hour shifts under pressure during Line-Stops
- Primary goal: Get line running safely as fast as possible

**Critical User Flow:**
1. **Alert received**: Line-Stop alarm triggers Ether-Eye dashboard on shop floor tablet
2. **Rapid diagnosis**: Within 60 seconds, sees root cause with confidence score
3. **Validation**: Asks follow-up questions ("Could this be a seal failure instead?")
4. **Decision**: Reviews recommended recovery path vs. full SOP cleaning
5. **Execution**: Follows step-by-step protocol with safety checklist
6. **Restart**: Validates all safety checks before line restart
7. **Documentation**: Ether-Eye auto-generates incident report for compliance

**Success criteria:**
- Maria trusts the system enough to follow recommendations without second-guessing
- She can explain diagnosis to plant manager using Ether-Eye's evidence
- She feels empowered, not replaced, by the AI

---

### Secondary: Plant Manager (James)

**Profile:**
- Responsible for production efficiency and safety compliance
- Needs to justify decisions to corporate leadership
- Tracks KPIs: downtime minutes, product discard volume, safety incidents

**Critical User Flow:**
1. **Real-time monitoring**: Views active incidents from office dashboard
2. **Audit trail**: Reviews technician decisions and AI recommendations
3. **Trend analysis**: Identifies recurring failure modes for capex planning
4. **Reporting**: Exports monthly summaries for executive review

**Success criteria:**
- Reduced downtime shows measurable ROI
- Zero safety incidents attributable to AI-recommended decisions
- Data-driven maintenance budget justification

---

## Demo Technical Architecture

### Technology Stack

**Frontend Framework**
- Next.js 14+ (React) with TypeScript
- Tailwind CSS for styling
- shadcn/ui for UI components (already in project)
- Framer Motion for animations (optional, for polish)

**Mock Data Layer**
- Static JSON files simulating:
  - Real-time sensor telemetry (55,000 sensor readings)
  - Historical incident patterns
  - Equipment technical specifications
  - Recovery protocols
- Client-side state management (React Context or Zustand)

**Simulated Intelligence**
- Pre-scripted "AI" responses for demo scenarios
- Timed animations to simulate "analysis in progress"
- Hard-coded root cause diagnoses with confidence scores
- Canned chat responses for technical assistant feature

**Deployment**
- Vercel deployment (for wow-factor points)
- Responsive design for desktop + tablet view
- No backend required - fully static/client-side

---

## Success Metrics

### Primary KPIs (North Star Alignment)

| Metric | Baseline | Target (6 months) | Measurement |
|--------|----------|-------------------|-------------|
| **Mean Time to Diagnosis** | 2-4 hours | <10 minutes | Time from Line-Stop to confirmed root cause |
| **Mean Time to Recovery** | 4-6 hours | <30 minutes | Time from Line-Stop to line restart |
| **Product Discard Volume** | ~50K gal/incident | <10K gal/incident | Volume discarded per Line-Stop |
| **Diagnostic Accuracy** | N/A (manual) | >90% | AI diagnosis confirmed correct post-incident |
| **False Positive Rate** | N/A | <5% | AI recommends short recovery, but full SOP needed |

### Secondary KPIs

- **Prevented Line-Stops**: Number of incidents caught by predictive monitoring
- **User Trust Score**: Technician survey on confidence in AI recommendations
- **Documentation Access Time**: Time to find relevant manual section (hours → seconds)
- **Repeat Incident Rate**: % of Line-Stops recurring within 24 hours (target: <2%)

### Safety Gate Metrics (Non-Negotiable)

- **Zero sterility breaches** in production SKUs following AI-recommended restart
- **100% audit trail** for all incidents (compliance requirement)
- **Zero false negatives**: AI never misses a true sterility threat

---

## Demo Implementation Plan

### Core Demo Features (MVP) - SIMPLIFIED

**ONE SINGLE PAGE: The Incident Dashboard**

Shows everything in one view:

**Top Section - The Crisis**
- Incident header: "LINE-STOP #2847 | Line 3 | Elapsed: 00:04:23"
- Cost ticker: "$21,150 and counting..."

**Middle Section - The Diagnosis (appears after 3-second "analyzing" animation)**
- Root cause card with confidence: "Steam Pressure Drop - Zone 4 (94% confidence)"
- Mini sensor panel: 3-4 key metrics (pressure, temp, flow) with visual status
- Historical context: "Matches 7 previous incidents - all resolved without full SOP"

**Bottom Section - The Solution**
- Two side-by-side cards:
  - ❌ Traditional: "6 hours, 50K gallons, $250K"
  - ✅ Ether-Eye: "45 min, 8K gallons, $40K"
- Simple 4-step recovery checklist with checkboxes
- Big green "APPROVE RECOVERY PLAN" button

**Right Sidebar - The Assistant (wow-factor)**
- Chat interface with 3 pre-canned question buttons:
  - "What's the steam pressure spec?"
  - "Could this be a seal failure?"
  - "Show recovery procedure"
- Click button → instant response with technical manual citation

### ONE Demo Scenario

**Scenario A: Steam Pressure Drop** (Only one needed)
- Line 3 stops due to Zone 4 steam pressure anomaly
- AI diagnoses blocked steam trap ST-447 (94% confidence)
- Recovery: Localized re-sterilization (45 min vs 6 hrs)
- Outcome: 37K gallons saved, $210K cost avoidance

**Demo Flow:**
1. Page loads showing "analyzing..." (3 seconds)
2. Diagnosis appears with all info visible (no scrolling)
3. Presenter clicks 2-3 chat questions to show assistant
4. Presenter checks off safety items
5. Clicks "Approve" → success state with savings summary

**CUTTING:**
- ❌ Multiple scenarios (just do one well)
- ❌ Animated timeline playback (too complex)
- ❌ Real-time chart animations (static charts are fine)
- ❌ Predictive monitoring mode (save for "future roadmap" slide)
- ❌ Separate pages/routes (everything on one page)

---

## UI/UX Design Specifications

### Color Palette (Ether Coffee Industrial Theme)

**Status Colors**
- 🟢 Normal/Safe: `#10B981` (green-500)
- 🟡 Warning/Caution: `#F59E0B` (amber-500)
- 🔴 Critical/Line-Stop: `#EF4444` (red-500)
- 🔵 Info/Neutral: `#3B82F6` (blue-500)

**Background**
- Primary: `#0F172A` (slate-900) - Dark industrial feel
- Secondary: `#1E293B` (slate-800)
- Cards: `#334155` (slate-700)
- Text: `#F1F5F9` (slate-100)

**Accents**
- Success: `#22C55E` (green-500)
- Confidence High: `#06B6D4` (cyan-500)
- Highlight: `#8B5CF6` (violet-500)

### Typography
- Headers: Bold, sans-serif (Inter or System UI)
- Body: Regular, monospace for sensor IDs (e.g., `PT-4472`)
- Status text: All-caps for emphasis (`LINE-STOP`, `CRITICAL`)

### Component Library (Using shadcn/ui)
- Cards for incident panels
- Badge for status indicators
- Progress bars for confidence scores
- Chart components for telemetry visualization (recharts)
- Command palette for chat interface
- Alert dialogs for safety confirmations

### Layout Principles
- **High-density information**: Technicians need data at a glance
- **Clear visual hierarchy**: Most critical info (root cause) at top
- **Tablet-optimized**: 10-12" screen is primary target
- **Minimal scrolling**: Key decisions visible without scroll
- **Redundant status indicators**: Color + icon + text (accessibility)

---

## Competitive Differentiation

### Why This Isn't Just "Another Dashboard"

**1. Domain-Specific Intelligence**
- Not a generic IoT analytics platform
- Trained specifically on aseptic filling process nuances
- Understands sterility as a zero-tolerance binary, not a statistical risk

**2. Crisis-Optimized UX**
- Designed for 30-second decision-making under pressure
- Technician language, not data scientist language
- Mobile-first for plant floor reality

**3. Knowledge + Data Fusion**
- Combines real-time telemetry with static technical documentation
- Bridges the gap between "what happened" and "how to fix it"
- Context-aware responses that know the current crisis

**4. Safety-First Architecture**
- Human-in-the-loop at critical decision points
- Confidence scoring prevents overconfident mistakes
- Audit trail for regulatory compliance built-in

---

## Out of Scope (Demo) - UPDATED

**Not Building:**
- Real backend/API integration
- Actual AI/ML models
- Live sensor data ingestion
- Database or data persistence
- User authentication
- PDF document processing
- Real-time WebSocket connections
- Mobile native app
- Multiple pages/routes
- Admin/management analytics dashboard
- Historical incident log viewer
- User settings/preferences
- Multi-scenario switching
- Animated charts (static is fine)
- Predictive monitoring mode (mention as "future" only)

**Building:**
- ✅ ONE page showing ONE incident
- ✅ 3-second loading animation
- ✅ Static sensor readings (no live updates)
- ✅ 3 pre-canned chat responses
- ✅ Simple checkboxes for recovery steps
- ✅ Cost comparison cards
- ✅ "Simulate Line-Stop" button to trigger demo
- ✅ Success state after approval

**Total Components Needed:**
1. Main layout (dark industrial theme)
2. Incident header card
3. Diagnosis card with confidence bar
4. Sensor panel (3-4 small metric cards)
5. Comparison cards (traditional vs Ether-Eye)
6. Recovery checklist
7. Chat sidebar (3 buttons, 1 response area)
8. Approve button + success modal

**Estimated Build Time: 4-6 hours** (with shadcn/ui components)

---

## Simplified Mock Data (Can be inline in code, no separate files needed)

**Option 1: Hardcode everything in React state** (Recommended)
- Faster to build
- No file I/O
- Just define objects in the component

**Option 2: One simple JSON file** (if you prefer)
```json
{
  "incident": {
    "id": "2847",
    "line": "Line 3",
    "diagnosis": "Steam Pressure Drop in Sterilization Tunnel (Zone 4)",
    "confidence": 94,
    "equipment": "Steam Trap ST-447",
    "traditional_cost": 250000,
    "ether_eye_cost": 40000,
    "savings": 210000
  },
  "sensors": [
    {"id": "PT-4472", "name": "Steam Pressure", "value": 242, "normal": "285-295 PSI", "status": "critical"},
    {"id": "TT-4473", "name": "Zone 4 Temp", "value": 134, "normal": "137-139°C", "status": "warning"},
    {"id": "FT-4401", "name": "Flow Rate", "value": 95, "normal": "90-100 GPM", "status": "normal"}
  ],
  "recovery_steps": [
    "Inspect steam trap ST-447 for blockage",
    "Verify boiler output pressure at header",
    "Run Zone 4 re-sterilization cycle",
    "Validate sensor readings return to baseline"
  ],
  "chat_responses": {
    "seal_failure": "No - seal failures show temperature AND flow anomalies. We're only seeing pressure drop in Zone 4. Historical data shows this pattern matches steam trap blockages (7 previous incidents).",
    "pressure_spec": "According to Technical Manual TM-4472 (Section 3.2.4, Page 87):\n\n• Operating pressure: 285-295 PSI\n• Critical threshold: 280 PSI\n• Sterility compromise: <275 PSI for >30 seconds\n\nCurrent reading: 242 PSI ⚠️ BELOW CRITICAL",
    "recovery_procedure": "Zone 4 Re-Sterilization Protocol (TM-4472:134):\n\n1. Isolate Zone 4 from production line\n2. Increase steam flow to 110% for 10 minutes\n3. Hold at 290 PSI for 15 minutes\n4. Run 3 validation cycles with test bottles\n5. Visual inspection of all seals\n\nEstimated time: 45 minutes"
  }
}
```

**Recommendation**: Start with hardcoded data in React component, only move to JSON if you have time.

---

## Demo Presentation Flow (5 Minutes Total)

### Setup (Before demo starts)
- Browser open to dashboard
- Page shows "SYSTEM READY - Monitoring 8 production lines"
- Big red "SIMULATE LINE-STOP" button visible

### Act 1: Trigger the Crisis (0:30)
- Click "SIMULATE LINE-STOP" button
- Screen updates to incident view
- Call out: "Line just stopped. In 5 minutes, this will cost $25,000. Let's see what Ether-Eye finds."

### Act 2: The Diagnosis (1:00)
- 3-second "analyzing" spinner
- Diagnosis appears: Steam pressure drop, 94% confidence
- Point out: "In seconds, not hours, we know it's Zone 4 steam trap"
- Highlight: "Matches 7 previous incidents - all resolved quickly"

### Act 3: The Assistant (2:00)
- Click chat question: "Could this be a seal failure?"
- AI responds: "No - seal failures show temperature and flow anomalies. We're only seeing pressure drop."
- Click: "What's the steam pressure spec?"
- AI shows technical manual citation
- Say: "400 pages of technical docs, instant answers"

### Act 4: The Decision (1:00)
- Point to comparison cards:
  - Traditional: 6 hrs, $250K loss
  - Ether-Eye: 45 min, $40K loss
- Say: "$210K saved per incident"
- Check off safety items, click "Approve"

### Act 5: Close (0:30)
- Success screen shows: "Recovery plan approved - savings: $210K"
- Final message: "From hours of guesswork to minutes of confidence"
- Optional: "Next step: predictive alerts to prevent these entirely"

**One-sentence backup**: If demo fails, say: "The core value is turning a data blizzard into a single confident recommendation, saving 5+ hours and $200K+ per incident."

---

## Success Vision

**In 6 months, a plant floor technician says:**

> "Before Ether-Eye, a Line-Stop meant panic and hours of guesswork. Now? I see the diagnosis in under a minute, I understand why, and I know exactly what to check. I'm not just a button-pusher anymore—I'm the expert who validates what the AI found. We've cut our downtime by 75%, and I sleep better knowing we're not guessing about sterility."

**That's the transformation Ether-Eye delivers.**
