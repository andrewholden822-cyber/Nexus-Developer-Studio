import { Project, Service, TechItem, TeamMember, Testimonial } from '../types';

export const STUDIO_STATS = [
  { label: 'Uptime SLA Delivered', value: '99.99%', change: 'Across 38+ live systems' },
  { label: 'Avg API Response', value: '28ms', change: 'Global edge routing' },
  { label: 'Production Deploys', value: '1,400+', change: 'Zero-downtime standard' },
  { label: 'Client Venture Capital', value: '$85M+', change: 'Raised by studio partners' },
];

export const PROJECTS: Project[] = [
  {
    id: 'hyperscale-cloud',
    title: 'HyperScale Engine',
    client: 'Strata Cloud Systems',
    category: 'Cloud & Infra',
    tagline: 'Distributed multi-region container orchestrator & edge routing mesh',
    description: 'Engineered an ultra-low latency workload deployment mesh capable of spinning up micro-VM containers across 24 global regions in under 80 milliseconds with automated traffic re-balancing.',
    metrics: [
      { label: 'Deployment Time', value: '78ms', detail: 'Down from 4.2 minutes' },
      { label: 'Throughput', value: '450k QPS', detail: 'Sustained peak traffic' },
      { label: 'Infra Cost Savings', value: '42%', detail: 'Via smart spot-instance autoscaling' },
    ],
    techStack: ['Go', 'Rust', 'Kubernetes', 'eBPF', 'TypeScript', 'Tailwind', 'gRPC'],
    year: '2025',
    status: 'Featured',
    featured: true,
    architecture: {
      overview: 'Micro-kernel control plane communicating with lightweight edge daemons over mutual TLS gRPC connections.',
      flow: [
        'Client pushes deployment manifest via CLI or Studio Web Dashboard',
        'Global Control Plane synthesizes container layer diff and checks region capacity',
        'eBPF kernel probes monitor real-time packet drops and routing efficiency',
        'Traffic smoothly cut over via zero-drop BGP routing updates',
      ],
      challenges: [
        'Preventing split-brain scenarios during oceanic trans-pacific cable fiber cuts',
        'Handling microbursts of 1M+ simultaneous Webhook triggers',
      ],
      solutions: [
        'Raft consensus clustered in tri-region quorum with fallback read-replicas',
        'Distributed ring buffer backed by memory-mapped files and DPDK drivers',
      ],
    },
  },
  {
    id: 'aura-ai-synthesis',
    title: 'Aura Neural Canvas',
    client: 'Synthetix Media',
    category: 'AI Systems',
    tagline: 'Real-time multi-modal generative studio & audio-visual synthesis pipeline',
    description: 'Designed and deployed an interactive generative AI canvas integrating Gemini 3.7 multimodal models, vector embeddings, and real-time streaming audio generation for creative studios.',
    metrics: [
      { label: 'Generation Latency', value: '1.2s', detail: 'Streaming token initiation in <140ms' },
      { label: 'Active Creators', value: '120,000+', detail: 'Monthly active studio users' },
      { label: 'Vector Index', value: '40M Items', detail: 'Sub-15ms HNSW similarity search' },
    ],
    techStack: ['TypeScript', 'React 19', 'Python', 'Gemini API', 'pgvector', 'FastAPI', 'WebAudio API'],
    year: '2025',
    status: 'Featured',
    featured: true,
    architecture: {
      overview: 'Hybrid serverless SSE stream pipeline feeding a WebGL 60fps canvas renderer with client-side audio DSP.',
      flow: [
        'User initiates multi-prompt or image input on canvas workspace',
        'Edge middleware constructs conversational context and performs RAG lookup',
        'Gemini 3.7 Flash streams token chunks via HTTP/2 server-sent events',
        'Client transforms tokens into live generative node visualizers in real-time',
      ],
      challenges: [
        'Maintaining 60 FPS UI rendering while streaming gigabytes of binary audio/vector arrays',
        'Minimizing token usage through intelligent cache layer',
      ],
      solutions: [
        'WebWorker-isolated thread for audio decoding and canvas mathematical transforms',
        'Semantic caching layer in Redis reducing duplicate generation costs by 38%',
      ],
    },
  },
  {
    id: 'chronos-fintech',
    title: 'Chronos Distributed Ledger',
    client: 'Apex Capital Partners',
    category: 'FinTech',
    tagline: 'Sub-millisecond institutional matching engine & audit log ledger',
    description: 'Built a deterministic financial transaction ledger and liquidity analytics dashboard handling $2.4B in daily volume with cryptographic audit trails and zero data loss guarantee.',
    metrics: [
      { label: 'Matching Latency', value: '0.4ms', detail: '99.9th percentile execution speed' },
      { label: 'Daily Volume', value: '$2.4B+', detail: 'Zero reconciliation discrepancies' },
      { label: 'Compliance Audit', value: '100%', detail: 'Automated SOC2 Type II compliance' },
    ],
    techStack: ['Rust', 'PostgreSQL', 'TypeScript', 'WebSockets', 'Apache Kafka', 'Docker'],
    year: '2024',
    status: 'Production',
    featured: true,
    architecture: {
      overview: 'Single-writer memory engine paired with asynchronous event sourcing and distributed replication.',
      flow: [
        'Inbound FIX & REST orders ingested into memory buffer via TLS 1.3',
        'Order matching engine matches bid/ask pairs in deterministic order',
        'State delta emitted to Kafka log topic for multi-region ledger replication',
        'WebSocket feeder pushes live market book depth to high-density React UI',
      ],
      challenges: [
        'Eliminating garbage collection pauses in execution path',
        'Ensuring exact-once transactional semantics across distributed nodes',
      ],
      solutions: [
        'Zero-allocation memory pools in Rust with pinned thread affinities',
        'Two-phase commit coordinator with append-only WAL on NVMe storage',
      ],
    },
  },
  {
    id: 'veloce-design-system',
    title: 'Veloce Design System & Workbench',
    client: 'Global SaaS Enterprise',
    category: 'Web Platforms',
    tagline: 'Unified multi-brand headless design system & interactive component compiler',
    description: 'Created a next-generation design engineering system used by 180+ developers across 14 product teams, featuring automated token generation, Figma synchronization, and strict WCAG AAA compliance.',
    metrics: [
      { label: 'Dev Velocity', value: '+340%', detail: 'Component assembly turnaround' },
      { label: 'Accessibility', value: 'WCAG AAA', detail: '100% automated test coverage' },
      { label: 'Bundle Impact', value: '14.2kb', detail: 'Tree-shaken core library' },
    ],
    techStack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Storybook', 'Vite'],
    year: '2024',
    status: 'Production',
    featured: false,
    architecture: {
      overview: 'Headless atomic architecture with typed design token compiler generating CSS vars, JSON schema, and framework adapters.',
      flow: [
        'Designers update variables in Figma Design Tokens plugin',
        'GitHub Action triggers token compiler and runs visual regression suite',
        'NPM package distributed to micro-frontends with zero runtime overhead',
      ],
      challenges: ['Supporting dark/light/high-contrast modes without CSS specificity conflicts'],
      solutions: ['Strict CSS custom property namespaces with scoped attribute selectors'],
    },
  },
  {
    id: 'neuro-synth-mobile',
    title: 'Kinesis Motion Engine',
    client: 'Voxel Dynamics',
    category: 'Creative Dev',
    tagline: 'Interactive 3D gesture & physics simulation canvas for creative tools',
    description: 'High-performance WebGL & Canvas physics studio enabling fluid visual interactions, particle simulations, and real-time audio reactivity at a locked 60 frames per second.',
    metrics: [
      { label: 'Frame Consistency', value: '60 FPS', detail: 'Even under 50,000 particle loads' },
      { label: 'Load Size', value: '48kb', detail: 'Zero external bloated dependencies' },
      { label: 'Mobile Battery Impact', value: '-65%', detail: 'Optimized GPU compute shaders' },
    ],
    techStack: ['WebGL', 'GLSL Shaders', 'TypeScript', 'Web Workers', 'Canvas API'],
    year: '2024',
    status: 'Open Source',
    featured: false,
    architecture: {
      overview: 'OffscreenCanvas pipeline computing particle physics on GPU shaders with dynamic LOD.',
      flow: [
        'Touch and cursor coordinates interpolated with spring physics',
        'Vertex buffer objects updated via compute pipeline',
        'Render output composited smoothly to screen',
      ],
      challenges: ['Maintaining locked 60fps on low-tier mobile hardware'],
      solutions: ['Adaptive resolution scaling and frustum culling on particle buffers'],
    },
  },
];

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    tagline: 'Modern, high-performance web applications and scalable platforms',
    description: 'We build fast, resilient, and accessible full-stack web applications tailored to your business needs. From single-page applications and customer portals to complex enterprise systems, our web engineering standard delivers sub-50ms latency, high availability, and responsive layouts across all devices.',
    iconName: 'Layers',
    deliverables: [
      'Single-Page Applications (SPA) & Server-Side Rendered (SSR) Platforms',
      'API Architecture & Headless Microservice Integrations',
      'Progressive Web Apps (PWA) with Offline Persistence',
      'Secure Auth, Database Migrations & Automated CI/CD Pipelines'
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Next.js', 'PostgreSQL'],
    badge: 'Core Service',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    tagline: 'Cross-platform and native iOS & Android applications with 60fps fluidity',
    description: 'We design and engineer high-performance mobile applications that deliver native speed, tactile feedback, and intuitive gestures. Utilizing modern cross-platform frameworks, we deliver unified codebases for iOS and Android without sacrificing hardware capabilities, push notifications, or battery efficiency.',
    iconName: 'Smartphone',
    deliverables: [
      'Cross-Platform iOS & Android App Development',
      'Native Device Hardware Integration (Biometrics, Camera, Bluetooth, GPS)',
      'Real-Time State Sync & Offline-First Data Storage',
      'App Store & Google Play Submission, Testing & Telemetry'
    ],
    technologies: ['React Native', 'TypeScript', 'Expo', 'Swift', 'Kotlin', 'SQLite / WatermelonDB'],
    badge: 'High Demand',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Precision product design, component systems, and intuitive user journeys',
    description: 'We craft human-centric, aesthetically elevated digital interfaces rooted in mathematical grid systems and behavioral psychology. From wireframing and clickable high-fidelity prototypes to complete Figma design systems and WCAG AAA accessibility audits, we ensure every interaction feels deliberate.',
    iconName: 'Sparkles',
    deliverables: [
      'Interactive Figma Prototypes & Wireframe User Flows',
      'Design Token Systems & Headless Component Libraries',
      'WCAG 2.1 AAA Accessibility Audits & Typography Hierarchy',
      'Micro-Interactions, 60fps Motion Design & Brand Guidelines'
    ],
    technologies: ['Figma', 'Design Tokens', 'Tailwind CSS', 'Motion', 'Storybook', 'Radix UI'],
    badge: 'Design Standard',
  },
  {
    id: 'ai-systems',
    title: 'Generative AI & Agentic Systems',
    tagline: 'Production-grade LLM integrations with real-world business value',
    description: 'Bridge cutting-edge AI models into stable enterprise pipelines. We implement RAG systems, autonomous multi-step agents, vector search indexes, and intelligent workflow automations.',
    iconName: 'Cpu',
    deliverables: ['Custom RAG vector search pipelines', 'Multi-agent orchestration & tool calling', 'Fine-tuning & model evaluation suites', 'Streaming AI user interfaces with zero flicker'],
    technologies: ['Gemini 3.1 Flash-Lite', 'Python', 'pgvector', 'Pinecone', 'LangGraph', 'Docker'],
    badge: 'AI Native',
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & High-QPS Ops',
    tagline: 'Scalable, secure, containerized architectures on modern clouds',
    description: 'We eliminate infrastructure bottlenecks. From Kubernetes clusters and automated CI/CD pipelines to edge CDN routing and automated security audits.',
    iconName: 'Server',
    deliverables: ['Kubernetes & Cloud Run deployment pipelines', 'Terraform Infrastructure as Code (IaC)', 'Zero-trust auth & SOC2 readiness', 'Automated load testing & latency profiling'],
    technologies: ['Kubernetes', 'GCP', 'AWS', 'Docker', 'Terraform', 'Cloudflare Workers'],
    badge: 'Enterprise Grade',
  },
];

