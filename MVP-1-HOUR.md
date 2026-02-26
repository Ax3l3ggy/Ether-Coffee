# Ether-Eye: 1-Hour MVP

## Build This and Only This

### ONE PAGE - Static Dashboard (No Animations)

**Layout: 2-column grid**

```
┌─────────────────────────────────────────────────────────────┐
│ ETHER-EYE | INCIDENT #2847                                  │
│ Line 3 - Aseptic Fill Station Alpha | Stopped: 14:23:47    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┐
│ LEFT COLUMN (Main Content)   │ RIGHT COLUMN (Chat)          │
│                              │                              │
│ 🔴 ROOT CAUSE (94%)          │ 💬 ASK ETHER-EYE             │
│ Steam Pressure Drop - Zone 4 │                              │
│ Equipment: Steam Trap ST-447 │ [Could this be seal failure?]│
│                              │ [What's the pressure spec?]  │
│ 📊 SENSORS (3 cards)         │ [Show recovery procedure]    │
│ • Steam Pressure: 242 PSI ❌ │                              │
│ • Temperature: 134°C ⚠️       │ [Response appears here when  │
│ • Flow Rate: 95 GPM ✓        │  button clicked]             │
│                              │                              │
│ 💰 COST COMPARISON           │                              │
│ ┌──────────┬──────────┐      │                              │
│ │Traditional│Ether-Eye│      │                              │
│ │ 6 hours  │ 45 min  │      │                              │
│ │ $250K    │ $40K    │      │                              │
│ └──────────┴──────────┘      │                              │
│ Savings: $210K               │                              │
│                              │                              │
│ ✅ RECOVERY CHECKLIST        │                              │
│ □ Inspect steam trap ST-447  │                              │
│ □ Verify boiler pressure     │                              │
│ □ Run Zone 4 re-sterilization│                              │
│ □ Validate sensor readings   │                              │
└──────────────────────────────┴──────────────────────────────┘
```

## What to Build (Priority Order)

### 1. Basic Layout (10 min)
- Dark background (`bg-slate-900`)
- Header with incident info
- 2-column grid (left: main, right: chat)

### 2. Root Cause Card (10 min)
- Red border card with diagnosis
- "94% confidence" badge
- Equipment name

### 3. Sensor Cards (15 min)
- 3 small cards in a row
- Show: name, value, normal range, status color
- Use shadcn/ui Card component

### 4. Cost Comparison (10 min)
- 2 side-by-side cards
- Traditional vs Ether-Eye
- Big savings number at bottom

### 5. Chat Sidebar (15 min) ⭐ WOW-FACTOR
- 3 buttons for questions
- Text area for response
- onClick → show hardcoded response

**If you run out of time, STOP HERE. Skip the checklist.**

### 6. Recovery Checklist (Optional - last 10 min if time permits)
- 4 checkboxes with labels
- Just visual, doesn't need to do anything

## Hardcoded Data (Copy-paste into component)

```typescript
const INCIDENT = {
  id: "2847",
  line: "Line 3",
  station: "Aseptic Fill Station Alpha",
  diagnosis: "Steam Pressure Drop in Sterilization Tunnel (Zone 4)",
  confidence: 94,
  equipment: "Steam Trap ST-447",
  timestamp: "14:23:47 PST"
}

const SENSORS = [
  { id: "PT-4472", name: "Steam Pressure", value: "242 PSI", normal: "285-295 PSI", status: "critical" },
  { id: "TT-4473", name: "Zone 4 Temp", value: "134°C", normal: "137-139°C", status: "warning" },
  { id: "FT-4401", name: "Flow Rate", value: "95 GPM", normal: "90-100 GPM", status: "normal" }
]

const COMPARISON = {
  traditional: { time: "6 hours", cost: "$250,000", gallons: "50K gal" },
  etherEye: { time: "45 minutes", cost: "$40,000", gallons: "8K gal" },
  savings: "$210,000"
}

const RECOVERY_STEPS = [
  "Inspect steam trap ST-447 for blockage",
  "Verify boiler output pressure at header",
  "Run Zone 4 re-sterilization cycle (localized)",
  "Validate sensor readings return to baseline"
]

const CHAT_RESPONSES = {
  seal: "No - seal failures show temperature AND flow anomalies. We're only seeing pressure drop in Zone 4. Historical data shows this pattern matches steam trap blockages (7 previous incidents).",

  spec: "According to Technical Manual TM-4472 (Section 3.2.4, Page 87):\n\n• Operating pressure: 285-295 PSI\n• Critical threshold: 280 PSI\n• Sterility compromise: <275 PSI for >30 seconds\n\nCurrent reading: 242 PSI ⚠️ BELOW CRITICAL",

  procedure: "Zone 4 Re-Sterilization Protocol (TM-4472:134):\n\n1. Isolate Zone 4 from production line\n2. Increase steam flow to 110% for 10 minutes\n3. Hold at 290 PSI for 15 minutes\n4. Run 3 validation cycles\n\nEstimated time: 45 minutes"
}
```

