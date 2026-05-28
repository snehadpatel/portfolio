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
        resumeUrl: "/Sneha_Patel_Resume_v3.pdf",
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
            title: "DeepShield AI",
            description:
                "A hybrid deepfake detection and prevention web platform combining Vision Transformers (ViT) with JPEG ELA and frequency forensics.",
            techStack: ["PyTorch", "FastAPI", "Next.js", "OpenCV", "ViT", "FGSM"],
            features: [
                "Ensemble model combining Vision Transformers (ViT), Error Level Analysis (ELA), DCT frequency, and HSV color stats",
                "Reached 97.5% detection accuracy on unseen GAN-generated and real face datasets",
                "Generates explainable Grad-CAM heatmaps showing detected anomaly areas",
                "Applies FGSM-based adversarial noise protection to original photos to prevent deepfaking",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/DeepFake-Detection-and-Prevention-A-Comprehensive-approach-using-AI-main",
            image: "/assets/projects/deepshield.jpg",
            category: "Computer Vision",
            extended: {
                architecture: "Web Upload (Next.js) -> FastAPI API -> Forensic Extraction (ELA & DCT) -> Ensemble Pipeline (ViT) -> Grad-CAM Heatmap Visualizer.",
                overview: "DeepShield AI overcomes the weakness of single neural networks against custom post-processed fakes by ensembling standard Deep Learning models with digital signal processing forensics.",
                challenges: [
                    "Optimizing heavy ViT model weights for sub-second web inference latency.",
                    "Integrating Grad-CAM computations inside the FastAPI validation handler."
                ],
                results: "Reached 97.5% classification accuracy on unseen holdout sets.",
                learnings: "Deepened expertise in adversarial ML attacks, JPEG compression analysis, and explainable AI.",
                future: "Build a Chrome extension for active image security and expand detection to video frames."
            }
        },
        {
            id: "vegetable-classifier",
            title: "Local Vegetable Classifier",
            description:
                "Fine-grained image classification model comparing six CNN architectures to detect local vegetable varieties.",
            techStack: ["PyTorch", "ResNet18", "Flask", "OpenCV", "Python"],
            features: [
                "Compared 6 architectures: DeepCNN, DepthwiseCNN, GAP-CNN, Multiscale, Residual, and ResNet18",
                "Built custom image preprocessing to automatically remove backgrounds and balance classes",
                "Handles noisy photos taken in highly varied, real-world lighting conditions",
                "Packaged the optimal classifier model into a Flask web application",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/Local-Vegetable-Variety-Classifier",
            image: "/assets/projects/veg.jpg",
            category: "Deep Learning",
            extended: {
                architecture: "Flask Web Form -> OpenCV Background Subtractor -> PyTorch ResNet18 -> Class Prediction Output.",
                overview: "Fine-grained visual categorization project comparing different CNN modifications (like Depthwise Convolutions and Global Average Pooling) on local agricultural datasets.",
                challenges: [
                    "Mitigating class imbalance in local species datasets.",
                    "Robust background removal in noisy market environment images."
                ],
                results: "Identified optimal network parameters achieving superior performance over standard default CNN layouts.",
                learnings: "Learned the impact of pooling strategies, depthwise-separable convolutions, and data augmentations.",
                future: "Expand catalog to include disease classification and market pricing forecasts."
            }
        },
        {
            id: "greensort",
            title: "Smart Waste Segregation",
            description:
                "IoT-enabled waste categorization system running YOLOv8 object detection on Raspberry Pi with Arduino servo control.",
            techStack: ["YOLO", "OpenCV", "Python", "Raspberry Pi", "Arduino"],
            features: [
                "Classifies trash items into biodegradable, recyclable, hazardous, and non-biodegradable",
                "Raspberry Pi controller handles the computer vision model and coordinates mechanical sorting",
                "Arduino-controlled servo motor mechanism physically routes trash into separate bins",
                "Ultrasonic distance sensors track real-time bin capacity and level metrics",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/greensort",
            image: "/assets/projects/waste.jpg",
            category: "IoT & Computer Vision",
            extended: {
                architecture: "Pi Camera -> Raspberry Pi (YOLO Model) -> Serial Port -> Arduino -> Servo Motors (Mechanical Flaps) -> Ultrasonic Level Sensors.",
                overview: "An automated physical waste bin prototype solving sorting errors at the point of disposal using local AI models.",
                challenges: [
                    "Compressing YOLO model size to fit on the edge Raspberry Pi memory budget.",
                    "Synchronizing mechanical gate movement with detection latency."
                ],
                results: "Successfully categorized and sorted common household waste items in real-time.",
                learnings: "Hands-on experience with hardware-software communications (Serial over USB) and edge computing.",
                future: "Integrate solar panels for self-powered deployment and connect multiple bins via LoRaWAN."
            }
        },
        {
            id: "supplier-ranking",
            title: "AI Supplier Ranking Agent",
            description:
                "Hackathon-winning tool scoring and ranking logistics suppliers automatically using regression-based algorithms.",
            techStack: ["Python", "Scikit-Learn", "Regression Models", "Pandas"],
            features: [
                "Scores logistics suppliers automatically using regression-based performance models",
                "Verifies input credentials and historical logistics data using a robust validation algorithm",
                "Built and presented during a hackathon, earning direct commendation from Mesh Works CEO",
                "Interactive dashboard displaying supplier rankings, metrics, and risk scores",
            ],
            link: "#",
            github: "https://github.com/snehadpatel/proj",
            image: "/assets/projects/supplier.jpg",
            category: "Data Analytics",
        },
        {
            id: "suicide-prediction",
            title: "Suicide Risk Prediction",
            description:
                "NLP crisis detection model using Scikit-Learn classifiers and Neo4j graph databases to map behavioral patterns.",
            techStack: ["Python", "Scikit-Learn", "Neo4j", "NLP", "Pandas"],
            features: [
                "Predicts crisis risk levels from behavioral and sentiment data",
                "Maps relations and patterns using Neo4j graph databases",
                "Extracts key text features using NLP tokenization, TF-IDF, and sentiment scores",
                "Built as a production utility during data specialist internship at CSRBOX",
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
