import { DATA } from "@/lib/data";

export interface AgentResponse {
    answer: string;
    matchedProjectId?: string;
    confidence: number;
}

export interface ATSAnalysis {
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    strengths: string[];
    recommendations: string[];
}

// Synonyms dictionary to handle variant recruiter terms
const SYNONYMS: Record<string, string> = {
    "deepfake": "deepshield",
    "forensics": "deepshield",
    "vit": "deepshield",
    "vision transformer": "deepshield",
    "waste": "greensort",
    "sorter": "greensort",
    "raspberry": "greensort",
    "arduino": "greensort",
    "trash": "greensort",
    "hardware": "greensort",
    "sustainx": "greensort",
    "neurabin": "greensort",
    "suicide": "suicide-prediction",
    "crisis": "suicide-prediction",
    "neo4j": "suicide-prediction",
    "nlp": "suicide-prediction",
    "graph": "suicide-prediction",
    "derma": "dermajourney",
    "dermajourney": "dermajourney",
    "skin": "dermajourney",
    "melanoma": "dermajourney",
    "clinical": "dermajourney",
    "triaging": "dermajourney",
    "supplier": "supplier-ranking",
    "logistics": "supplier-ranking",
    "ranking": "supplier-ranking",
    "regression": "supplier-ranking",
    "crop": "vegetable-classifier",
    "vegetable": "vegetable-classifier",
    "farming": "vegetable-classifier",
    "resnet": "vegetable-classifier",
    "embedded": "greensort",
    "edge": "greensort",
    "latency": "greensort",
    "fps": "greensort",
    "speed": "greensort",
    "quantization": "greensort",
    "databases": "suicide-prediction",
    "gcp": "gcp-data",
    "aws": "aws-ml",
    "cgpa": "diploma-topper",
    "gpa": "diploma-topper",
    "tetrathon": "arcanum-ai",
    "arcanum": "arcanum-ai",
    "copilot": "arcanum-ai",
    "ide": "arcanum-ai",
    "agent": "arcanum-ai"
};

// Skill Keywords to match in Job Descriptions
const SKILLS_KEYWORD_MAP: Record<string, string[]> = {
    "PyTorch": ["pytorch", "torch", "deep learning", "nn", "neural network"],
    "TensorFlow": ["tensorflow", "keras", "tf"],
    "YOLO / CV": ["yolo", "yolov8", "object detection", "computer vision", "opencv"],
    "Neo4j": ["neo4j", "graph database", "cypher", "nosql", "knowledge graph"],
    "Next.js": ["nextjs", "next.js", "react", "frontend", "typescript", "javascript"],
    "FastAPI": ["fastapi", "python api", "rest api", "backend"],
    "Embedded / IoT": ["arduino", "raspberry pi", "microcontroller", "firmware", "serial", "i2c", "edge ai"],
    "NLP & Transformers": ["nlp", "transformers", "bert", "bilstm", "tf-idf", "hugging face"],
    "Data Analysis": ["pandas", "numpy", "regression", "data cleaning", "scikit-learn"]
};

