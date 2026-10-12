# Sneha Patel — Portfolio

A premium, AI-driven personal portfolio website built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **Framer Motion**. Designed with a modern, corporate-clean "glassmorphism" aesthetic to showcase projects, skills, professional experience, and technical services.

---

## 🚀 Engineering AI Systems Bridging Vision, Data, & IoT

This portfolio showcases the work of **Sneha Patel**, a B.Tech Computer Science & Engineering student at Navrachana University specializing in **Computer Vision**, **Machine Learning Systems**, and **IoT/Embedded Hardware**.

### Key Technical Capabilities
*   **Computer Vision & NLP**: Custom deep learning pipelines, Vision Transformers (ViT), and sentiment classification models.
*   **IoT & Embedded Hardware**: Low-latency edge computing prototypes linking Raspberry Pi and Arduino via custom serial interfaces.
*   **Database Design**: Relational databases and graph-based models (Neo4j, Cypher) to map and analyze complex crisis data.
*   **Explainable AI**: Custom digital forensics algorithms (ELA, DCT frequency) combined with Grad-CAM heatmaps for neural network interpretability.

---

## 🛠️ The Tech Stack

*   **Framework**: Next.js 15 (App Router, Server & Client Components)
*   **Styling**: Tailwind CSS (Modern dark mode theme, glassmorphic card layouts)
*   **Language**: TypeScript, JavaScript
*   **Animations**: Framer Motion (Smooth page transitions, micro-interactions, responsive states)
*   **Icons**: Lucide React
*   **Data Structures & State**: Statically driven via an extensible data schema (`lib/data.ts`)

---

## 📁 Project Highlights & Architecture

The portfolio showcases verified AI, edge computing, and full-stack software systems:

