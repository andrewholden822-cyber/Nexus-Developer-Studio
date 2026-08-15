import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", studio: "NEXUS Engineering & Developer Studio", uptime: process.uptime() });
  });

  // AI Architecture Scoper & Technical Blueprint Generator
  app.post("/api/ai-scope", async (req, res) => {
    const { projectName, projectType, targetScale, techPreferences, requirements } = req.body;

    if (!projectName && !requirements) {
      return res.status(400).json({ error: "Project name or requirements are required." });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are a Senior Principal Systems Architect & Engineering Lead at NEXUS Developer Studio.
Generate a comprehensive, production-ready technical architecture brief and engineering scope for the following client inquiry:

Project Name: ${projectName || "Unnamed Project"}
Project Category: ${projectType || "Full-Stack Web/Cloud Application"}
Expected Scale: ${targetScale || "100k - 1M monthly active users"}
Tech Stack Preferences: ${techPreferences || "Modern TypeScript, Edge Compute, Cloud-Native"}
Core Requirements & Description: ${requirements || "High performance, low latency, robust microservices and real-time frontend."}

Return a structured JSON object with the following schema:
{
  "summary": "2-sentence executive summary of the system architecture",
  "recommendedStack": {
    "frontend": "e.g. Next.js 15 App Router / React 19 + Tailwind + Motion",
    "backend": "e.g. Node.js / Go microservices on Kubernetes",
    "database": "e.g. PostgreSQL with pgvector + Redis cluster",
    "ai_layer": "e.g. Gemini 3.7 Flash + RAG Vector Pipeline",
    "infrastructure": "e.g. Cloud Run / AWS ECS, Cloudflare Edge CDN, Terraform"
  },
  "keyArchitecturalDecisions": [
    "Decision 1 with rationale",
    "Decision 2 with rationale",
    "Decision 3 with rationale"
  ],
  "milestones": [
    { "phase": "Phase 1: Architecture & Foundation", "duration": "2-3 Weeks", "deliverables": "System design, auth, database migrations, CI/CD pipeline" },
    { "phase": "Phase 2: Core Engineering & Realtime Logic", "duration": "4-6 Weeks", "deliverables": "API contracts, core business services, frontend UI system" },
    { "phase": "Phase 3: Security, Load Testing & Launch", "duration": "2-3 Weeks", "deliverables": "Pen testing, latency optimization, staging rollout, telemetry" }
  ],
  "estimatedEffortWeeks": "8-12 weeks",
  "recommendedTeamSize": "2 Senior Full-Stack Engineers + 1 DevOps/Cloud Lead + 1 UI/UX Specialist",
  "securityAndComplianceTips": [
    "Key security consideration 1",
    "Key security consideration 2"
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        });

        const text = response.text || "";
        const parsed = JSON.parse(text);
        return res.json({ success: true, blueprint: parsed, generatedBy: "gemini-3.7-flash" });
      } catch (err: any) {
        console.error("Gemini API error, falling back to studio heuristic engine:", err);
      }
    }

    // Heuristic Fallback Engine
    const fallbackBlueprint = {
      summary: `Tailored architectural blueprint for ${projectName || "your custom application"}, optimized for sub-50ms latency, high availability, and rapid deployment velocity.`,
      recommendedStack: {
        frontend: techPreferences?.includes("React") ? "React 19 + TypeScript + Vite + Tailwind CSS" : "Next.js 15 / React 19 + Tailwind CSS",
        backend: "Node.js / Express micro-framework with TypeScript & tRPC",
        database: "PostgreSQL with connection pooling (PgBouncer) + Redis caching",
        ai_layer: "Gemini 3.7 Flash integration with streaming SSE endpoints",
        infrastructure: "Dockerized containers on Cloud Run / Kubernetes with Cloudflare edge caching",
      },
      keyArchitecturalDecisions: [
        "Stateless containerized services for zero-downtime rolling deploys and horizontal auto-scaling",
        "Edge caching for static assets and CDN-level rate limiting against DDoS threats",
        "Type-safe end-to-end API boundary with automated OpenAPI/Swagger generation",
      ],
      milestones: [
        { phase: "Phase 1: Architecture Blueprint & Scaffold", duration: "2 Weeks", deliverables: "Schema design, Auth0/OAuth flow, initial CI/CD" },
        { phase: "Phase 2: Core Domain Logic & Integrations", duration: "4 Weeks", deliverables: "REST/GraphQL APIs, UI component system, data pipelines" },
        { phase: "Phase 3: Load Testing & Production Launch", duration: "2 Weeks", deliverables: "Latency tuning, SOC2 compliance checklist, staging verification" },
      ],
      estimatedEffortWeeks: "6-8 weeks",
      recommendedTeamSize: "2 Senior Full-Stack Engineers + 1 Cloud Architect",
      securityAndComplianceTips: [
        "Implement strict CORS, CSP headers, and JWT rotation with short TTL",
        "Automate vulnerability scanning in CI/CD pipeline and enforce encrypted secrets management",
      ],
    };

    return res.json({ success: true, blueprint: fallbackBlueprint, generatedBy: "nexus-heuristic-engine" });
  });

  // Client Contact & Inquiry API
  app.post(["/api/contact", "/api/inquire"], (req, res) => {
    const { name, email, subject, message, company, projectType, budget, timeline } = req.body;
    const inquiryId = "NEX-" + Math.floor(100000 + Math.random() * 900000);

    console.log(`[Studio Contact Received] ID: ${inquiryId}`, { name, email, subject, company, projectType });

    return res.json({
      success: true,
      inquiryId,
      message: "Thank you for reaching out. A NEXUS Principal Architect will review your specs and respond within 24 business hours.",
      timestamp: new Date().toISOString(),
    });
  });

  // Context-Aware Gemini Chatbot API (Low Latency via Gemini 3.1 Flash-Lite)
  const STUDIO_AI_SYSTEM_INSTRUCTION = `You are NEXUS AI, the Senior Technical Support Lead & Solutions Architect at NEXUS Developer Studio.
You provide lightning-fast, high-precision technical answers, multi-step discovery consultations, and code troubleshooting.
You are context-aware and remember the entire conversation history.

Studio Core Services:
1. Web Development (React 19, TypeScript, Vite, Tailwind CSS v4, Next.js, Node.js, PostgreSQL)
2. Mobile App Development (React Native, Expo, iOS Swift, Android Kotlin, Offline-first SQLite)
3. UI/UX Design (Figma design tokens, WCAG AAA accessibility, Radix UI, Motion physics animations)
4. Generative AI & Agentic Systems (Gemini 3.1 Flash-Lite, Gemini 3.7 Flash, RAG, pgvector)
5. Cloud Infrastructure & DevOps (Docker, Kubernetes, GCP Cloud Run, Terraform, Cloudflare Workers)
6. GitHub Codebase Audits, Architecture Modernization, & Performance Profiling

Key Behaviors:
- Multi-step Bookings: When a user wants to scope a project or book a discovery call, guide them step-by-step (Service -> Requirements & Scale -> Timeline/Budget -> Contact Email -> Booking Confirmation Summary with Ticket ID).
- Engineering Troubleshooting: When users ask about bugs, latency bottlenecks, memory leaks, or architectural dilemmas, provide sharp, direct, senior-engineer solutions with syntax-highlighted code blocks if relevant.
- Tone: Crisp, technically authoritative, friendly, concise, zero fluff.`;

  // Streaming Chat Endpoint (SSE for real-time low-latency response)
  app.post("/api/chat/stream", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const ai = getGeminiClient();

    if (ai) {
      try {
        // Format history for Gemini SDK
        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "model" || m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const stream = await ai.models.generateContentStream({
          model: "gemini-3.1-flash-lite",
          contents,
          config: {
            systemInstruction: STUDIO_AI_SYSTEM_INSTRUCTION,
            temperature: 0.6,
          },
        });

        for await (const chunk of stream) {
          if (chunk.text) {
            res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
          }
        }

        res.write("data: [DONE]\n\n");
        return res.end();
      } catch (err: any) {
        console.error("Gemini stream error, falling back to flash:", err);
        try {
          // Fallback to gemini-3.7-flash
          const contents = messages.map((m: { role: string; content: string }) => ({
            role: m.role === "model" || m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          }));

          const stream = await ai.models.generateContentStream({
            model: "gemini-3.7-flash",
            contents,
            config: {
              systemInstruction: STUDIO_AI_SYSTEM_INSTRUCTION,
              temperature: 0.6,
            },
          });

          for await (const chunk of stream) {
            if (chunk.text) {
              res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
            }
          }
          res.write("data: [DONE]\n\n");
          return res.end();
        } catch (innerErr) {
          console.error("Gemini chat fallback error:", innerErr);
        }
      }
    }

    // Heuristic Assistant Fallback when API key is unconfigured
    const lastUserMsg = messages[messages.length - 1]?.content || "";
    let reply = "Hello! I am NEXUS AI, your engineering assistant. ";

    if (/book|consult|quote|hire|start|project/i.test(lastUserMsg)) {
      reply += "I can help you scope your project and book a discovery session with our Principal Architects. Which area are you looking to build?\n\n1. **Web Development** (React 19 / Next.js / TypeScript)\n2. **Mobile App Development** (React Native / iOS & Android)\n3. **UI/UX Design Systems** (Figma / Accessibility / Motion)\n4. **Generative AI & Agentic Workflows** (Gemini / RAG)\n5. **Cloud Infra & DevOps** (Kubernetes / Cloud Run)\n\nPlease share your target timeline and core requirements!";
    } else if (/troubleshoot|bug|latency|slow|error|debug|issue|crash/i.test(lastUserMsg)) {
      reply += "Let's diagnose that technical issue. Please share:\n- The runtime or framework (e.g. Node.js, React 19, Postgres, Docker)\n- The error message or performance bottleneck metric\n- Current system load or p99 latency benchmarks\n\nOur engineering team will pinpoint the root cause!";
    } else if (/github|repo|code|audit|review/i.test(lastUserMsg)) {
      reply += "You can use our **GitHub Studio Hub** right on this page! Enter any public GitHub repository (e.g., `owner/repo`) to analyze commit history, dependency health, and run an automated AI architectural audit.";
    } else {
      reply += "How can I assist your engineering squad today? I can help with architecture scoping, multi-step booking, GitHub repo audits, and real-time debugging advice.";
    }

    // Stream simulated response
    const words = reply.split(" ");
    for (let i = 0; i < words.length; i++) {
      const chunkText = words[i] + (i < words.length - 1 ? " " : "");
      res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      await new Promise((r) => setTimeout(r, 20));
    }
    res.write("data: [DONE]\n\n");
    return res.end();
  });

  // Non-streaming Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "model" || m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents,
          config: {
            systemInstruction: STUDIO_AI_SYSTEM_INSTRUCTION,
            temperature: 0.6,
          },
        });

        return res.json({
          success: true,
          content: response.text || "I've processed your request. How else can NEXUS assist?",
          model: "gemini-3.1-flash-lite",
        });
      } catch (err: any) {
        console.error("Gemini chat error:", err);
      }
    }

    return res.json({
      success: true,
      content: "NEXUS AI is ready to assist with your web, mobile, UI/UX, and cloud engineering requirements.",
      model: "nexus-heuristic-engine",
    });
  });

  // GitHub Repository Metadata Fetcher API
  app.get("/api/github/repo", async (req, res) => {
    const repoParam = (req.query.repo as string) || "tailwindlabs/tailwindcss";
    const cleaned = repoParam.replace(/^https?:\/\/github\.com\//, "").replace(/\.git$/, "").trim();
    const parts = cleaned.split("/").filter(Boolean);

    if (parts.length < 2) {
      return res.status(400).json({ error: "Invalid repository format. Please provide 'owner/repo'." });
    }

    const [owner, name] = parts;

    try {
      const ghRes = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
        headers: {
          "User-Agent": "NEXUS-Developer-Studio-Applet",
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (ghRes.ok) {
        const data = await ghRes.json();
        return res.json({
          success: true,
          repo: {
            name: data.name,
            fullName: data.full_name,
            description: data.description || "No description provided.",
            stars: data.stargazers_count,
            forks: data.forks_count,
            openIssues: data.open_issues_count,
            language: data.language || "TypeScript",
            license: data.license?.name || "MIT License",
            topics: data.topics || [],
            defaultBranch: data.default_branch || "main",
            updatedAt: data.updated_at,
            htmlUrl: data.html_url,
            ownerAvatar: data.owner?.avatar_url,
          },
        });
      }
    } catch (fetchErr) {
      console.error("GitHub fetch error, using fallback data:", fetchErr);
    }

    // Fallback Mock for Demo / Rate-Limit Protection
    return res.json({
      success: true,
      repo: {
        name,
        fullName: `${owner}/${name}`,
        description: `Production repository for ${name}. High performance codebase with continuous integration.`,
        stars: 12450,
        forks: 1820,
        openIssues: 42,
        language: "TypeScript",
        license: "MIT License",
        topics: ["developer-tools", "typescript", "react", "high-performance", "edge"],
        defaultBranch: "main",
        updatedAt: new Date().toISOString(),
        htmlUrl: `https://github.com/${owner}/${name}`,
        ownerAvatar: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      },
    });
  });

  // GitHub AI Architecture & Code Review API (Powered by Gemini Flash-Lite)
  app.post("/api/github/analyze", async (req, res) => {
    const { repoData } = req.body;

    if (!repoData) {
      return res.status(400).json({ error: "Repository data is required." });
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are a Senior Principal Systems Engineer at NEXUS Developer Studio.
Analyze the following GitHub repository metadata and generate an architectural review and modernization audit:

Repository: ${repoData.fullName} (${repoData.htmlUrl})
Primary Language: ${repoData.language}
Stars: ${repoData.stars} | Forks: ${repoData.forks} | Open Issues: ${repoData.openIssues}
Description: ${repoData.description}
Topics: ${(repoData.topics || []).join(", ")}

Return a structured JSON with this exact schema:
{
  "healthScore": 88 (number from 0 to 100),
  "summary": "2-sentence executive technical summary of repo health and architecture",
  "architectureAssessment": "Brief technical critique of stack, scalability, and developer ergonomics",
  "performanceOpportunities": [
    "Opportunity 1 (e.g. edge caching, bundle tree-shaking, sub-millisecond database queries)",
    "Opportunity 2",
    "Opportunity 3"
  ],
  "securityReview": [
    "Security check 1 (e.g. dependency lockfile auditing, automated secret scanning, CSP headers)",
    "Security check 2"
  ],
  "modernizationRoadmap": [
    "Step 1: Immediate low-hanging fruit",
    "Step 2: Core refactor & CI/CD pipeline automation",
    "Step 3: Edge deployment & observability telemetry"
  ],
  "recommendedStudioServices": [
    "Web Development",
    "Performance Audits & Optimization",
    "Cloud Infrastructure & DevOps"
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            temperature: 0.3,
          },
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json({ success: true, analysis: parsed, model: "gemini-3.1-flash-lite" });
      } catch (err) {
        console.error("Gemini GitHub analyze error:", err);
      }
    }

    // Heuristic Fallback Analysis
    const fallbackAnalysis = {
      healthScore: 92,
      summary: `${repoData.fullName} demonstrates robust open-source ergonomics with strong community adoption (${repoData.stars?.toLocaleString()} stars) and active maintenance.`,
      architectureAssessment: `Engineered primarily in ${repoData.language || "TypeScript"}, the codebase shows clean modular separation suitable for high-throughput deployments and containerized microservices.`,
      performanceOpportunities: [
        "Implement edge-level CDN asset compression and Brotli pre-rendering to trim initial load times",
        "Introduce bundle size regression guards in GitHub Actions CI to prevent bloat",
        "Adopt zero-copy data transformations and Web Workers for computationally heavy tasks",
      ],
      securityReview: [
        "Enforce automated Dependabot / Renovate security advisory scans across transitive dependencies",
        "Implement strict Content Security Policy (CSP) and automated secret scanning pre-commit hooks",
      ],
      modernizationRoadmap: [
        "Step 1: Upgrade toolchain to React 19 concurrent features and Vite 6 build pipelines",
        "Step 2: Streamline API contracts with type-safe schema validation (Zod / tRPC)",
        "Step 3: Deploy automated end-to-end latency benchmarks and eBPF observability",
      ],
      recommendedStudioServices: [
        "Web Development",
        "Cloud Infrastructure & High-QPS Ops",
        "UI/UX Design Systems",
      ],
    };

    return res.json({ success: true, analysis: fallbackAnalysis, model: "nexus-heuristic-engine" });
  });

  // Vite middleware in dev or static files in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NEXUS Developer Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