// Predefined detailed answers for recruiter questions
const QA_DATABASE = [
    {
        keywords: ["arcanum", "tetrathon", "copilot", "ide", "hackathon", "agent", "token", "6th"],
        projectId: "arcanum-ai" as const,
        answer: "At TetraTHON 2026, Sneha co-built Arcanum AI, securing 6th rank out of 160 competing teams in a 36-hour hackathon (organized by NeoFolks, Navrachana University & ISEN Méditerranée). Serving as AI & Backend Developer, she architected the context-aware IDE copilot engine with active buffer ingestion, AST symbol extraction, and sub-120ms token streaming using FastAPI and Next.js 15. The implemented MVP is live at tetra027.web.app, with a multi-agent vector RAG architecture currently in active development."
    },
    {
        keywords: ["deepshield", "deepfake", "forensics", "vit", "transformer", "ela", "dct", "gradcam"],
        projectId: "deepshield" as const,
        answer: "For DeepShield AI, Sneha engineered a dual-domain digital forensics pipeline combining spatial features (ViT-Base-16) with frequency-domain artifacts (Discrete Cosine Transform / DCT and Error Level Analysis / ELA) and Grad-CAM spatial heatmaps for interpretability. Evaluated on benchmark fakes (FaceForensics++ and DFDC), the system achieved high laboratory validation accuracy while transparently documenting real-world limitations under aggressive social media compression and transcoding."
    },
    {
        keywords: ["greensort", "neurabin", "waste", "sorter", "raspberry", "arduino", "servo", "latency", "edge", "offline", "sustainx"],
        projectId: "greensort" as const,
        answer: "NeuraBin / GreenSort is an edge-AI municipal waste sorting device that achieved Top 6 out of 160 teams at the SustainX 2026 National Competition. Running a customized YOLOv8 model on a Raspberry Pi 4 Model B (4GB), it achieved 90 mAP across 4 waste streams (biodegradable, non-biodegradable, recyclable, hazardous). The Pi communicates over Serial-over-USB to an Arduino Uno and high-torque MG996R servo, completing a full cycle (capture, inference, and flap actuation) in 1.7 seconds at an estimated hardware bill of materials under ₹5,000 (~$60)."
    },
    {
        keywords: ["dermajourney", "derma", "skin", "healthcare", "melanoma", "clinical", "triage", "biomarker"],
        projectId: "dermajourney" as const,
        answer: "DermaJourney is an AI-assisted dermatological clinical triaging and decision support system. It combines dual-backbone vision classifiers (EfficientNet-B4 + Vision Transformer) evaluated on ISIC dermoscopic datasets with a symptom-conditioned Bayesian risk calculator. Sneha co-authored research focusing on explainable Grad-CAM saliency heatmaps, strict safety guardrails, and 'referral required' confidence thresholds rather than unassisted autonomous diagnosis."
    },
    {
        keywords: ["suicide", "crisis", "neo4j", "nlp", "graph", "sentiment", "context", "101k", "distress"],
        projectId: "suicide-prediction" as const,
        answer: "During her CSRBOX data engineering internship, Sneha analyzed over 101,110 text records to build a suicide & depression risk classification engine. She evaluated TF-IDF + Logistic Regression, BiLSTM, and Hugging Face transformer baselines (~93.8% validation accuracy). To overcome the loss of longitudinal context in flat tables, she architected a Neo4j knowledge graph schema mapping distress triggers, temporal sentiment progression, and co-occurring crisis tokens with Cypher queries."
    },
    {
        keywords: ["supplier", "logistics", "ranking", "regression", "pandas", "streamlit"],
        projectId: "supplier-ranking" as const,
        answer: "At a Mesh Works hackathon, Sneha built a Logistics Supplier Ranker. She developed a multivariable regression algorithm weighting cost, defect logs, and delivery schedules to score carrier reliability. Written in Python and Pandas, the system validated sparse logistical records and was visualized on a Streamlit dashboard, earning direct commendations from the CEO for rank prediction accuracy."
    },
    {
        keywords: ["vegetable", "crop", "classifier", "resnet", "opencv"],
        projectId: "vegetable-classifier" as const,
        answer: "Sneha conducted an agricultural Computer Vision study evaluating six CNN architectures on edge devices. She manually compiled a dataset of 1,200 crop images in harsh wholesale market lighting. Using OpenCV HSV color segmentation and background isolation filters, she optimized a MobileNet pipeline that achieved responsive edge performance with ~92% real-world accuracy on constrained hardware."
    },
    {
        keywords: ["cgpa", "gpa", "academics", "marks", "education", "polytechnic", "diploma"],
        answer: "Sneha has an exceptional academic track record. She graduated with a Diploma in Computer Engineering from Government Polytechnic for Girls, Ahmedabad, securing a 9.42 CGPA overall and a perfect SPI 10.0 in her final semester. She is currently maintaining top-tier grades in her B.Tech CSE coursework at Navrachana University."
    },
    {
        keywords: ["certifications", "gcp", "aws", "cloud", "neo4j cert", "certified"],
        answer: "Sneha holds 5 verified certifications: 1) AWS Academy Graduate in Machine Learning Foundations, 2) Google Cloud Academy in GCP Data Engineering, 3) Neo4j Certified Professional in Graph Database Systems, 4) IBM Certified in Data Analysis with Python, and 5) Cisco Certified in IoT & Cybersecurity."
    }
];

// Tokenize and clean text helper
function cleanAndTokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 1);
}

// Calculate overlap coefficient between two token lists
function getSimilarity(tokensA: string[], tokensB: string[]): number {
    if (tokensA.length === 0 || tokensB.length === 0) return 0;
    const setA = new Set(tokensA);
    let intersectionCount = 0;
    
    for (const token of tokensB) {
        if (setA.has(token)) {
            intersectionCount++;
        }
    }
    
    return intersectionCount / Math.min(tokensA.length, tokensB.length);
}

/**
 * Parses user questions and finds the best detailed answer from the local database
 */