## Component Structure

```
app/
├── page.tsx (main dashboard - ALL CODE GOES HERE)
└── layout.tsx (already exists)

components/ (optional - only if you want to organize)
├── incident-header.tsx
├── diagnosis-card.tsx
├── sensor-grid.tsx
├── cost-comparison.tsx
└── chat-sidebar.tsx
```

**Recommendation**: Put EVERYTHING in `page.tsx` for speed. Don't over-engineer.

## Design Tokens (Copy-paste)

```typescript
const colors = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  normal: "bg-green-500",
  background: "bg-slate-900",
  card: "bg-slate-800",
  border: "border-slate-700"
}
```

## Demo Script (2 Minutes)

1. **Open page** (0:10)
   - "This is what a technician sees during a Line-Stop"

2. **Point to diagnosis** (0:30)
   - "In seconds, AI identifies root cause with 94% confidence"
   - "It's a steam trap, not a seal or contamination issue"

3. **Show sensors** (0:20)
   - "System analyzed all sensors, highlighted the critical ones"

4. **Click chat buttons** (0:40)
   - Click "Could this be a seal failure?"
   - Read response
   - Click "What's the pressure spec?"
   - Show technical manual citation

5. **Point to savings** (0:20)
   - "Traditional recovery: 6 hours, $250K loss"
   - "With Ether-Eye: 45 minutes, $40K loss"
   - "$210K saved per incident"

**Close**: "From hours of guesswork to minutes of confidence. That's Ether-Eye."

## If You Only Have 45 Minutes

**Build in this order, stop when time's up:**

1. ✅ Layout + Header (5 min)
2. ✅ Diagnosis Card (5 min)
3. ✅ Sensor Cards (10 min)
4. ✅ Cost Comparison (10 min)
5. ✅ Chat Sidebar with 3 buttons (15 min) ⭐
6. ❌ Skip checklist

**You'll still hit all scoring criteria:**
- ✅ Problem alignment (diagnosis + sensors)
- ✅ Functionality (chat assistant)
- ✅ Business value (cost comparison)
- ✅ Presentation (clear narrative)
- ✅ Wow-factor (AI chat)

## What NOT to Do

- ❌ Don't add animations
- ❌ Don't add a "simulate" button (just load with data)
- ❌ Don't make checkboxes functional
- ❌ Don't create separate JSON files
- ❌ Don't add routing
- ❌ Don't add multiple scenarios
- ❌ Don't add charts (just show numbers)
- ❌ Don't deploy to Vercel yet (do after if time permits)

## File to Create

**Just ONE file: `app/page.tsx`**

That's it. Everything hardcoded. Get it working, then polish if time permits.

---

## Absolute Minimum (30 min version)

If you're really pressed:

1. Header with incident info
2. Big diagnosis card with confidence
3. Cost comparison (2 cards)
4. 3 chat buttons with responses

**Skip**: Sensors, checklist, fancy styling

This still tells the complete story: "AI diagnoses fast → saves money"
