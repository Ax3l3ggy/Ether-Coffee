# Ether-Eye: AI-Powered Industrial Diagnostics Demo

A Next.js demo application showcasing AI-powered Line-Stop incident diagnosis for industrial aseptic filling operations.

## Overview

Ether-Eye transforms industrial Line-Stop recovery from hours of manual investigation to minutes of intelligent root cause analysis, saving $210K per incident.

**Demo**: Interactive dashboard showing AI diagnosis, sensor analysis, cost comparison, and guided recovery protocols.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Features

### Dashboard (`/dashboard`)
- **3-second AI analysis animation** - Simulates processing 55,000 sensors
- **Live metrics** - Real-time elapsed time and cost accumulation
- **Root cause diagnosis** - 94% confidence AI recommendation
- **Sensor monitoring** - Color-coded status (critical/warning/normal)
- **Cost comparison** - Traditional (6hrs, $250K) vs Ether-Eye (45min, $40K)
- **AI chat assistant** - 3 pre-scripted technical queries with instant responses
- **Interactive checklist** - 4-step recovery protocol with functional checkboxes
- **Approval workflow** - Smart button enables when all safety checks complete
- **Success modal** - Shows $210K savings and recovery metrics

### Demo Flow (2 minutes)
1. Page loads → 3-second analyzing animation
2. Dashboard appears with diagnosis and live counters
3. Click chat questions to show AI assistant
4. Check off all 4 recovery steps
5. Click "APPROVE RECOVERY PLAN"
6. Success modal shows savings summary

## Tech Stack

- **Framework**: Next.js 15 (Pages Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **State**: React hooks (useState, useEffect)
- **Deployment**: Vercel-ready

## Project Structure

```
pages/
├── index.tsx          # Landing page with link to dashboard
├── dashboard.tsx      # Main incident dashboard (all features)
└── _app.tsx          # App wrapper with dark theme

components/
├── header.tsx        # App header
└── sidebar.tsx       # Navigation sidebar

PRD.md                # Full product requirements
MVP-1-HOUR.md         # 1-hour build specification
```

## Key Metrics (Demo Data)

- **Diagnosis Time**: Seconds vs 2-4 hours (traditional)
- **Recovery Time**: 45 minutes vs 6 hours
- **Cost Savings**: $210,000 per incident
- **Product Saved**: 42,000 gallons
- **AI Confidence**: 94%

## Environment

- Node.js 18+
- npm or yarn
- Port 3001 (3000 fallback)

## Deploy to Vercel

```bash
git push origin main
```

Connect repo to Vercel and deploy automatically.

---

**Built with**: Next.js, Tailwind, shadcn/ui
**Demo Purpose**: VC/investor presentation, technical validation