export function answerQuestion(question: string): AgentResponse {
    const questionTokens = cleanAndTokenize(question);
    
    // Check if query maps to a synonym
    const expandedTokens = [...questionTokens];
    for (const t of questionTokens) {
        if (SYNONYMS[t]) {
            expandedTokens.push(SYNONYMS[t]);
        }
    }

    let bestMatch: typeof QA_DATABASE[0] | null = null;
    let maxScore = 0;

    for (const qa of QA_DATABASE) {
        const score = getSimilarity(expandedTokens, qa.keywords);
        if (score > maxScore) {
            maxScore = score;
            bestMatch = qa;
        }
    }

    if (bestMatch && maxScore > 0.15) {
        return {
            answer: bestMatch.answer,
            matchedProjectId: bestMatch.projectId,
            confidence: maxScore
        };
    }

    // Dynamic search across newly synced DATA.projects
    const dynamicProject = DATA.projects.find((p) => {
        const pTokens = cleanAndTokenize(`${p.title} ${p.description} ${p.category} ${p.techStack.join(" ")}`);
        return getSimilarity(questionTokens, pTokens) > 0.15;
    });

    if (dynamicProject) {
        return {
            answer: `Regarding ${dynamicProject.title}: Sneha built this system using ${dynamicProject.techStack.join(", ")}. ${dynamicProject.description} Key features include: ${dynamicProject.features.slice(0, 2).join("; ")}.`,
            matchedProjectId: dynamicProject.id,
            confidence: 0.6
        };
    }

    // Dynamic search across newly synced DATA.achievements
    const dynamicAch = DATA.achievements.find((a) => {
        const aTokens = cleanAndTokenize(`${a.title} ${a.desc} ${a.category}`);
        return getSimilarity(questionTokens, aTokens) > 0.15;
    });

    if (dynamicAch) {
        return {
            answer: `Honor & Achievement: Sneha achieved '${dynamicAch.title}' (${dynamicAch.date || "Recent"}). ${dynamicAch.desc}`,
            confidence: 0.6
        };
    }

    return {
        answer: "I couldn't find a direct match for that question in Sneha's verified logs. Try asking about 'Arcanum AI at TetraTHON', 'DeepShield dual-domain forensics', 'NeuraBin / GreenSort 90 mAP at SustainX', 'DermaJourney clinical AI research', or 'Neo4j 101k crisis mapping'.",
        confidence: 0
    };
}

/**
 * Scan pasted Job Description and calculate ATS match score & recommendations
 */
export function scanJobDescription(jobDescription: string): ATSAnalysis {
    const jdTokens = cleanAndTokenize(jobDescription);
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    
    // Match skills
    for (const [skillName, keywords] of Object.entries(SKILLS_KEYWORD_MAP)) {
        const matches = keywords.some((kw) => {
            const kwTokens = cleanAndTokenize(kw);
            // Check if kwTokens is a subset of jdTokens
            return kwTokens.every((token) => jdTokens.includes(token));
        });

        if (matches) {
            matchedSkills.push(skillName);
        } else {
            // Check if job description requests it (e.g. mention of skill name, case-insensitive, normalized)
            const normalizedSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
            const jdNormalizedText = jobDescription.toLowerCase().replace(/[^a-z0-9]/g, "");
            
            const isSkillInJd = jdTokens.includes(normalizedSkill) || jdNormalizedText.includes(normalizedSkill);
            if (isSkillInJd) {
                missingSkills.push(skillName);
            }
        }
    }

    // Default calculations
    const totalPossibleMatches = 6;
    const matchCount = Math.min(matchedSkills.length, totalPossibleMatches);
    const rawScore = 60 + (matchCount / totalPossibleMatches) * 35; // base score of 60 if they paste something related
    const finalScore = Math.min(Math.round(rawScore), 100);

    // Formulate strengths and advice
    const strengths: string[] = [];
    const recommendations: string[] = [];

    if (matchedSkills.includes("PyTorch") || matchedSkills.includes("YOLO")) {
        strengths.push("Deep Learning & Computer Vision (matched DeepShield & Greensort pipelines).");
    }
    if (matchedSkills.includes("Arduino") || matchedSkills.includes("Raspberry Pi")) {
        strengths.push("Hardware-software integration and Edge-AI model compilation.");
    }
    if (matchedSkills.includes("Neo4j") || matchedSkills.includes("SQL")) {
        strengths.push("Advanced graph database structures and query contextual mapping.");
    }

    if (strengths.length === 0) {
        strengths.push("Strong CS core fundamentals in algorithms and systems engineering.");
    }

    // Recommendations
    if (finalScore >= 90) {
        recommendations.push("Sneha's profile represents an exceptional match. Arrange a technical interview focusing on her Deepfake classification or edge model quantization.");
    } else {
        recommendations.push("Review her B.Tech coursework and certifications in AWS/GCP to map equivalent cloud readiness.");
    }
    
    if (missingSkills.length > 0) {
        recommendations.push(`Ask about her projects matching requested tools like: ${missingSkills.slice(0, 2).join(", ")}.`);
    }

    return {
        score: finalScore,
        matchedSkills,
        missingSkills,
        strengths,
        recommendations
    };
}
