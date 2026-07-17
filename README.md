# 🏟️ FIFA SmartStadium AI Command Center

An AI-powered stadium operations platform that helps security teams detect, analyze, and respond to incidents in real time.

## 🚀 Features

- 🤖 AI-powered incident analysis
- 🚨 Live incident monitoring
- 📊 Analytics dashboard
- 🗺️ Stadium map visualization
- 📡 Real-time updates using Socket.IO
- 🗄️ PostgreSQL database with Prisma ORM
- ⚡ Modern Next.js frontend
- 🔐 Express + TypeScript backend

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- Tailwind CSS
- Recharts
- Socket.IO Client

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.IO
- OpenRouter AI

---

## Architecture

Frontend (Next.js)
        │
        ▼
Express API
        │
        ▼
AI Analysis Service
        │
        ▼
PostgreSQL Database

---

## AI Workflow

1. Incident is reported
2. AI analyzes severity and risk
3. Recommended actions are generated
4. Incident is stored in PostgreSQL
5. Dashboard updates in real time

---

## Dashboard

- Live Incidents
- KPI Cards
- AI Recommendations
- Stadium Map
- Crowd Density Analytics
- Incident Severity Charts

---

## Installation

### Clone

```bash
git clone <your-repository-url>
```

### Install

```bash
pnpm install
```

### Backend

```bash
cd apps/api
pnpm dev
```

### Frontend

```bash
cd apps/web
pnpm dev
```

---

## Environment Variables

Backend

```env
DATABASE_URL=
OPENROUTER_API_KEY=
JWT_SECRET=
```

Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Future Improvements

- CCTV video analytics
- AI crowd prediction
- Emergency evacuation routing
- Mobile command center
- Multi-stadium support

---

## Team

Built for the FIFA Smart Stadium Hackathon.

## Project Images.

<img width="1000" height="948" alt="Screenshot 2026-07-16 at 7 51 05 PM" src="https://github.com/user-attachments/assets/50930a21-b964-403c-896b-d67c16bc5721" />

<img width="1001" height="949" alt="Screenshot 2026-07-16 at 7 51 15 PM" src="https://github.com/user-attachments/assets/baa59b80-e077-44e0-9b28-cd167930b12b" />

<img width="878" height="1074" alt="Screenshot 2026-07-16 at 7 48 59 PM" src="https://github.com/user-attachments/assets/792e2bda-dae0-4854-a85c-917aac7638d0" />