export const TECH_RADAR: TechItem[] = [
  { name: 'TypeScript', category: 'Frontend', ring: 'Core', description: 'Strict end-to-end typing for zero-runtime bug confidence', useCase: 'Universal standard across all studio projects' },
  { name: 'React 19', category: 'Frontend', ring: 'Core', description: 'Concurrent rendering and modern server component architecture', useCase: 'High-density web apps and interactive dashboards' },
  { name: 'Tailwind CSS v4', category: 'Frontend', ring: 'Core', description: 'Lightning-fast utility styling engine without bloat', useCase: 'Modern bespoke UI systems and responsive layouts' },
  { name: 'Motion (Framer)', category: 'Frontend', ring: 'Core', description: 'Declarative physics-based animation library', useCase: 'Micro-interactions and fluid screen transitions' },
  
  { name: 'Go (Golang)', category: 'Backend & DB', ring: 'Core', description: 'Ultra-low overhead microservices with lightweight concurrency', useCase: 'High-throughput API gateways and background workers' },
  { name: 'Rust', category: 'Backend & DB', ring: 'Adopt', description: 'Memory-safe systems programming for deterministic compute', useCase: 'Financial ledgers, audio engines, and WebAssembly modules' },
  { name: 'PostgreSQL & pgvector', category: 'Backend & DB', ring: 'Core', description: 'The gold standard relational DB with AI vector search', useCase: 'Primary data storage and semantic retrieval' },
  { name: 'Redis / Valkey', category: 'Backend & DB', ring: 'Core', description: 'In-memory data grid and pub/sub message broker', useCase: 'Session cache, rate limiting, and real-time state' },
  
  { name: 'Gemini 3.7 Flash', category: 'AI & ML', ring: 'Core', description: 'Blazing-fast multimodal intelligence and function calling', useCase: 'Production AI workflows and reasoning tasks' },
  { name: 'pgvector / HNSW', category: 'AI & ML', ring: 'Core', description: 'Hierarchical Navigable Small World vector search in Postgres', useCase: 'Enterprise RAG without spinning up extra SaaS silos' },
  { name: 'LangGraph / Agents', category: 'AI & ML', ring: 'Adopt', description: 'Stateful, cyclic multi-agent workflow orchestration', useCase: 'Autonomous business logic & code assistants' },
  
  { name: 'Docker & Kubernetes', category: 'DevOps & Cloud', ring: 'Core', description: 'Reproducible containerization and elastic scaling', useCase: 'Cloud-native zero-downtime deployment pipelines' },
  { name: 'Cloudflare Workers & Edge', category: 'DevOps & Cloud', ring: 'Core', description: 'Sub-10ms compute at the global network perimeter', useCase: 'Edge authentication, geo-routing, and smart caching' },
  { name: 'Terraform / OpenTofu', category: 'DevOps & Cloud', ring: 'Core', description: 'Declarative infrastructure as code', useCase: 'Reproducible multi-cloud provisioning' },
  
  { name: 'eBPF / Telemetry', category: 'Security', ring: 'Adopt', description: 'Kernel-level performance monitoring and security sandbox', useCase: 'Deep observability and zero-overhead packet filtering' },
  { name: 'OAuth 2.1 & WebAuthn', category: 'Security', ring: 'Core', description: 'Passkey-ready passwordless authentication standards', useCase: 'Enterprise-grade user identity systems' },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Julian Vance',
    role: 'Principal Systems Architect',
    specialty: 'Distributed Systems & Go/Rust',
    bio: 'Former Distributed Systems Lead at ScaleTech. Built infra handling 100M+ daily events. Obsessed with sub-millisecond p99 latency.',
    avatarText: 'JV',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'Active on 2 Projects',
  },
  {
    name: 'Elena Rostova',
    role: 'Head of Creative Engineering',
    specialty: 'WebGL, React 19 & Design Systems',
    bio: 'Passionate about typography, physics animations, and WCAG AAA accessibility. Author of several popular open-source UI libraries.',
    avatarText: 'ER',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'Leading Design Ops',
  },
  {
    name: 'Marcus Chen',
    role: 'Lead AI & Data Engineer',
    specialty: 'LLM Pipelines & Vector Architecture',
    bio: 'Specializes in low-latency RAG pipelines, streaming agent workflows, and fine-tuning. Co-authored papers on semantic graph search.',
    avatarText: 'MC',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'R&D Sprint',
  },
  {
    name: 'Sora Tanaka',
    role: 'Cloud Ops & Security Lead',
    specialty: 'Kubernetes, eBPF & Zero-Trust',
    bio: 'Kubernetes certified administrator. Specializes in multi-cloud cost reduction, automated security scanners, and SOC2 compliance.',
    avatarText: 'ST',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    status: 'On-Call Lead',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'NEXUS didn’t just write code for us — they re-architected our core deployment engine from scratch. Our deployment speed increased 10x while saving over $40k/month on cloud bills.',
    author: 'David Sterling',
    role: 'VP of Engineering',
    company: 'Strata Cloud Systems',
    avatarText: 'DS',
    projectRef: 'HyperScale Engine',
  },
  {
    quote: 'Finding engineers who truly understand high-throughput financial systems AND modern, fluid React frontends is almost impossible. NEXUS delivered ahead of schedule with zero flaws.',
    author: 'Sarah Lin, CFA',
    role: 'CTO & Co-Founder',
    company: 'Apex Capital Partners',
    avatarText: 'SL',
    projectRef: 'Chronos Distributed Ledger',
  },
  {
    quote: 'The generative canvas they engineered for us handles 100k+ active creators seamlessly. Their deep mastery of streaming AI APIs and Web Workers sets them apart from every other studio.',
    author: 'Alexandre Meyer',
    role: 'Chief Product Officer',
    company: 'Synthetix Media',
    avatarText: 'AM',
    projectRef: 'Aura Neural Canvas',
  },
];