### 1. ⚡ Arcanum AI — Context-Aware IDE Copilot
*   **Honor**: 6th Rank out of 160 Teams @ TetraTHON 2026 (36-hr National Hackathon by NeoFolks, Navrachana Univ & ISEN Méditerranée).
*   **Role**: AI & Backend Developer (Co-founder).
*   **Tech Stack**: `Next.js 15`, `FastAPI`, `Python`, `Tree-Sitter / AST`, `Monaco Editor`, `Tailwind CSS`.
*   **Status**: Live MVP at [tetra027.web.app](https://tetra027.web.app); multi-agent vector RAG architecture on planned roadmap.
*   **Key Capabilities**:
    *   Active code buffer ingestion and dynamic token budget manager.
    *   Sub-120ms token streaming pipeline via asynchronous FastAPI endpoints.
    *   AST symbol extraction for context-grounded completions and refactor suggestions.

### 2. ♻️ NeuraBin / GreenSort — Edge-AI Municipal Waste Sorter
*   **Honor**: Top 6 Finalist / 160 Teams @ SustainX 2026 National Competition & Published Research Paper.
*   **Role**: Hardware & Embedded AI Lead, Co-author.
*   **Tech Stack**: `YOLOv8`, `Raspberry Pi 4 Model B (4GB)`, `Arduino Uno`, `MG996R Servo`, `OpenCV`, `Python`, `C++`.
*   **Key Results**:
    *   Achieved **90 mAP** across 4 waste streams (biodegradable, non-biodegradable, recyclable, hazardous) on custom edge dataset.
    *   **1.7s total cycle time** (camera frame capture, edge inference, and mechanical servo gate drop).
    *   Passed 8/8 physical edge trial cases; total bill of materials under ₹5,000 (~$60).

### 3. 🛡️ DeepShield AI — Dual-Domain Deepfake Forensics
*   **Role**: Lead Developer & Researcher.
*   **Tech Stack**: `PyTorch`, `FastAPI`, `Next.js`, `OpenCV`, `ViT-Base-16`, `ELA`, `2D-DCT`, `Grad-CAM`.
*   **Key Capabilities**:
    *   Dual-domain analysis pairing spatial Vision Transformers with Error Level Analysis (ELA) and 2D Discrete Cosine Transform (DCT) frequency grid artifacts.
    *   Grad-CAM spatial anomaly heatmaps providing interpretable decision boundaries.
    *   Rigorous evaluation on FaceForensics++ and DFDC benchmarks with candid documentation of compression degradation under social media transcoding.

### 4. 🩺 DermaJourney — Clinical Dermatology Decision Support
*   **Role**: ML Researcher & Co-author.
*   **Tech Stack**: `PyTorch`, `EfficientNet-B4`, `Vision Transformer`, `ISIC Archive`, `Python`, `FastAPI`.
*   **Key Capabilities**:
    *   Dual-backbone vision ensemble evaluated on dermoscopic lesion benchmarks.
    *   Symptom-conditioned Bayesian risk calculator with strict triage guardrails (Routine, Priority, Urgent Specialist).
    *   Research manuscript focusing on decision support and referral thresholds over autonomous diagnosis.

### 5. 🧠 Crisis Risk NLP & Knowledge Graph Mapping
*   **Organization**: CSRBOX (Data Specialist Internship).
*   **Tech Stack**: `Python`, `Scikit-Learn`, `Neo4j`, `Cypher`, `NLP (TF-IDF, BiLSTM, Transformers)`, `Pandas`.
*   **Key Capabilities**:
    *   Analyzed and preprocessed **101,110 text records** for distress polarity classification (~93.8% validation accuracy).
    *   Architected Neo4j graph schema mapping chronological distress triggers and co-occurring crisis tokens with Cypher queries.

### 6. 🚛 Logistics Supplier Ranker
*   **Organization**: Mesh Works Hackathon (CEO Direct Commendation).
*   **Tech Stack**: `Python`, `Scikit-Learn`, `Ridge Regression`, `Pandas`, `Streamlit`.
*   **Key Capabilities**:
    *   Multivariable regression weighting freight delays, defect logs, and delivery schedules to rank logistics carriers.

---

## 🧬 Premium Interactive Features

The portfolio features several advanced interactive elements designed to engage visitors, demonstrate technical expertise, and streamline the hiring process:

### 1. 🤖 Recruiter AI Agent & ATS Scanner
*   **Location**: [`RecruiterPanel.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/ui/RecruiterPanel.tsx) & [`recruiterAgent.ts`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/lib/agent/recruiterAgent.ts)
*   **AI Chat**: Interactive assistant that tokenizes and parses recruiter questions, instantly returning matching projects, cloud certifications, and B.Tech academic details.
*   **ATS Compatibility Engine**: Recruiters can paste a job description (JD) to compute a matching score, extract strengths, identify missing skills, and get personalized interview recommendations.

### 2. ⚡ Interactive Skills Matrix
*   **Location**: [`InteractiveSkillsMatrix.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/InteractiveSkillsMatrix.tsx)
*   **Description**: A hexagonal matrix visualizing skills categorized by domains (ML, Computer Vision, Frontend, IoT, Databases) displaying confidence scores, specific tool knowledge, and corresponding case study links on hover.

### 3. 📊 Live GitHub Dashboard
*   **Location**: [`GitHubDashboard.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/GitHubDashboard.tsx)
*   **Description**: Custom dashboard visualizing code contributions, repository statistics, and language distributions using responsive SVG components.

### 4. 📐 Project Architecture Visualizer
*   **Location**: [`ProjectArchitecture.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/ProjectArchitecture.tsx) & [`PipelineVisualizer.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/PipelineVisualizer.tsx)
*   **Description**: Interactive directed-graph nodes visualizing high-level data pipelines (e.g. `User Upload` ➔ `FastAPI Preprocessing` ➔ `ViT-Base-16 Inference` ➔ `Grad-CAM Visualizer Output`) with animated directional signal flow arrows.

### 5. 🔍 Accessible Project Drawer
*   **Location**: [`ProjectDrawer.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/ProjectDrawer.tsx)
*   **Description**: Sliding sidebar drawer with comprehensive case details, challenges, outcomes, and future updates. Designed following WCAG AA guidelines with keyboard accessibility (focus trapping and `Escape` key close handlers).

### 🏷️ Optimized SEO & PWA Framework
*   **FAQ & Rich Snippets**: Schema markup generator ([`FAQSchema.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/seo/FAQSchema.tsx)) and JSON-LD profile injection ([`JsonLd.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/seo/JsonLd.tsx)) to boost Google search engine visibility.
*   **PWA Ready**: Configured with dynamic web app manifest (`public/manifest.webmanifest`) and standard XML sitemaps for offline integration.

---

## 🗂️ Project Structure

```bash
portfolio/
├── app/                      # Next.js 15 App Router pages & metadata
│   ├── about/                # Bio, Education, and Work Experience page
│   ├── contact/              # Interactive contact page
│   ├── projects/             # Detailed case study dynamic pages
│   ├── services/             # Core capabilities showcase
│   ├── globals.css           # Tailwind CSS directives & theme colors
│   ├── layout.tsx            # Global layout with Navbar & Footer components
│   ├── robots.ts             # SEO robots rules config
│   ├── sitemap.ts            # Dynamic sitemap generator
│   └── page.tsx              # Home landing page with Featured Projects & Capability summary
├── components/               # Reusable React components
│   ├── home/                 # Home-specific layouts (Hero, FeaturedProjects, ResearchCallout)
│   ├── layout/               # Nav, Footer, and PageWrappers
│   ├── projects/             # Interactive items (ProjectDrawer, SkillsMatrix, GitHubDashboard, Architecture)
│   ├── seo/                  # SEO Schemas (FAQSchema, JsonLd)
│   └── ui/                   # Reusable UI primitives (Button, CustomCursor, RecruiterPanel, Doodles)
├── lib/
│   ├── agent/                # Recruiter AI Agent NLP scanner engine logic
│   │   └── recruiterAgent.ts
│   ├── data.ts               # Core portfolio schema & JSON dataset (Single source of truth)
│   ├── seo.ts                # Default metadata configurations
│   └── utils.ts              # Tailwind merging utility functions
├── public/                   # Static assets (optimized WebP images, manifests, PDFs)
├── DEPLOYMENT.md             # Detailed deployment steps (Vercel & Manual)
└── README.md                 # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
Ensure you have **Node.js 18.x** or higher installed.

### 1. Clone the repository and install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio live.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## ✏️ Customization

To personalize the portfolio with your own details:
1.  **Profile Data**: Edit the profile parameters in [`lib/data.ts`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/lib/data.ts) (including name, tagline, email, LinkedIn, and GitHub links).
2.  **Projects**: Add or modify items in the `DATA.projects` array inside [`lib/data.ts`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/lib/data.ts). The schema supports standard descriptors as well as `extended` properties (architecture steps, results, challenges, future plans) which are automatically parsed by the dynamic project routes.
3.  **Skills**: Update language, framework, and hardware items in the `DATA.skills` object.
4.  **Theme Config**: Custom color schemes and border styling can be tweaked within [`tailwind.config.ts`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/tailwind.config.ts).

---

## 🚢 Deployment

Detailed instruction sheets for deploying to Vercel or hosting manually are available in [DEPLOYMENT.md](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/DEPLOYMENT.md).
