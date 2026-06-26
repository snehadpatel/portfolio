export interface AgentResponse {
    answer: string;
    matchedProjectId?: "deepshield" | "greensort" | "suicide-prediction" | "supplier-ranking" | "vegetable-classifier";
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
    "suicide": "suicide-prediction",
    "crisis": "suicide-prediction",
    "neo4j": "suicide-prediction",
    "nlp": "suicide-prediction",
    "graph": "suicide-prediction",
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
    "gpa": "diploma-topper"
};

// Skill Keywords to match in Job Descriptions
const SKILLS_KEYWORD_MAP: Record<string, string[]> = {
    "PyTorch": ["pytorch", "torch", "deep learning", "nn", "neural network"],
    "TensorFlow": ["tensorflow", "keras", "tf"],
    "YOLO": ["yolo", "yolov8", "object detection", "realtime detection"],
    "Neo4j": ["neo4j", "graph database", "cypher", "nosql"],
    "Next.js": ["nextjs", "next.js", "react", "frontend", "typescript", "javascript"],
    "FastAPI": ["fastapi", "python api", "rest api", "backend"],
    "Arduino": ["arduino", "microcontroller", "firmware", "c++", "serial"],
    "Raspberry Pi": ["raspberry pi", "rpi", "edge hardware", "single board"],
    "SQL": ["sql", "mysql", "database", "querying"],
    "Data Analysis": ["pandas", "numpy", "regression", "data cleaning", "scikit-learn"]
};

// Predefined detailed answers for recruiter questions
const QA_DATABASE = [
    {
        keywords: ["deepshield", "deepfake", "forensics", "vit", "transformer", "fgsm"],
        projectId: "deepshield" as const,
        answer: "For DeepShield AI, Sneha engineered a dual-pipeline digital forensics system. First, it extracts Discrete Cosine Transform (DCT) and Error Level Analysis (ELA) compression metadata to expose tampering. These artifacts feed into a Vision Transformer (ViT-Base-16) model rather than a standard CNN, achieving 97.5% classification accuracy on compressed fakes. She also added an FGSM adversarial noise injection pipeline so developers can pre-emptively immunize faces from deepfake cloning before uploading."
    },
    {
        keywords: ["greensort", "waste", "sorter", "raspberry", "arduino", "servo", "latency", "edge", "offline", "quantization"],
        projectId: "greensort" as const,
        answer: "GreenSort is an offline Edge-AI municipal solid waste sorter. Sneha ran a YOLOv8 object detection model on a Raspberry Pi 4. To get a responsive sorting speed, she quantized the model weights to INT8, achieving 12fps directly on the CPU cores. The Pi processes frames in under 80ms and coordinates sorting signals via Serial-over-USB to an Arduino Uno, which triggers mechanical flaps powered by a high-torque MG996R servo in under 180ms total loop latency."
    },
    {
        keywords: ["suicide", "crisis", "neo4j", "nlp", "graph", "sentiment", "context"],
        projectId: "suicide-prediction" as const,
        answer: "During her CSRBOX internship, Sneha built an NLP crisis mapping engine. Relational databases failed to capture context over time, so she designed a Neo4j Graph Database schema connecting nodes for patient IDs, distress tokens, and sentiments. This enabled clinical counselors to use Cypher queries to trace context paths and chronological changes instead of matching isolated keywords, reducing false-positive alerts by 34%."
    },
    {
        keywords: ["supplier", "logistics", "ranking", "regression", "pandas", "streamlit"],
        projectId: "supplier-ranking" as const,
        answer: "At a Mesh Works hackathon, Sneha built a Logistics Supplier Ranker. She developed a multivariable regression algorithm weighting cost, defect logs, and delivery schedules to score carrier reliability. Written in Python and Pandas, the system validated sparse logistical records and was visualized on a Streamlit dashboard, earning direct commendations from the CEO for rank prediction accuracy."
    },
    {
        keywords: ["vegetable", "crop", "classifier", "resnet", "opencv"],
        projectId: "vegetable-classifier" as const,
        answer: "Sneha conducted an agricultural Computer Vision study evaluating six CNN architectures on edge devices. She manually compiled a dataset of 1,200 crop images in harsh, wholesale market lighting. Using OpenCV HSV color segmentation and background isolation filters, she optimized a lightweight MobileNet structure that cut latency by 45% while maintaining a 92% real-world accuracy rate on constrained edge microprocessors."
    },
    {
        keywords: ["cgpa", "gpa", "academics", "marks", "education", "polytechnic", "diploma"],
        answer: "Sneha has an exceptional academic track record. She graduated with a Diploma in Computer Engineering from Government Polytechnic for Girls, Ahmedabad, securing a 9.42 CGPA overall and a perfect SPI 10.0 in her final semester. She is currently maintaining excellent marks in her B.Tech CSE coursework at Navrachana University."
    },
    {
        keywords: ["certifications", "gcp", "aws", "cloud", "neo4j cert", "certified"],
        answer: "Sneha holds multiple premium cloud and technical credentials: 1) AWS Academy Graduate in Machine Learning Foundations, 2) Google Cloud Academy Certified in GCP Data Engineering, 3) Neo4j Certified Professional in Graph Database Systems, 4) IBM Certified in Data Analysis with Python, and 5) Cisco Certified in IoT & Cybersecurity."
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

    return {
        answer: "I couldn't find a direct match for that question in Sneha's logs. Try asking about her 'Deepfake ViT model accuracy', 'Greensort latency optimization on Raspberry Pi', or 'Neo4j crisis mapping'.",
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
            // Check if job description requests it (e.g. mention of skill name)
            if (jdTokens.includes(skillName.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
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
