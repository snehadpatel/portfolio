export interface ExtendedDetails {
    problemStatement: string;
    constraints: {
        timeline: string;
        team: string;
        techStack: string;
    };
    solution: string;
    tradeoffs: string;
    impact: string;
}

export interface PublicationDetails {
    title: string;
    authors: string[];
    conference?: string;
    venue?: string;
    status: "Published" | "Presented / Accepted" | "Under Review" | "Ongoing Research";
    abstract: string;
    paperUrl?: string;
}

export interface ResearchItem {
    id: string;
    title: string;
    authors: string[];
    guide?: string;
    area: string;
    venue: string;
    status: "Published" | "Presented / Accepted" | "Under Review" | "Ongoing Research";
    abstract: string;
    paperUrl?: string;
    readUrl?: string;
    projectId?: string;
    highlights?: string[];
}

export interface Project {
    id: string;
    title: string;
    description: string;
    problemStatement?: string;
    contribution?: string;
    status?: string;
    techStack: string[];
    features: string[];
    implementedFeatures?: string[];
    plannedFeatures?: string[];
    link: string;
    github: string;
    image: string;
    category: string;
    roles: ("ml" | "data" | "iot" | "fullstack")[];
    extended?: ExtendedDetails;
    publication?: PublicationDetails;
}

export interface CategorizedSkillGroup {
    category: string;
    skills: string[];
}

export interface SkillSet {
    languages: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
    categorized: CategorizedSkillGroup[];
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    type?: "Startup" | "Internship" | "Research" | "Freelance / Projects";
    description: string;
    technologies?: string[];
    deliverables?: string[];
}

export interface Profile {
    name: string;
    tagline: string;
    summary: string;
    email: string;
    linkedin: string;
    github: string;
    resumeUrl?: string;
    certificationsUrl?: string;
    focusAreas: string[];
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
    score?: string;
    coursework: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    details: string[];
    icon: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    verificationUrl?: string;
    skills: string[];
    category: "cloud" | "ml" | "graph" | "iot" | "analytics" | "networking";
}

export interface Achievement {
    id: string;
    title: string;
    desc: string;
    category: "hackathon" | "robotics" | "academic" | "general";
    date?: string;
    certificateUrl?: string;
}

export interface DataType {
    profile: Profile;
    skills: SkillSet;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    services: Service[];
    certifications: Certification[];
    achievements: Achievement[];
    research: ResearchItem[];
}

