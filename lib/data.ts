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

export interface DataType {
    profile: Profile;
    skills: SkillSet;
    experience: Experience[];
    education: Education[];
    projects: Project[];
}

export const DATA: DataType = {
    profile: {
        name: "Sneha Patel",
        tagline: "Engineering AI-driven systems with purpose and performance.",
        summary:
            "A Computer Science & Engineering student specializing in AI, ML, and Full-stack Development. Passionate about building scalable systems that solve real-world problems using Java, Python, and Modern Web Technologies.",
        email: "sneha.patel@example.com", // Placeholder
        linkedin: "https://linkedin.com/in/sneha-patel",
        github: "https://github.com/sneha-patel",
        resumeUrl: "/assets/resume.pdf",
    },
    education: [
        {
            institution: "University of Technology",
            degree: "B.Tech in Computer Science & Engineering",
            period: "2022 - 2026 (Expected)",
            coursework: "Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning Foundations, Operating Systems, Computer Networks.",
        }
    ],
    skills: {
        languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
        frameworks: ["React", "Next.js", "Node.js", "Express", "SpringBoot", "Tailwind CSS"],
        tools: ["Git", "Docker", "AWS", "Firebase", "PostgreSQL", "MongoDB", "Figma"],
        core: [
            "Data Structures & Algorithms",
            "Object-Oriented Programming",
            "Machine Learning",
            "Database Management",
            "System Design",
        ],
    },
    experience: [
        {
            role: "AI/ML Intern",
            company: "IBM",
            period: "Summer 2024",
            description:
                "Developed a Suicide Analysis Model using Python and Scikit-learn to analyze social media trends and predict potential mental health crises. Collaborated with senior data scientists to optimize model accuracy by 15%.",
        },
    ],
    projects: [
        {
            id: "bakemyday",
            title: "BakeMyDay 2.0",
            description:
                "A full-stack e-commerce platform for a customized bakery with ML-based recommendation integration.",
            techStack: ["Java Servlets", "JDBC", "MySQL", "Machine Learning", "JSP"],
            features: [
                "User authentication and role-based access control",
                "Dynamic product catalog with inventory management",
                "ML integration for personalized cake recommendations",
                "Cart and order management system",
            ],
            link: "#",
            github: "#",
            image: "/assets/projects/bakemyday.jpg",
            category: "Full Stack",
            extended: {
                architecture: "Client (JSP) -> Servlet Controller -> Service Layer -> DAO -> MySQL Database. ML Model served via Python Flask API.",
                overview: "BakeMyDay 2.0 addresses the need for a scalable, personalized bakery management system. Traditional systems lack customization and intelligent recommendations, leading to lost sales opportunities.",
                challenges: [
                    "Integrating Python-based ML models with a Java Servlet backend.",
                    "Managing session state and cart consistency across devices.",
                    "Optimizing database queries for product filtering."
                ],
                results: "Increased user engagement by 20% through personalized recommendations. Reduced order processing time by 40%.",
                learnings: "Deepened understanding of JDBC transaction management and the complexities of polyglot architectures (Java + Python).",
                future: "Implement a mobile app using React Native and migrate backend to Spring Boot."
            }
        },
        {
            id: "smart-waste",
            title: "Smart Waste Segmentation",
            description:
                "IoT-enabled system utilizing Computer Vision to automatically segregate waste into biodegradable and non-biodegradable categories.",
            techStack: ["IoT", "Python", "OpenCV", "TensorFlow", "Raspberry Pi"],
            features: [
                "Real-time object detection using YOLOv8",
                "Automated sorting mechanism control",
                "Waste level monitoring dashboard",
                "Data analytics for waste management optimization",
            ],
            link: "#",
            github: "#",
            image: "/assets/projects/waste.jpg",
            category: "AI/IoT",
            extended: {
                architecture: "Camera Input -> Raspberry Pi (YOLOv8) -> Servo Control Signal -> Cloud Dashboard (Firebase).",
                overview: "Waste segregation is a major challenge in urban areas. This system automates the process at the source, reducing landfill burden.",
                challenges: [
                    "Optimizing YOLOv8 model to run efficiently on Raspberry Pi.",
                    "Handling varying lighting conditions for waste detection.",
                    "Synchronizing mechanical sorting with detection latency."
                ],
                results: "Achieved 92% accuracy in waste classification. Reduced manual sorting effort significantly in pilot tests.",
                learnings: "Gained hands-on experience with edge AI deployment and hardware-software integration.",
                future: "Add support for more waste categories (glass, metal) and integrate with smart city infrastructure."
            }
        },
        {
            id: "health-monitor",
            title: "Real-Time Health Monitoring",
            description:
                "A comprehensive health tracking application integrating with Fitbit API to provide real-time vitals analysis.",
            techStack: ["React", "Node.js", "Fitbit API", "MongoDB", "WebSockets"],
            features: [
                "Real-time heart rate and activity syncing",
                "Personalized health dashboards",
                "Alert system for abnormal vital signs",
                "Historical health data trends",
            ],
            link: "#",
            github: "#",
            image: "/assets/projects/health.jpg",
            category: "HealthTech",
        },
        {
            id: "lead-shift",
            title: "Lead Shift",
            description: "AI-powered Lead Generation Engine that automates prospect discovery and qualification.",
            techStack: ["Python", "NLP", "Selenium", "FastAPI", "React"],
            features: [
                "Automated scraping of potential leads",
                "NLP-based sentiment analysis for lead scoring",
                "CRM integration setup",
                "Automated email outreach sequences"
            ],
            link: "#",
            github: "#",
            image: "/assets/projects/leadshift.jpg",
            category: "AI/SaaS"
        },
        {
            id: "ai-search-agent",
            title: "AI SearchAgent",
            description: "Hackathon Winning Project: An intelligent search agent capable of context-aware information retrieval.",
            techStack: ["LangChain", "OpenAI API", "Vector DB", "Next.js"],
            features: [
                "Semantic search capabilities",
                "Contextual conversational interface",
                "Source citation and verification",
                "Multi-modal input support"
            ],
            link: "#",
            github: "#",
            image: "/assets/projects/search.jpg",
            category: "GenAI"
        }
    ],
};
