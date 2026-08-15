# NEXUS Developer Studio ⚡

> **High-Performance Developer Studio & Creative Engineering Platform**  
> Engineered with React 19, TypeScript, Tailwind CSS v4, Express, and Google Gemini 3.1 Flash-Lite.

---

## 🚀 One-Click GitHub & Cloud Deployment

This project comes pre-configured with **GitHub Actions workflows**, a **Dockerfile**, and full **Express + Vite** full-stack orchestration so it works out of the box when pushed to GitHub.

### Option 1: Direct Export to GitHub (from Google AI Studio)
1. In the upper-right corner of the Google AI Studio interface, click on the **Export** / **Settings** menu.
2. Select **Export to GitHub** (or **Download ZIP**).
3. Connect your GitHub account and choose a new repository name (e.g. `nexus-developer-studio`).
4. AI Studio will automatically push all source files, GitHub Actions workflows, and dependencies directly to your GitHub repository!

### Option 2: Automatic GitHub Pages Deployment
The repository includes `.github/workflows/deploy.yml`:
1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. Every push to the `main` branch will automatically build and publish your live website to `https://<your-username>.github.io/<repo-name>/`.

### Option 3: Containerized Deployment (Docker / Cloud Run / VPS)
Build and run the production image with Docker:

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build manually
docker build -t nexus-studio .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key_here nexus-studio
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js >= 20.0.0
- npm or bun

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/nexus-developer-studio.git
   cd nexus-developer-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API Key in `.env` (optional, fallback heuristic engine included):
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌟 Core Features

- **⚡ Context-Aware Gemini AI Assistant (`gemini-3.1-flash-lite`)**:
  - Real-time Server-Sent Events (SSE) streaming token output.
  - Multi-step discovery scoping, timeline estimators, and ticket generators.
  - Interactive systems engineering debugger and latency troubleshooting.

- **🐙 GitHub Integration & Open Source Hub**:
  - Live repository inspection pulling stars, forks, open issues, and topics.
  - Automated AI architecture, security, and modernization audits powered by Gemini Flash-Lite.
  - Curated studio open-source showcases with copyable clone commands.

- **💼 Core Engineering Services**:
  - **Web Development**: High-performance SPAs, microservices, and sub-50ms distributed platforms.
  - **Mobile App Development**: Fluid cross-platform iOS & Android apps with offline-first persistence.
  - **UI/UX Design Systems**: Mathematical typography, WCAG AAA accessibility, and interactive design tokens.

- **📬 Direct Channel & Contact Us**:
  - Dual-mode contact interface for rapid inquiries and comprehensive technical RFPs.

---

## 📦 Project Architecture

```text
├── .github/
│   └── workflows/
│       ├── ci.yml            # Automated lint & build verification on push
│       └── deploy.yml        # Automated GitHub Pages static deploy workflow
├── src/
│   ├── components/
│   │   ├── GeminiChatbot.tsx     # Low-latency streaming AI support assistant
│   │   ├── GitHubStudioHub.tsx   # Live repo inspector & AI architectural audit
│   │   ├── ServicesSection.tsx   # Web, mobile & UI/UX engineering services
│   │   ├── InquirySection.tsx    # Contact Us & technical RFP forms
│   │   ├── InteractiveWorkbench.tsx # AI scoper, cost estimator & code lab
│   │   ├── ProjectShowcase.tsx   # Featured architecture case studies
│   │   ├── TechRadar.tsx         # Studio technology stack & status
│   │   ├── Navbar.tsx            # Fluid navigation bar & mobile drawer
│   │   └── Footer.tsx            # Studio telemetry & footer
│   ├── data/
│   │   └── studioData.ts         # Case studies, services & benchmarks
│   ├── App.tsx                   # Core application layout & routing
│   ├── main.tsx                  # Entry point
│   ├── types.ts                  # Shared TypeScript interfaces
│   └── index.css                 # Global Tailwind CSS v4 styling
├── server.ts                     # Express backend proxy for Gemini & GitHub APIs
├── Dockerfile                    # Multi-stage production container
├── docker-compose.yml            # Docker Compose orchestration
├── package.json                  # Scripts and dependencies
└── tsconfig.json                 # TypeScript configuration
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.