export const SAMPLE_CODE_SNIPPETS = [
  {
    id: 'edge-stream',
    title: 'Edge Streaming Pipeline (TypeScript + SSE)',
    language: 'typescript',
    description: 'Zero-buffering server-sent event token pipeline with automatic client reconnection and backpressure management.',
    code: `import { GoogleGenAI } from '@google/genai';
import { Request, Response } from 'express';

export async function handleStreamRoute(req: Request, res: Response) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no', // Disable Nginx proxy buffering
  });

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const stream = await ai.models.generateContentStream({
    model: 'gemini-3.7-flash',
    contents: req.body.prompt,
    config: { temperature: 0.2 },
  });

  for await (const chunk of stream) {
    if (chunk.text) {
      res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
    }
  }
  res.write('data: [DONE]\\n\\n');
  res.end();
}`,
  },
  {
    id: 'rust-concurrency',
    title: 'Lock-Free Ring Buffer (Rust)',
    language: 'rust',
    description: 'High-throughput lock-free circular queue supporting millions of packets per second with cache-line alignment.',
    code: `#[repr(align(64))]
pub struct RingBuffer<T> {
    buffer: Vec<Option<T>>,
    head: AtomicUsize,
    tail: AtomicUsize,
    capacity: usize,
}

impl<T> RingBuffer<T> {
    pub fn push(&self, item: T) -> Result<(), &'static str> {
        let current_tail = self.tail.load(Ordering::Acquire);
        let next_tail = (current_tail + 1) % self.capacity;
        
        if next_tail == self.head.load(Ordering::Acquire) {
            return Err("Buffer Full: Backpressure Activated");
        }
        
        // Safety: Pointers are isolated per consumer/producer thread
        unsafe { self.write_at(current_tail, item) };
        self.tail.store(next_tail, Ordering::Release);
        Ok(())
    }
}`,
  },
  {
    id: 'vector-rag',
    title: 'PostgreSQL HNSW Vector Search Query',
    language: 'sql',
    description: 'Sub-10ms approximate nearest neighbor query utilizing cosine similarity and partition pruning.',
    code: `CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Hybrid search: Full-Text Rank + Vector Distance
SELECT 
  id,
  title,
  content,
  1 - (embedding <=> $query_embedding) AS similarity_score
FROM document_embeddings
WHERE tenant_id = $tenant_id
ORDER BY embedding <=> $query_embedding
LIMIT 8;`,
  },
];
