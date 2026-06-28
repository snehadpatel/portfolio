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
    conference: string;
    abstract: string;
    paperUrl: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    features: string[];
    link: string;
    github: string;
    image: string;
    category: string;
    roles: ("ml" | "data" | "iot" | "fullstack")[];
    extended?: ExtendedDetails;
    publication?: PublicationDetails;
}

export interface SkillSet {
    languages: string[];
    frameworks: string[];
    tools: string[];
    core: string[];
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    description: string;
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
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
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
}

export const DATA: DataType = {
    profile: {
        name: "Sneha Patel",
        tagline: "Engineering AI systems that bridge vision, data, and IoT.",
        summary:
            "A B.Tech Computer Science & Engineering student at Navrachana University specializing in Computer Vision, Machine Learning, and IoT Systems. Experienced in building robust AI tools like DeepShield AI (97.5% accuracy), designing edge waste sorting solutions, and running data-specialist pipelines. Certified in AWS, GCP, and Neo4j.",
        email: "sneha.dpatel@outlook.com",
        linkedin: "https://www.linkedin.com/in/sneha-patel-a0ba14212/",
        github: "https://github.com/snehadpatel",
        resumeUrl: "/assets/resume.pdf",
        certificationsUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
    },
    education: [
        {
            institution: "Navrachana University, Vadodara",
            degree: "B.Tech in Computer Science Engineering",
            period: "Jul 2024 - May 2027",
            coursework: "Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning Foundations, Computer Vision, IoT Systems, Software Engineering.",
        },
        {
            institution: "Govt. Polytechnic for Girls, Ahmedabad",
            degree: "Diploma in Computer Engineering",
            period: "Sep 2021 - 2024",
            coursework: "Computer Programming, Database Systems, Computer Networks, Operating Systems. Graduated with 9.42 CGPA and SPI 10 in the final semester.",
        }
    ],
    skills: {
        languages: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
        frameworks: ["Next.js", "FastAPI", "Flask", "React", "Node.js", "Express", "Tailwind CSS"],
        tools: ["PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "YOLO", "Neo4j", "MongoDB", "MySQL", "Docker", "Git", "Arduino", "Raspberry Pi"],
        core: [
            "Computer Vision & NLP",
            "Machine Learning Systems",
            "IoT & Embedded Hardware",
            "Database Design & Graphs",
            "Software & Web Architecture",
            "Data Analysis & Visualization",
        ],
    },
    experience: [
        {
            role: "Data Specialist - Internship",
            company: "CSRBOX",
            period: "Jan 2024 - Mar 2024",
            description:
                "Built an NLP-based Machine Learning classification model to predict suicide risk levels from behavioral and sentiment data. Integrated Neo4j graph databases to map relationships and discover hidden connections in data, significantly enhancing model pattern detection.",
        },
        {
            role: "Machine Learning Intern",
            company: "Brainy Beam Technologies, Ahmedabad",
            period: "Jun 2023 - Aug 2023",
            description:
                "Developed a personalized car recommendation engine using predictive analytics, user preference scoring, and feature engineering. Built and deployed the system to recommend optimal vehicles to customers and documented system analytics.",
        },
    ],
    projects: [
        {
            id: "deepshield",
            title: "DeepShield AI Forensics",
            description:
                "A visual forensics pipeline I built to extract ELA and DCT compression artifacts, combined with a Vision Transformer to detect deepfakes. Includes an FGSM noise immunization mechanism.",
            techStack: ["PyTorch", "FastAPI", "Next.js", "OpenCV", "ViT", "FGSM"],
            features: [
                "Combined custom digital forensics algorithms (ELA, DCT frequency) with a pre-trained Vision Transformer (ViT-Base-16) model",
                "Built custom Grad-CAM visualization hooks to output pixel heatmaps of flagged anomaly areas",
                "Designed a dual-pass verification system to verify fakes that easily bypass standard CNN model boundaries",
                "Implemented a prototype FGSM noise-injector script to immunize original photos before web upload",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/DeepFake-Detection-and-Prevention-A-Comprehensive-approach-using-AI-main",
            image: "/assets/projects/deepshield.jpg",
            category: "Computer Vision",
            roles: ["ml", "fullstack"],
            extended: {
                problemStatement: "Current deepfake detectors rely heavily on spatial convolutions, making them highly vulnerable to simple post-processing attacks like JPEG compression, resizing, or minor noise additions. I needed a system that could detect fakes even after they'd been laundered through social media compressions.",
                constraints: {
                    timeline: "12 Weeks",
                    team: "Solo Developer",
                    techStack: "PyTorch, FastAPI, Next.js",
                },
                solution: "I built a dual-pipeline forensic engine. It first extracts Error Level Analysis (ELA) and high-frequency Discrete Cosine Transform (DCT) artifacts, isolating compression discrepancies. It then feeds these artifacts into a Vision Transformer (ViT-Base-16) to classify the image. I also integrated an FGSM adversarial noise injection pipeline to pre-emptively immunize photos against facial cloning.",
                tradeoffs: "I opted for a Vision Transformer over standard CNNs (like ResNet) because ViTs capture global context better, despite the tradeoff of higher inference latency and memory requirements. I decoupled the Grad-CAM generation to run asynchronously to keep the main classification thread fast.",
                impact: "Achieved a 97.5% classification accuracy on unseen, highly compressed GAN holdout sets. Reduced false-positive rates on heavily artifacted social media images by 34% compared to standard spatial detectors."
            }
        },
        {
            id: "vegetable-classifier",
            title: "Local Crop Classifier Study",
            description:
                "An agricultural computer vision study comparing six CNN architectures trained on locally captured vegetable datasets to optimize resource-constrained edge deployments.",
            techStack: ["PyTorch", "ResNet18", "Flask", "OpenCV", "Python"],
            features: [
                "Manually captured and preprocessed over 1,200 photos of regional vegetables (Karela, Parwal) in varying wholesale market lighting conditions",
                "Evaluated accuracy and hardware latency trade-offs across 6 networks, including depthwise-separable designs",
                "Wrote custom OpenCV filters to perform automatic background isolation and HSV color segmentation",
                "Configured a Flask web interface to test real-time validation speeds and latency metrics",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/Local-Vegetable-Variety-Classifier",
            image: "/assets/projects/veg.jpg",
            category: "Deep Learning",
            roles: ["ml"],
            extended: {
                problemStatement: "Agricultural deep learning models trained on perfect, uniform datasets fail catastrophically in real-world farm conditions where lighting, shadows, and occlusions are highly unpredictable.",
                constraints: {
                    timeline: "8 Weeks",
                    team: "Solo Developer",
                    techStack: "PyTorch, OpenCV, Flask",
                },
                solution: "I manually captured and preprocessed 1,200+ photos of regional vegetables under varying wholesale market lighting conditions. I then compared six different convolutional network designs, evaluating lightweight depthwise-separable designs against heavier ResNet configurations. To ensure robustness, I built an OpenCV-based background segmenter and class-balancing filter to isolate organic structures in real-time.",
                tradeoffs: "I traded absolute top-1 accuracy on pristine images for robust performance on noisy images by employing synthetic minority oversampling (SMOTE) and aggressive affine transformations. I chose depthwise-separable convolutions to guarantee the model could run on low-end hardware, even though it meant sacrificing some edge-case detection capabilities.",
                impact: "Identified optimal network parameters that achieved 92% real-world accuracy while reducing inference latency by 45% compared to default ResNet configurations, making it viable for low-cost edge deployments."
            }
        },
        {
            id: "greensort",
            title: "Greensort: IoT Waste Sorter",
            description:
                "An edge-AI hardware prototype running a quantized YOLOv8 model on a Raspberry Pi 4, communicating sorting signals to an Arduino-driven mechanical flap.",
            techStack: ["YOLO", "OpenCV", "Python", "Raspberry Pi", "Arduino"],
            features: [
                "Programmed serial communication (Serial over USB) to link the Raspberry Pi 4 vision unit with the Arduino Uno motor controller",
                "Quantized YOLOv8 weights to INT8 to run at 12fps inference speed directly on local edge hardware cores",
                "Designed and calibrated a mechanical sorting gate powered by a high-torque MG996R servo motor",
                "Integrated HC-SR04 ultrasonic distance sensors to monitor bin capacities and send telemetry alerts",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/greensort",
            image: "/assets/projects/waste.jpg",
            category: "IoT & Computer Vision",
            roles: ["iot", "ml"],
            extended: {
                problemStatement: "Traditional waste sorting is manual, slow, and unhygienic. Existing smart bins often rely on cloud APIs, making them useless in areas with poor connectivity and introducing unacceptable latency for physical sorting.",
                constraints: {
                    timeline: "6 Weeks",
                    team: "Hardware + Software (Solo)",
                    techStack: "Raspberry Pi, Arduino, YOLOv8",
                },
                solution: "I engineered a self-coordinating hardware and AI prototype designed to classify and sort garbage at the point of disposal completely offline. A Raspberry Pi runs a highly quantized YOLOv8 model, processing frames in <80ms. It communicates sorting decisions to an Arduino Uno over a USB Serial link, driving physical servo flaps to segregate recyclables, organic matter, and hazardous items.",
                tradeoffs: "I heavily quantized the YOLOv8 weights to INT8. This caused a ~4% drop in absolute precision but was the only way to achieve the required 12fps inference speed directly on the local Raspberry Pi cores without thermal throttling.",
                impact: "Successfully sorted local plastic and organic waste samples in real-time with a total loop latency (camera capture to physical flap movement) of under 180ms."
            },
            publication: {
                title: "GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation, Hazard Detection, and Route Optimization",
                authors: ["Hetvi Sheth", "Parisha Parmar", "Sneha Patel"],
                conference: "SustainX 2026",
                abstract: "Municipal solid waste (MSW) generation is projected to reach 3.4 billion tones annually by 2050, with Indian cities disproportionately affected due to rapid urbanization and infrastructure gaps. Existing smart bin deployments focus almost exclusively on fill-level monitoring using ultrasonic sensors, leaving waste classification, weight-based density anomaly detection, and hazardous gas monitoring largely unaddressed. Academic deep learning classifiers, while achieving high accuracy on benchmark datasets, have rarely been integrated into live IoT pipelines capable of edge inference on commodity hardware. This paper presents GreenSort, a prototype Smart Waste Management System (SWMS) designed for the Vadodara Municipal Corporation (VMC) that addresses all three gaps. A multi-sensor Arduino Uno-controlled smart bin feeds data to a Raspberry Pi running a custom-trained ResNet classifier fine-tuned via transfer learning on a four-class waste dataset achieving 90 mean Average Precision (mAP) at under 2 seconds inference latency. Sensor telemetry and classification outputs are transmitted via MQTT to a Supabase cloud backend, driving a VMC Web Dashboard with dynamic route optimisation and a Citizen Reporting Android application. All eight end-to-end test cases have passed. Total prototype cost: approximately ₹5,000, making this a financially viable model for smart city MSW infrastructure aligned with SDG 11 and SDG 12.",
                paperUrl: "/assets/GreenSort_ResearchPaper_SustainX2026.docx"
            }
        },
        {
            id: "supplier-ranking",
            title: "Logistics Supplier Ranker",
            description:
                "A multi-variable regression model built during a hackathon to score and rank cargo providers based on defect rates, costs, and late deliveries.",
            techStack: ["Python", "Scikit-Learn", "Regression Models", "Pandas"],
            features: [
                "Fitted a custom multi-variable regression algorithm weighting late-deliveries, defect logs, and cost metrics",
                "Designed a data validation and cleansing pipeline to ingest sparse logistical records using pandas",
                "Built an analytical prototype dashboard in Streamlit to visualize ratings and flag outlier suppliers",
                "Earned direct commendation from the CEO of Mesh Works during the hackathon presentation for ranking accuracy",
            ],
            link: "#",
            github: "",
            image: "/assets/projects/supplier.jpg",
            category: "Data Analytics",
            roles: ["data", "ml"],
            extended: {
                problemStatement: "Logistics networks struggle to dynamically evaluate and rank cargo providers, often relying on static, outdated spreadsheets that fail to capture real-time risks like defect ratios and late deliveries.",
                constraints: {
                    timeline: "48 Hours (Hackathon)",
                    team: "Solo Developer",
                    techStack: "Python, Scikit-Learn, Streamlit",
                },
                solution: "I constructed a decision intelligence agent that automates risk profiling. By ingesting sparse logistical records using Pandas, the system fits a customized multi-variable regression model weighting late-deliveries, defect logs, and cost metrics to score each provider. I visualized the anomalies in a Streamlit prototype.",
                tradeoffs: "Due to the 48-hour constraint, I prioritized a robust data cleaning pipeline and a fast, interpretable multi-variable regression model over a complex, black-box deep learning approach. Transparency was critical for the judges to understand the scoring.",
                impact: "The regression coefficients successfully highlighted anomalous suppliers, earning direct commendation from the CEO of Mesh Works during the hackathon presentation for its immediate practical applicability."
            }
        },
        {
            id: "suicide-prediction",
            title: "NLP Crisis Context Mapper",
            description:
                "An NLP crisis evaluation tool built during my CSRBOX internship that maps behavioral text statements and triggers into a Neo4j graph database.",
            techStack: ["Python", "Scikit-Learn", "Neo4j", "NLP", "Pandas"],
            features: [
                "Wrote text preprocessing scripts utilizing TF-IDF, tokenizers, and sentiment analyzers in Python",
                "Designed a Neo4j graph schema to link nodes representing patient IDs, sentiment scores, and distress tokens",
                "Trained a Scikit-Learn ensemble model to categorize statements into clinical risk brackets",
                "Wrote Cypher queries to help evaluators trace chronological context pathways instead of isolated keywords",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/Sucide-prediction",
            image: "/assets/projects/suicide.jpg",
            category: "Machine Learning & NLP",
            roles: ["ml", "data"],
            extended: {
                problemStatement: "Traditional text classification models evaluate crisis statements in a vacuum, focusing on isolated keywords rather than the temporal behavioral changes and context paths critical for clinical risk assessment.",
                constraints: {
                    timeline: "10 Weeks (Internship)",
                    team: "Data Specialist Intern",
                    techStack: "Neo4j, Python, Scikit-Learn, NLP",
                },
                solution: "I developed an NLP engine that predicts crisis risk levels from user statements. Instead of just using TF-IDF vectors, I utilized a Neo4j Graph Database to map connections between emotional states, anxiety triggers, and temporal behavioral changes. A Scikit-Learn ensemble model categorizes the statements into clinical risk brackets.",
                tradeoffs: "I traded the simple setup of a relational database for the steeper learning curve of Neo4j. The graph architecture was necessary because tracking the relationship pathways between distress tokens proved far more predictive than their isolated frequencies.",
                impact: "Enabled clinical evaluators to trace chronological context pathways, significantly enhancing pattern detection and reducing false-positive risk alerts by providing graph-backed contextual evidence for every prediction."
            }
        }
    ],
    services: [
        {
            id: "computer-vision",
            title: "Computer Vision & Visual Forensics",
            description: "Custom deep learning pipelines for image classification, target detection, and digital forensics.",
            details: [
                "Fine-grained image classification models (ResNet, MobileNet, custom CNNs)",
                "Explainable AI integration using Grad-CAM attention heatmaps",
                "Digital image forensics (Error Level Analysis ELA, high-frequency DCT GAN analysis)",
                "Adversarial protection techniques (FGSM noise mapping)"
            ],
            icon: "Eye"
        },
        {
            id: "ml-nlp",
            title: "Machine Learning & Natural Language Processing",
            description: "Advanced classification, recommendation systems, and semantic text analysis to drive business logic.",
            details: [
                "Personalized recommendation engines based on user profiles & preferences",
                "Text pattern & behavioral sentiment analytics models",
                "Advanced regression-based automated ranking tools",
                "Graph databases (Neo4j, Cypher) to reveal hidden insights in relational data"
            ],
            icon: "Brain"
        },
        {
            id: "iot-edge",
            title: "IoT & Hardware Automation",
            description: "Physical prototypes integrating embedded devices, sensors, and actuators with intelligence at the edge.",
            details: [
                "Raspberry Pi & Arduino firmware development",
                "Edge ML models optimized for low-resource processors via TensorFlow Lite",
                "Sensor integrations (ultrasonic, PIR, telemetry feeds)",
                "Actuator coordination (servos, mechanical switches, relays)"
            ],
            icon: "Cpu"
        },
        {
            id: "data-engineering",
            title: "Data Specialist Consultations",
            description: "End-to-end data pipeline setups for collecting, cleaning, and formatting large datasets for analytical platforms.",
            details: [
                "Robust web-scraping agents with delay mapping to respect rules",
                "Structured DataFrame processing and cleaning pipelines",
                "API design & deployment using FastAPI, Streamlit, and Flask",
                "Data extraction, enrichment, and verification checks"
            ],
            icon: "Database"
        }
    ],
    certifications: [
        {
            id: "aws-ml",
            title: "AWS Academy Graduate - AWS Academy Machine Learning Foundations",
            issuer: "Amazon Web Services (AWS)",
            date: "2024",
            credentialId: "AWS-ML-FOUNDATIONS",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Machine Learning", "Python", "Cloud Computing", "AWS"],
            category: "cloud"
        },
        {
            id: "gcp-data",
            title: "Google Cloud Academy - Becoming a Google Cloud Data Engineer",
            issuer: "Google Cloud (GCP)",
            date: "2024",
            credentialId: "GCP-DATA-ENGINEER",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Data Engineering", "BigQuery", "GCP", "SQL"],
            category: "cloud"
        },
        {
            id: "neo4j-pro",
            title: "Neo4j Certified Professional",
            issuer: "Neo4j Graph Academy",
            date: "2024",
            credentialId: "NEO4J-CERTIFIED-PRO",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Graph Databases", "Neo4j", "Cypher", "NoSQL"],
            category: "graph"
        },
        {
            id: "ibm-analytics",
            title: "Data Analysis using Python & IBM Analytics",
            issuer: "IBM",
            date: "2023",
            credentialId: "IBM-DATA-ANALYTICS",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["Data Analysis", "Python", "Pandas", "Data Visualization"],
            category: "analytics"
        },
        {
            id: "cisco-iot",
            title: "Introduction to IoT & Cybersecurity Professional",
            issuer: "Cisco Networking Academy",
            date: "2023",
            credentialId: "CISCO-IOT-CYBER",
            verificationUrl: "https://1drv.ms/f/c/03287c4bb4d61c65/IgBVZXa0HMbGQIVjxTOM8w3HAU2GLdZMWoUmkxXOEklYTmA?e=0zaAY6",
            skills: ["IoT", "Cybersecurity", "Networking", "Hardware"],
            category: "iot"
        }
    ],
    achievements: [
        {
            id: "greensort-publication",
            title: "Research Paper (Written) — SustainX 2026",
            desc: "Co-authored 'GreenSort: An Integrated IoT and Deep Learning System for Real-Time Municipal Solid Waste Segregation' presenting a prototype end-to-end edge-AI waste classifier.",
            category: "academic",
            date: "2026"
        },
        {
            id: "wsro-nationals",
            title: "WSRO Nationals Robot Race Competitor",
            desc: "Represented the institution in national-level robotics championship, designing and programming an autonomous high-speed tracking robot using C++ and Arduino.",
            category: "robotics",
            date: "2023"
        },
        {
            id: "hackathon-commendation",
            title: "CEO Hackathon Commendation (Mesh Works)",
            desc: "Designed and built an AI Supplier Ranking Agent that analyzes defect rates, late deliveries, and cost metrics. Received a personal commendation from the CEO of Mesh Works.",
            category: "hackathon",
            date: "2024"
        },
        {
            id: "diploma-topper",
            title: "Academic Distinction - 9.42 CGPA Topper",
            desc: "Graduated Diploma in Computer Engineering with academic distinction, securing a perfect SPI 10.0 in the final semester at Govt. Polytechnic for Girls, Ahmedabad.",
            category: "academic",
            date: "2024"
        }
    ]
};

