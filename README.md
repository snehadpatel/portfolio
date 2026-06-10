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

The portfolio showcases several advanced machine learning and hardware integration projects:

### 1. 🛡️ DeepShield AI Forensics
*   **Objective**: Visual forensics pipeline to detect face swaps and GAN-generated deepfakes.
*   **Tech Stack**: `PyTorch`, `FastAPI`, `Next.js`, `OpenCV`, `ViT-Base-16`, `FGSM`
*   **Architecture**:
    `Web Upload (Next.js) ➔ FastAPI API ➔ Forensic Extraction (ELA & DCT) ➔ Ensemble Pipeline (ViT) ➔ Grad-CAM Heatmap Visualizer`
*   **Key Features**:
    *   Grad-CAM visualization hooks to output pixel heatmaps of anomalous areas.
    *   A prototype Fast Gradient Sign Method (FGSM) noise-injector to immunize original photos before uploading to the web.
    *   Achieved **97.5% classification accuracy** on unseen GAN holdout sets.

### 2. 🥦 Local Crop Classifier Study
*   **Objective**: Agricultural computer vision study comparing six CNN architectures trained on locally captured datasets to optimize edge deployments.
*   **Tech Stack**: `PyTorch`, `ResNet18`, `Flask`, `OpenCV`, `Python`
*   **Architecture**:
    `Flask Web Form ➔ OpenCV Background Subtractor ➔ PyTorch ResNet18 ➔ Class Prediction Output`
*   **Key Features**:
    *   Preprocessed over 1,200 photos of regional vegetables (Karela, Parwal) under highly inconsistent wholesale market lighting.
    *   Applied synthetic minority oversampling (SMOTE) and custom affine transforms to balance seasonal sets.

### 3. ♻️ Greensort: IoT Waste Sorter
*   **Objective**: Edge-AI hardware prototype running a quantized YOLOv8 model on a Raspberry Pi 4, communicating sorting signals to an Arduino-driven mechanical flap.
*   **Tech Stack**: `YOLOv8`, `OpenCV`, `Python`, `Raspberry Pi`, `Arduino Uno`
*   **Architecture**:
    `Pi Camera ➔ Raspberry Pi (Quantized YOLOv8) ➔ USB Serial Port ➔ Arduino ➔ Servo Motors (Mechanical Flaps) ➔ Ultrasonic Level Sensors`
*   **Key Features**:
    *   Quantized YOLOv8 weights to INT8, achieving 12fps inference speed directly on Pi cores.
    *   Synchronized physical servo flap transitions with camera capture and model inference lag under 180ms total loop latency.

### 4. 🧠 NLP Crisis Context Mapper
*   **Objective**: NLP crisis evaluation tool built during an internship at CSRBOX to map behavioral distress statements.
*   **Tech Stack**: `Python`, `Scikit-Learn`, `Neo4j`, `NLP (TF-IDF, Tokenizers)`, `Pandas`
*   **Key Features**:
    *   Designed a Neo4j graph database schema mapping relationships between patient IDs, sentiment scores, and distress tokens.
    *   Wrote Cypher queries to help evaluators trace chronological context pathways instead of isolated keywords.

### 5. 🚛 Logistics Supplier Ranker
*   **Objective**: Multi-variable regression model scoring cargo providers based on defects, costs, and delays.
*   **Tech Stack**: `Python`, `Scikit-Learn`, `Regression Models`, `Pandas`, `Streamlit`
*   **Key Features**:
    *   Fitted custom multi-variable regression models weighting late-deliveries, defects, and costs.
    *   Earned direct commendation from the CEO of Mesh Works for ranking accuracy.

---

## 🧬 Pipeline Visualizer Component

The portfolio features a custom React client component, [`PipelineVisualizer.tsx`](file:///Users/snehapatel/Library/CloudStorage/OneDrive-Personal/portfolio/components/projects/PipelineVisualizer.tsx), which interactively illustrates the multi-step pipeline for each project. It displays:
1.  **Fixed-width step cards** with hover highlights.
2.  **Step-by-step progress arrows** detailing signal transition.
3.  **Horizontal scroll overlays** optimized for both mobile and desktop screens.

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
│   └── page.tsx              # Home landing page with Featured Projects & Capability summary
├── components/               # Reusable React components
│   ├── home/                 # Home-specific layouts (Hero, FeaturedProjects)
│   ├── layout/               # Nav, Footer, and PageWrappers
│   ├── projects/             # Project-specific elements (PipelineVisualizer)
│   └── ui/                   # Reusable UI primitives (Button, Input, etc.)
├── lib/
│   ├── data.ts               # Core portfolio schema & JSON dataset (Single source of truth)
│   └── utils.ts              # Tailwind merging utility functions
├── public/                   # Static assets (images, pdfs, project thumbnails)
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