export const DATA: DataType = {
    profile: {
        name: "Sneha Patel",
        tagline: "Computer Science Student & AI/ML Developer building practical AI systems and products.",
        summary:
            "Computer Science student at Navrachana University with an active focus on Machine Learning, Deep Learning, Computer Vision, Agentic AI, and IoT edge systems. Experienced in architecting real-time AI solutions like Arcanum AI (TetraTHON 2026, 6th Rank / 160 Teams), developing physical smart waste classifiers (GreenSort / SustainX 2026 paper), and analyzing high-volume behavioral NLP datasets. Driven to build trustworthy, production-ready AI systems that solve grounded real-world problems.",
        email: "sneha.dpatel@outlook.com",
        linkedin: "https://www.linkedin.com/in/sneha-patel-a0ba14212/",
        github: "https://github.com/snehadpatel",
        resumeUrl: "/assets/resume.pdf",
        certificationsUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
        focusAreas: [
            "Artificial Intelligence and Machine Learning",
            "Deep Learning and Computer Vision",
            "Agentic AI and Multi-Agent Systems",
            "Large Language Models and Retrieval-Augmented Generation",
            "Data Science and Model Evaluation",
            "Backend Development and AI Application Integration",
        ],
    },
    education: [
        {
            institution: "Navrachana University, Vadodara",
            degree: "B.Tech in Computer Science & Engineering",
            period: "Jul 2024 - May 2027 (Expected)",
            score: "Active Undergraduate Student",
            coursework:
                "Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning Foundations, Deep Learning, Computer Vision, Agentic AI, Software Engineering, AI in Healthcare.",
        },
        {
            institution: "Govt. Polytechnic for Girls, Ahmedabad",
            degree: "Diploma in Computer Engineering",
            period: "Sep 2021 - May 2024",
            score: "9.42 CGPA · Final Semester SPI 10.0",
            coursework:
                "Computer Programming (C, C++, Java), Database Systems, Computer Networks, Operating Systems, Web Development. Graduated with academic distinction (9.42 CGPA and perfect SPI 10 in final semester).",
        },
    ],
    skills: {
        languages: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
        frameworks: ["FastAPI", "Next.js", "Flask", "React", "Node.js", "Express", "Tailwind CSS"],
        tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "YOLO (v8)", "OpenCV", "Neo4j", "Docker", "Git", "Arduino Uno", "Raspberry Pi"],
        core: [
            "Agentic AI & Multi-Agent Systems",
            "Large Language Models & RAG",
            "Deep Learning & Computer Vision",
            "IoT & Edge Hardware Integration",
            "Data Science & Model Evaluation",
            "Backend APIs & Microservices",
        ],
        categorized: [
            {
                category: "Programming Languages",
                skills: ["Python", "TypeScript", "JavaScript", "SQL", "C", "C++", "Java", "HTML/CSS"],
            },
            {
                category: "Machine Learning & Deep Learning",
                skills: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "Transfer Learning", "Vision Transformers (ViT)", "CNNs", "Model Evaluation"],
            },
            {
                category: "Computer Vision",
                skills: ["OpenCV", "YOLO (YOLOv8)", "Grad-CAM Heatmaps", "Feature Extraction (ELA / DCT)", "Image Preprocessing", "Background Segmentation"],
            },
            {
                category: "Agentic AI & LLM Applications",
                skills: ["Retrieval-Augmented Generation (RAG)", "Multi-Agent Architectures", "Prompt Engineering", "Semantic Search", "FastAPI AI Orchestration"],
            },
            {
                category: "Data Science & Analytics",
                skills: ["Pandas", "NumPy", "Exploratory Data Analysis", "Feature Engineering", "Data Cleaning", "Matplotlib / Seaborn", "Streamlit"],
            },
            {
                category: "Backend & API Development",
                skills: ["FastAPI", "Next.js API Routes", "Flask", "Node.js", "Express", "RESTful Architecture", "WebSockets"],
            },
            {
                category: "Databases",
                skills: ["Neo4j (Cypher)", "PostgreSQL", "Supabase", "MySQL", "MongoDB"],
            },
            {
                category: "Cloud, Deployment & Hardware",
                skills: ["Arduino Uno", "Raspberry Pi", "MQTT Protocol", "Git & GitHub", "Docker Basics", "AWS Academy ML", "Google Cloud Data"],
            },
        ],
    },
    experience: [
        {
            role: "Co-Founder & AI / Backend Technical Lead",
            company: "Arcanum AI (Startup Sprint)",
            period: "Jul 2026 - Present",
            type: "Startup",
            description:
                "Co-created Arcanum AI, an educational intelligence system designed to help students—especially international and non-native English speakers—understand complex university lectures. Spearheaded the AI/ML pipeline and asynchronous FastAPI backend architecture. Secured 6th Rank out of 160 teams at TetraTHON 2026 (Navrachana University & ISEN Méditerranée). Currently scaling from hackathon MVP toward an agentic syllabus RAG architecture.",
            technologies: ["Python", "FastAPI", "NLP", "Real-Time AI", "React", "Next.js", "Firebase"],
            deliverables: [
                "Built low-latency contextual concept simplification API",
                "Created classroom telemetry schema capturing comprehension bottlenecks",
                "Architected prompt routing pathways to reduce latency under live evaluation",
            ],
        },
        {
            role: "Data Specialist Intern",
            company: "CSRBOX",
            period: "Jan 2024 - Mar 2024",
            type: "Internship",
            description:
                "Conducted data preprocessing, feature engineering, and model evaluation on a benchmark crisis text dataset containing 101,110 records. Engineered an NLP text classification workflow to assess distress sentiment patterns, and modeled contextual relationship pathways using a Neo4j graph database to move beyond isolated keyword matching.",
            technologies: ["Python", "Scikit-Learn", "Neo4j", "Cypher", "NLP", "TF-IDF", "Pandas"],
            deliverables: [
                "Preprocessed and tokenized 101,110 textual records with sentiment scoring",
                "Trained Scikit-Learn classification ensembles to identify distress indicators",
                "Constructed Neo4j graph schemas linking users, emotional markers, and distress tokens",
            ],
        },
        {
            role: "Machine Learning Intern",
            company: "Brainy Beam Technologies, Ahmedabad",
            period: "Jun 2023 - Aug 2023",
            type: "Internship",
            description:
                "Built an end-to-end car recommendation engine utilizing multi-parameter user preference scoring, feature engineering, and regression/classification models. Packaged the pipeline with a functional user interface and documented system performance metrics.",
            technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Data Preprocessing", "Flask"],
            deliverables: [
                "Engineered feature normalization and categorical encoding pipelines for automotive telemetry",
                "Developed recommendation ranking algorithm based on user budget and feature weights",
                "Delivered technical documentation and validation analytics to the senior engineering team",
            ],
        },
        {
            role: "Undergraduate AI & IoT Researcher",
            company: "Navrachana University / SustainX Research",
            period: "Dec 2025 - Present",
            type: "Research",
            description:
                "Co-authored research on 'GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation, Hazard Detection, and Route Optimization' for SustainX 2026. Designed a custom ResNet classifier running on Raspberry Pi CPU at 1.7s latency, communicating via UART with an Arduino Uno sensor array.",
            technologies: ["Deep Learning", "ResNet", "Raspberry Pi", "Arduino", "MQTT", "Supabase", "Python"],
            deliverables: [
                "Fine-tuned 4-class ResNet waste classifier achieving 90 mAP at 1.7s edge inference",
                "Integrated 6 hardware sensors including ultrasonic fill and MQ gas sensors",
                "Validated prototype across all 8 end-to-end hardware-software test scenarios",
            ],
        },
    ],
    projects: [
        {
            id: "arcanum-ai",
            title: "Arcanum AI — Flagship Educational Platform",
            description:
                "An AI-powered educational intelligence platform built to help students comprehend complex academic lectures, with a focus on international and non-native English-speaking learners. Engineered with real-time concept simplification, multilingual assistance, and classroom telemetry.",
            problemStatement:
                "International and non-native English speaking students face steep cognitive hurdles during fast-paced academic lectures filled with dense jargon, lack of contextual scaffolding, and absent live feedback loops for educators.",
            contribution:
                "Co-Founder & AI/Backend Lead: Designed the core concept simplification pipelines, prompt orchestration logic, and high-concurrency FastAPI microservice. Built the prototype in a 36-hour sprint at TetraTHON 2026 (6th place / 160 teams) and currently directing the transition to multi-agent architecture.",
            status: "Implemented MVP Deployed · Active Startup Development",
            techStack: ["Python", "FastAPI", "Agentic AI", "NLP", "RAG", "React", "Next.js", "Tailwind CSS", "Firebase"],
            features: [
                "Contextual concept simplification adapting complex academic definitions into digestible explanations",
                "Multilingual translation pathways supporting non-native English speakers in real-time",
                "Classroom intelligence telemetry tracking student comprehension bottlenecks for educators",
                "Asynchronous FastAPI backend engineered for low-latency query processing",
                "Secured 6th Rank among 160 teams at TetraTHON 2026 (Navrachana University & ISEN Méditerranée)",
            ],
            implementedFeatures: [
                "Real-time contextual academic concept simplification engine",
                "Multilingual translation layer for lecture terms",
                "Student comprehension feedback telemetry dashboard",
                "High-concurrency async FastAPI REST gateway",
                "Deployed live web prototype at tetra027.web.app",
            ],
            plannedFeatures: [
                "Multi-agent orchestration (Tutor Agent, Terminology Agent, and Evaluator Agent)",
                "Syllabus-based Retrieval-Augmented Generation (RAG) referencing specific course textbooks",
                "Speech recognition pipeline generating aligned, searchable lecture transcripts",
                "Adaptive spaced-repetition quiz generator calibrated to each student's weak points",
            ],
            link: "https://tetra027.web.app/",
            github: "https://github.com/Priya-bhatt-crazy/TETRA027",
            image: "/assets/projects/arcanum.webp",
            category: "Agentic AI & EdTech",
            roles: ["ml", "fullstack"],
            extended: {
                problemStatement:
                    "Students often struggle with dense academic concepts when static lecture materials lack real-time context, multilingual terminology support, and adaptive simplification. Meanwhile, university educators lack live comprehension telemetry to identify learning roadblocks during class.",
                constraints: {
                    timeline: "36-Hour Hackathon Sprint (TetraTHON 2026) + Ongoing Product Roadmap",
                    team: "Team Twin Tech Girls (5 Members — AI & Backend Lead)",
                    techStack: "Python, FastAPI, Real-Time AI, NLP, React, Firebase",
                },
                solution:
                    "Engineered Arcanum AI as a dual-facing system: students receive adaptive, on-demand conceptual simplifications and multilingual term breakdowns, while educators view aggregated, anonymized comprehension heatmaps. As AI & Backend Lead, I engineered the asynchronous inference routing pipelines, prompt engineering logic, and backend telemetry handlers.",
                tradeoffs:
                    "During the initial 36-hour sprint, we prioritized lightweight streaming responses and prompt-engineered contextual layers over offline model fine-tuning to guarantee reliable sub-second response times during live jury evaluations.",
                impact:
                    "Won 6th Rank out of 160 competing teams at TetraTHON 2026 (organized in partnership with ISEN Méditerranée, France). Deployed live at tetra027.web.app and actively expanding into multi-agent syllabus RAG.",
            },
        },
        {
            id: "greensort",
            title: "NeuraBin / GreenSort — Smart Waste Intelligence System",
            description:
                "An integrated IoT and edge deep learning system combining a custom ResNet classifier running on a Raspberry Pi CPU with an Arduino Uno multi-sensor array for automated waste segregation, hazardous gas detection, and route optimization.",
            problemStatement:
                "Conventional municipal waste bins rely only on fill-level monitoring, ignoring waste segregation, density anomalies, and hazardous decomposition gases like methane and ammonia.",
            contribution:
                "Co-Author & System Architect: Fine-tuned the 4-class ResNet classifier (90 mAP at 1.7s CPU latency), programmed UART communication between Raspberry Pi and Arduino Uno, and designed the classification-aware route optimization algorithm.",
            status: "Prototype Validated (8/8 Test Cases Passed) · SustainX 2026 Research Paper",
            techStack: ["Computer Vision", "ResNet", "YOLOv8", "Raspberry Pi", "Arduino Uno", "MQTT", "Supabase", "Python"],
            features: [
                "Custom-trained ResNet model achieving 90 mAP on 4 waste classes at 1.7s edge inference latency on CPU",
                "Dual-microcontroller architecture: Arduino Uno handles real-time sensors & servos; Raspberry Pi runs AI & MQTT",
                "Multi-sensor hardware suite: HC-SR04 ultrasonic (fill level), load cell (density anomaly), MQ-135/MQ-2 (gas safety), TCRT5000 (PIR user presence)",
                "Cloud-connected telemetry via MQTT to Supabase PostgreSQL real-time database",
                "Greedy nearest-neighbour route optimization prioritizing bins with >80% fill or Hazardous waste flags",
                "Sub-₹5,000 total prototype build cost, demonstrating viable municipal economics",
            ],
            implementedFeatures: [
                "Four-class visual classifier: Biodegradable (91.2% mAP), Recyclable, Non-Recyclable (88.5% mAP), Hazardous",
                "Dual UART communication protocol between Arduino Uno and Raspberry Pi",
                "Lid opening (SG90 servo) and 90° platform rotation (stepper motor) disposal sequence",
                "VMC Web Dashboard with classification-driven route planning",
                "Passed 8/8 comprehensive prototype test cases",
            ],
            plannedFeatures: [
                "Battery-efficient sleep states with solar-harvesting power management",
                "On-device TensorRT / NPU acceleration for sub-500ms inference",
                "Mobile citizen reporting app with automatic geotagging validation",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/greensort",
            image: "/assets/projects/waste.webp",
            category: "IoT & Computer Vision",
            roles: ["iot", "ml"],
            extended: {
                problemStatement:
                    "Commercial smart bins only detect bin volume with ultrasonic sensors. They cannot verify waste segregation at the point of disposal, cannot detect hazardous decomposition gases (methane/ammonia), and cannot dynamically prioritize collection based on toxic contents.",
                constraints: {
                    timeline: "Academic Research & Prototype Development Cycle",
                    team: "Hetvi Sheth, Parisha Parmar, Sneha Patel (Advised by Prof. Gaurav Kumar Gaharwar)",
                    techStack: "Raspberry Pi 4, Arduino Uno, ResNet, MQTT, Supabase, Python",
                },
                solution:
                    "Designed and built an end-to-end prototype: when a citizen approaches, a PIR sensor signals the Arduino to open the lid and rotate the platform. An OV2640 camera captures an image; the Raspberry Pi executes our custom ResNet classifier to categorize waste into 4 classes. Sensor telemetry and classification tags stream via MQTT to Supabase, driving an administrative route optimization dashboard.",
                tradeoffs:
                    "Selected ResNet over MobileNet after initial tests showed MobileNet struggled with food-contaminated paper, whereas ResNet's residual skip connections resolved the ambiguity. We optimized the model for CPU execution, keeping inference under 1.7 seconds without requiring expensive edge GPU accelerators.",
                impact:
                    "Achieved 90 overall mAP on real in-bin waste conditions. All 8 hardware-software test scenarios passed (MAE 3.2% on ultrasonic, 2.8% on weight). Co-authored research paper written for SustainX 2026.",
            },
            publication: {
                title: "GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation, Hazard Detection, and Route Optimization",
                authors: ["Hetvi Sheth", "Parisha Parmar", "Sneha Patel"],
                conference: "SustainX 2026",
                venue: "SustainX 2026 (Navrachana University)",
                status: "Presented / Accepted",
                abstract:
                    "Municipal solid waste (MSW) generation is projected to reach 3.4 billion tonnes annually by 2050, with Indian cities disproportionately affected due to rapid urbanization. Existing smart bins focus almost exclusively on fill-level monitoring, leaving waste classification, weight-based density anomaly detection, and hazardous gas monitoring largely unaddressed. This paper presents GreenSort, a prototype Smart Waste Management System (SWMS) for municipal deployment. A multi-sensor Arduino Uno feeds data to a Raspberry Pi running a custom-trained ResNet classifier fine-tuned via transfer learning on a four-class dataset, achieving 90 mAP at 1.7s edge inference latency. Sensor telemetry and classification outputs transmit via MQTT to a Supabase backend, powering dynamic route optimization. Total prototype cost: ~₹5,000.",
                paperUrl: "/assets/GreenSort_ResearchPaper_SustainX2026.docx",
            },
        },
        {
            id: "deepshield",
            title: "DeepShield — Digital Media Forensics & Deepfake Detection",
            description:
                "A visual forensics pipeline combining frequency-domain Discrete Cosine Transform (DCT) artifacts, Error Level Analysis (ELA), and a fine-tuned Vision Transformer (ViT-Base-16) to detect manipulated facial media, supplemented by Grad-CAM explainability.",
            problemStatement:
                "Spatial CNN deepfake classifiers overfit to pixel-level patterns and degrade rapidly when media undergoes lossy social media compression (JPEG recompression, resizing, filtering).",
            contribution:
                "Solo Developer & ML Researcher: Engineered the multi-domain forensic feature extraction pipeline, fine-tuned the Vision Transformer model, built Grad-CAM heatmap hooks, and developed prototype FGSM adversarial immunization scripts.",
            status: "Experimental Research Prototype · Validated on GAN Holdout Sets",
            techStack: ["PyTorch", "Vision Transformer (ViT)", "OpenCV", "Grad-CAM", "FastAPI", "Next.js", "Python"],
            features: [
                "Combined Error Level Analysis (ELA) and DCT frequency artifacts to isolate compression tampering",
                "Vision Transformer (ViT-Base-16) architecture capturing global structural inconsistencies across facial patches",
                "Grad-CAM visual heatmap generation highlighting suspect tampered pixel clusters for explainable human review",
                "Dual-pass forensic verification separating spatial artifacts from compression discrepancies",
                "Experimental evaluation distinguishing benchmark holdout performance from real-world compressed media",
            ],
            implementedFeatures: [
                "ELA compression residual extraction script",
                "High-frequency DCT anomaly transform",
                "PyTorch ViT-Base-16 fine-tuned inference pipeline",
                "Grad-CAM visual attention heatmap generator",
                "Prototype FGSM adversarial noise immunization concept",
            ],
            plannedFeatures: [
                "Temporal multi-frame transformer for continuous video sequence analysis",
                "Audio-visual sync inconsistency detection for multimodal deepfakes",
                "Browser extension for automated client-side image forensics",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/DeepFake-Detection-and-Prevention-A-Comprehensive-approach-using-AI-main",
            image: "/assets/projects/deepshield.webp",
            category: "Computer Vision & AI Security",
            roles: ["ml", "fullstack"],
            extended: {
                problemStatement:
                    "Deepfake generation technologies have rapidly commodified, creating synthetic media that readily deceives humans. Traditional CNN detectors rely heavily on local spatial convolutions that break down when images are processed by social media compression algorithms.",
                constraints: {
                    timeline: "Independent Academic & Engineering Project",
                    team: "Solo Developer",
                    techStack: "PyTorch, Vision Transformer, OpenCV, FastAPI, Next.js",
                },
                solution:
                    "Developed a forensic pipeline that decouples compression analysis from classification. Images undergo ELA and DCT frequency transformation to reveal compression inconsistencies invisible to the naked eye. These representations are fed into a fine-tuned Vision Transformer to evaluate global patch coherence. Grad-CAM visual heatmaps provide explainable diagnostic evidence.",
                tradeoffs:
                    "Vision Transformers have higher memory requirements and longer inference times than lightweight CNNs, but their self-attention mechanism across non-adjacent facial patches provides superior resistance to compression laundering. Decoupled Grad-CAM generation to run asynchronously to maintain API responsiveness.",
                impact:
                    "Achieved strong validation accuracy on controlled synthetic GAN holdout test sets under simulated compression. Highlighted the crucial distinction between experimental test-set accuracy and open-world reliability, emphasizing explainable Grad-CAM review over unverified single-score trust.",
            },
        },
        {
            id: "dermajourney",
            title: "DermaJourney — Longitudinal Dermatology AI Research",
            description:
                "A research-oriented multi-modal framework exploring longitudinal decision support for chronic dermatological conditions, combining clinical NLP for patient symptom timelines with sequential dermoscopic feature tracking.",
            problemStatement:
                "Chronic dermatological disorders require continuous tracking over months, yet existing AI diagnostic tools operate as isolated, single-point image classifiers that ignore temporal disease progression and patient clinical histories.",
            contribution:
                "Research Lead: Conceptualized the multi-modal longitudinal decision support framework, defined clinical NLP symptom timeline schemas, and designed the sequential lesion tracking workflow.",
            status: "Conceptual Research & Architecture Study · In Progress",
            techStack: ["Healthcare AI", "Clinical NLP", "Computer Vision", "Multi-Modal AI", "PyTorch", "Python"],
            features: [
                "Longitudinal decision support framework tracking lesion changes across sequential clinic visits",
                "Clinical NLP feature schema extracting structured symptom chronologies from unstructured patient notes",
                "Comparative image alignment framework highlighting morphological changes (border, asymmetry, color shifts)",
                "Responsible medical research framework strictly designated for clinical decision support without autonomous diagnostic claims",
                "Privacy-centric architecture keeping all patient data anonymized and research-confined",
            ],
            implementedFeatures: [
                "Longitudinal data schema modeling chronic skin condition progression",
                "Clinical NLP text extractor mapping symptom timelines (erythema, pruritus, scaling)",
                "Dermoscopic feature delta framework calculating change metrics between check-ins",
            ],
            plannedFeatures: [
                "Transformer-based temporal lesion tracking model validated on open clinical datasets (ISIC Archive)",
                "Integration with FHIR healthcare interoperability data standards",
                "Clinician-in-the-loop review interface with uncertainty estimation",
            ],
            link: "#",
            github: "https://github.com/snehadpatel",
            image: "/assets/projects/dermajourney.webp",
            category: "Healthcare AI Research",
            roles: ["ml"],
            extended: {
                problemStatement:
                    "Most dermatology AI benchmarks evaluate static, single-snapshot dermoscopic images. In clinical practice, dermatologists rely critically on longitudinal context: has the lesion grown over six months, changed color, or accompanied new symptoms like bleeding or pruritus?",
                constraints: {
                    timeline: "Ongoing Academic & Research Concept Study",
                    team: "Independent Research Lead",
                    techStack: "PyTorch, Clinical NLP, Multi-Modal Vision, Python",
                },
                solution:
                    "Formulated DermaJourney as a longitudinal decision support methodology. The system models patient cases as temporal sequences, linking clinical text narratives with aligned dermoscopic photographs to compute delta features that highlight meaningful clinical shifts over time.",
                tradeoffs:
                    "Prioritized interpretability and clinician-in-the-loop decision support over black-box automated triage. The architecture presents evidence, change metrics, and uncertainty bounds rather than arbitrary certainty scores.",
                impact:
                    "Established a rigorous methodological framework for longitudinal healthcare AI evaluation. Framed responsibly as an academic research concept requiring controlled clinical trials before any real-world healthcare deployment.",
            },
        },
        {
            id: "suicide-prediction",
            title: "Crisis Context Mapper — NLP Behavioral Risk Modeling",
            description:
                "An exploratory machine learning and graph data science project built during my CSRBOX internship, analyzing 101,110 textual records to model distress sentiment patterns and map relational context paths using Neo4j.",
            problemStatement:
                "Traditional bag-of-words text classifiers evaluate crisis statements in isolation, ignoring temporal behavioral transitions and contextual relationship chains critical for understanding distress patterns.",
            contribution:
                "Data Specialist Intern (CSRBOX): Cleaned and preprocessed 101,110 textual records, engineered linguistic features, trained Scikit-Learn classification baselines, and modeled entity-relationship schemas in Neo4j.",
            status: "Internship Research & Evaluation Project · 101,110 Records Analyzed",
            techStack: ["Python", "Scikit-Learn", "Neo4j", "Cypher", "NLP", "Pandas", "TF-IDF"],
            features: [
                "Comprehensive preprocessing and feature engineering on a benchmark dataset of 101,110 text entries",
                "Comparative evaluation of multiple classification models (Logistic Regression, Random Forest, Gradient Boosting)",
                "Neo4j graph database schema mapping relationships between statement IDs, sentiment markers, and distress tokens",
                "Cypher queries enabling researchers to trace relational context pathways across conversational statements",
                "Responsible educational framing highlighting dataset limitations and clinical non-certification",
            ],
            implementedFeatures: [
                "NLP pipeline with custom tokenization, stopword removal, and TF-IDF vectorization",
                "Sentiment polarity and subjectivity extraction using Python NLP libraries",
                "Neo4j graph data model with Cypher queries for relationship exploration",
                "Scikit-Learn baseline and ensemble classifier benchmarking",
            ],
            plannedFeatures: [
                "Fine-tuned clinical BERT embeddings for contextual semantic representation",
                "Temporal graph networks modeling conversational sentiment trajectories",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/Sucide-prediction",
            image: "/assets/projects/suicide.webp",
            category: "NLP & Graph Data Science",
            roles: ["ml", "data"],
            extended: {
                problemStatement:
                    "Textual crisis evaluation often suffers from false-positive keyword triggers when algorithms lack contextual understanding of temporal distress patterns and linguistic nuance.",
                constraints: {
                    timeline: "10-Week Internship Research Scope (CSRBOX)",
                    team: "Data Specialist Intern",
                    techStack: "Python, Scikit-Learn, Neo4j, Cypher, NLP, Pandas",
                },
                solution:
                    "Cleaned and analyzed 101,110 text records. Beyond training standard Scikit-Learn classifiers, I designed a Neo4j Graph Database schema where statements, anxiety tokens, and sentiment indicators are modeled as interconnected nodes, enabling Cypher graph queries to inspect relationship chains.",
                tradeoffs:
                    "Opted for a graph-relational hybrid workflow over pure end-to-end deep learning. Graph traversal provided human-interpretable relationship paths that allowed team mentors to audit why specific statements were linked to elevated risk indicators.",
                impact:
                    "Successfully processed 101,110 records and demonstrated that graph-augmented relational mapping provides richer contextual insight than isolated keyword matching. Documented strictly as an exploratory data science project, not a clinically deployed crisis response system.",
            },
        },
        {
            id: "vegetable-classifier",
            title: "Local Crop Classifier — Edge CNN Architecture Study",
            description:
                "An agricultural computer vision study benchmarking six convolutional neural network architectures on a locally captured dataset of 1,200+ regional vegetable images under realistic wholesale market lighting.",
            problemStatement:
                "Computer vision models trained on clean laboratory datasets experience severe performance degradation when exposed to real-world farm and market conditions with harsh shadows, occlusions, and variable lighting.",
            contribution:
                "Solo Developer & Researcher: Curated and labeled 1,200+ regional crop photos (Karela, Parwal, etc.), implemented OpenCV background segmentation, trained six CNN variants in PyTorch, and built a Flask evaluation UI.",
            status: "Completed Research Study · 1,200+ Regional Images",
            techStack: ["PyTorch", "ResNet18", "MobileNet", "OpenCV", "Flask", "Python"],
            features: [
                "Curated custom dataset of 1,200+ high-resolution photographs under variable outdoor and wholesale market lighting",
                "Comparative benchmark across 6 network designs, evaluating accuracy, parameter footprint, and CPU latency",
                "OpenCV preprocessing pipeline with HSV color segmentation and adaptive background isolation",
                "Lightweight Flask web interface for real-time model validation and latency profiling",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/Local-Vegetable-Variety-Classifier",
            image: "/assets/projects/veg.webp",
            category: "Computer Vision & Edge AI",
            roles: ["ml"],
            extended: {
                problemStatement:
                    "Automated produce sorting in regional agricultural hubs requires models that run on low-power edge hardware without failing under fluctuating ambient lighting.",
                constraints: {
                    timeline: "Academic Computer Vision Study",
                    team: "Solo Developer",
                    techStack: "PyTorch, OpenCV, Flask, Python",
                },
                solution:
                    "Captured and normalized 1,200+ vegetable photos under multiple real-world lighting conditions. Benchmarked lightweight depthwise-separable architectures against heavier residual models to pinpoint the optimal Pareto frontier between classification accuracy and edge inference latency.",
                tradeoffs:
                    "Traded absolute top-1 laboratory accuracy for robust generalization across variable illumination through aggressive affine data augmentation and color-jitter transforms.",
                impact:
                    "Demonstrated viable edge classification performance on regional produce varieties, establishing reproducible guidelines for low-cost agricultural sorting prototypes.",
            },
        },
        {
            id: "supplier-ranking",
            title: "Logistics Supplier Ranker — Multi-Variable Decision Intelligence",
            description:
                "A decision intelligence model built during a hackathon to evaluate and rank cargo carriers based on defect ratios, delivery timelines, and logistics costs, earning a personal commendation from the CEO of Mesh Works.",
            problemStatement:
                "Logistics managers often rely on static spreadsheets that fail to dynamically synthesize sparse operational metrics into an interpretable risk scorecard.",
            contribution:
                "Solo Hackathon Developer: Built the data cleaning pipeline in Pandas, trained multivariable regression models, and deployed a Streamlit dashboard for dynamic carrier scoring.",
            status: "Completed Hackathon Project · CEO Commendation",
            techStack: ["Python", "Scikit-Learn", "Regression", "Pandas", "Streamlit"],
            features: [
                "Engineered multivariable regression model weighting late shipments, defect rates, and freight expense",
                "Robust automated data cleaning pipeline handling missing and sparse logistics logs",
                "Streamlit interactive dashboard visualizing supplier risk tiers and outlier carriers",
                "Earned personal commendation from the CEO of Mesh Works for ranking methodology and practical utility",
            ],
            link: "#",
            github: "",
            image: "/assets/projects/supplier.webp",
            category: "Data Science & Decision Intelligence",
            roles: ["data", "ml"],
            extended: {
                problemStatement:
                    "Supply chain operators lack automated tools to dynamically weigh shipment defects, delays, and cost deviations into transparent supplier reliability scores.",
                constraints: {
                    timeline: "48-Hour Hackathon Sprint",
                    team: "Solo Developer",
                    techStack: "Python, Scikit-Learn, Pandas, Streamlit",
                },
                solution:
                    "Developed an automated risk profiling tool using Pandas and Scikit-Learn. The system ingests shipment telemetry, computes normalized risk coefficients, and outputs an interactive supplier scorecard.",
                tradeoffs:
                    "Selected an interpretable multivariable regression approach over black-box deep learning, ensuring supply chain operators could clearly audit the exact factors driving supplier scores.",
                impact:
                    "Accurately flagged anomalous carriers during evaluation and received personal commendation from the CEO of Mesh Works during project presentation.",
            },
        },
    ],
    research: [
        {
            id: "greensort-sustainx-2026",
            title: "GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation, Hazard Detection, and Route Optimization",
            authors: ["Hetvi Sheth", "Parisha Parmar", "Sneha Patel"],
            guide: "Prof. Gaurav Kumar Gaharwar, Assistant Professor, CSE, Navrachana University",
            area: "IoT & Deep Learning / Edge AI for Smart Cities",
            venue: "SustainX 2026 (Navrachana University)",
            status: "Presented / Accepted",
            abstract:
                "Municipal solid waste (MSW) generation is projected to reach 3.4 billion tonnes annually by 2050. Existing smart bin deployments focus almost exclusively on fill-level monitoring, leaving waste classification, weight-based density anomaly detection, and hazardous gas monitoring largely unaddressed. GreenSort is a prototype Smart Waste Management System (SWMS) designed for municipal deployment. An Arduino Uno multi-sensor array feeds a Raspberry Pi running a custom-trained ResNet classifier fine-tuned via transfer learning, achieving 90 mAP at 1.7s edge inference latency on CPU. Telemetry and classification tags stream via MQTT to a Supabase cloud database, driving dynamic route optimization and citizen overflow reporting. Total prototype cost: approximately ₹5,000.",
            paperUrl: "/assets/GreenSort_ResearchPaper_SustainX2026.docx",
            projectId: "greensort",
            highlights: [
                "Custom ResNet edge classifier achieving 90 mAP across 4 waste classes",
                "Edge inference latency of 1.7s on Raspberry Pi CPU hardware",
                "Integrated 6 sensors including ultrasonic (MAE 3.2%) and load cell (MAE 2.8%)",
                "Classification-aware dynamic route optimization for municipal trucks",
                "All 8 prototype test cases validated successfully",
            ],
        },
        {
            id: "dermajourney-research",
            title: "DermaJourney: Multi-Modal Longitudinal Decision Support Architecture for Chronic Dermatological Care",
            authors: ["Sneha Patel"],
            area: "Healthcare AI / Multi-Modal Decision Support & Clinical NLP",
            venue: "Undergraduate Academic Research Proposal",
            status: "Ongoing Research",
            abstract:
                "Investigates a multi-modal decision support framework for chronic dermatological conditions. Unlike conventional single-snapshot classifiers, DermaJourney explores sequential lesion feature delta tracking coupled with clinical NLP extraction from patient-reported symptom chronologies. Focuses on clinician-in-the-loop decision support with transparent uncertainty bounds, framed strictly as academic methodology research without unverified diagnostic claims.",
            projectId: "dermajourney",
            highlights: [
                "Longitudinal lesion change tracking framework across clinic visits",
                "Clinical NLP feature schema for patient symptom chronologies",
                "Clinician-in-the-loop decision support methodology",
                "Rigorous academic scope without unsubstantiated clinical deployment claims",
            ],
        },
    ],
    services: [
        {
            id: "ai-systems",
            title: "AI Systems & Applied Machine Learning",
            description: "Designing, training, and deploying practical machine learning models tailored for real-world products and workflows.",
            details: [
                "Custom classification and regression architectures using PyTorch and Scikit-Learn",
                "Transfer learning and fine-tuning convolutional networks and Vision Transformers",
                "Rigorous model evaluation, validation metrics, and confusion matrix profiling",
                "Decision intelligence ranking algorithms with explainable feature weights",
            ],
            icon: "Brain",
        },
        {
            id: "agentic-rag",
            title: "Agentic AI & LLM Integration",
            description: "Developing intelligent conversational agents, knowledge-grounded RAG pipelines, and prompt orchestration engines.",
            details: [
                "Retrieval-Augmented Generation (RAG) referencing domain-specific documentation",
                "Prompt engineering and contextual reasoning pipelines with structured outputs",
                "Multi-agent task decomposition and asynchronous tool calling workflows",
                "FastAPI microservice endpoints connecting LLM reasoning to frontend apps",
            ],
            icon: "Layers",
        },
        {
            id: "computer-vision",
            title: "Computer Vision & Digital Forensics",
            description: "Computer vision pipelines for object detection, produce sorting, explainable AI, and forensic image analysis.",
            details: [
                "Edge object detection and classification using YOLOv8 and ResNet architectures",
                "Digital forensics feature extraction using Error Level Analysis (ELA) and DCT frequency analysis",
                "Explainable AI visualization using Grad-CAM attention heatmaps",
                "OpenCV image preprocessing, color segmentation, and background isolation",
            ],
            icon: "Eye",
        },
        {
            id: "iot-edge",
            title: "IoT Prototyping & Edge Hardware",
            description: "End-to-end hardware prototypes connecting microcontrollers, sensor telemetry, and on-device edge inference.",
            details: [
                "Raspberry Pi & Arduino Uno dual-architecture firmware and UART serial bridges",
                "Sensor integration (ultrasonic, PIR presence, MQ gas, DHT environmental sensors)",
                "Actuator and servo motor calibration for automated physical mechanisms",
                "Lightweight edge inference and MQTT cloud telemetry transmission",
            ],
            icon: "Cpu",
        },
    ],
    certifications: [
        {
            id: "neo4j-pro",
            title: "Neo4j Certified Professional",
            issuer: "Neo4j GraphAcademy",
            date: "2024",
            credentialId: "NEO4J-CERTIFIED-PRO",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Graph Databases", "Neo4j", "Cypher Query Language", "Graph Data Modeling"],
            category: "graph",
        },
        {
            id: "aws-ml",
            title: "AWS Academy Graduate — AWS Academy Machine Learning Foundations",
            issuer: "Amazon Web Services (AWS)",
            date: "2024",
            credentialId: "AWS-ML-FOUNDATIONS",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Machine Learning", "Cloud Computing", "Python", "AWS Cloud ML"],
            category: "cloud",
        },
        {
            id: "gcp-data",
            title: "Google Cloud Academy — Becoming a Google Cloud Data Engineer",
            issuer: "Google Cloud (GCP)",
            date: "2024",
            credentialId: "GCP-DATA-ENGINEER",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Data Engineering", "BigQuery", "GCP", "SQL Pipelines"],
            category: "cloud",
        },
        {
            id: "ibm-analytics",
            title: "Data Analysis using Python & IBM Analytics",
            issuer: "IBM SkillsBuild",
            date: "2023",
            credentialId: "IBM-DATA-ANALYTICS",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Data Analysis", "Python", "Pandas", "Data Visualization"],
            category: "analytics",
        },
        {
            id: "cisco-iot",
            title: "Introduction to IoT & Cybersecurity",
            issuer: "Cisco Networking Academy",
            date: "2023",
            credentialId: "CISCO-IOT-CYBER",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["IoT Systems", "Cybersecurity Basics", "Networking", "Sensor Hardware"],
            category: "iot",
        },
    ],
    achievements: [
        {
            id: "tetrathon-2026",
            title: "6th Rank out of 160 Teams — TetraTHON 2026",
            desc: "Team 'Twin Tech Girls' secured 6th Rank at TetraTHON 2026 — an Indo-French AI Innovation Hackathon hosted at Navrachana University in partnership with ISEN Méditerranée, France. Co-created Arcanum AI, leading the AI/ML pipeline and backend technical architecture.",
            category: "hackathon",
            date: "2026",
            certificateUrl: "/assets/tetrathon_certificate.jpg",
        },
        {
            id: "greensort-publication",
            title: "Research Paper (Co-Author) — SustainX 2026",
            desc: "Co-authored 'GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation' presenting a validated edge-AI smart bin prototype with ResNet achieving 90 mAP at 1.7s latency.",
            category: "academic",
            date: "2026",
        },
        {
            id: "diploma-topper",
            title: "Academic Distinction — 9.42 CGPA / SPI 10.0 Topper",
            desc: "Graduated Diploma in Computer Engineering with academic distinction, securing a 9.42 CGPA and a perfect SPI 10.0 in the final semester at Govt. Polytechnic for Girls, Ahmedabad.",
            category: "academic",
            date: "2024",
        },
        {
            id: "wsro-nationals",
            title: "WSRO Nationals Robot Race Competitor",
            desc: "Represented the institution in national-level robotics championship, designing and programming an autonomous high-speed tracking robot using C++ and Arduino.",
            category: "robotics",
            date: "2023",
        },
        {
            id: "hackathon-commendation",
            title: "CEO Hackathon Commendation (Mesh Works)",
            desc: "Designed and built an AI Supplier Ranking Agent that analyzes defect rates, late deliveries, and cost metrics. Received a personal commendation from the CEO of Mesh Works.",
            category: "hackathon",
            date: "2024",
        },
    ],
};
