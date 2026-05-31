export interface ExtendedDetails {
    architecture: string;
    overview: string;
    challenges: string[];
    results: string;
    learnings: string;
    future: string;
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
    extended?: ExtendedDetails;
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

export interface DataType {
    profile: Profile;
    skills: SkillSet;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    services: Service[];
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
            extended: {
                architecture: "Web Upload (Next.js) -> FastAPI API -> Forensic Extraction (ELA & DCT) -> Ensemble Pipeline (ViT) -> Grad-CAM Heatmap Visualizer.",
                overview: "DeepShield AI combines traditional image forensic filters with advanced transformer neural networks to detect subtle face swaps that leave no obvious visual artifacts.",
                challenges: [
                    "Decoupled the expensive Grad-CAM calculations to run asynchronously from the main ViT classification model thread.",
                    "Configured high-frequency discrete cosine transform filters to normalize across varying JPG compression rates."
                ],
                results: "Achieved 97.5% classification accuracy on unseen holdout GAN sets.",
                learnings: "Deepened my understanding of JPEG compression vectors, adversarial noise attacks, and explainable AI pipelines.",
                future: "Package the system into a browser extension to allow active page-level deepfake audits."
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
            extended: {
                architecture: "Flask Web Form -> OpenCV Background Subtractor -> PyTorch ResNet18 -> Class Prediction Output.",
                overview: "A resource-focused classification study comparing Depthwise-Separable Convolutions and Global Average Pooling against transfer learning on specialized agricultural crops.",
                challenges: [
                    "Balanced highly seasonal datasets by applying synthetic minority oversampling (SMOTE) and custom affine transforms.",
                    "Mitigated camera noise and shadow occlusion under highly inconsistent market lighting conditions."
                ],
                results: "Identified optimal network parameters, achieving superior edge performance over default CNN layouts.",
                learnings: "Learned the mechanics of pooling layer impact, parameter reduction, and localized dataset balancing.",
                future: "Expand the network weights to run directly on mobile apps using ONNX runtimes."
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
            extended: {
                architecture: "Pi Camera -> Raspberry Pi (YOLO Model) -> Serial Port -> Arduino -> Servo Motors (Mechanical Flaps) -> Ultrasonic Level Sensors.",
                overview: "A physical smart bin sorting prototype that uses edge machine learning to automatically direct recyclables, organics, and hazardous waste into separate compartments.",
                challenges: [
                    "Quantized YOLO weights to fit within the Raspberry Pi's limited RAM budget while preserving detection thresholds.",
                    "Synchronized the timing of physical servo flap transitions with camera capture and model inference lag."
                ],
                results: "Successfully sorted local plastic and organic waste samples in real-time, under 180ms total loop latency.",
                learnings: "Gained hands-on experience with hardware serial protocols, mechanical timing constraints, and edge quantization.",
                future: "Design custom PCB mounts and integrate solar-powered lithium cells for standalone field deployment."
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
            github: "https://github.com/snehadpatel/proj",
            image: "/assets/projects/supplier.jpg",
            category: "Data Analytics",
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
    ]
};
