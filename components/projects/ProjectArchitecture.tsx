"use client";

import React, { useState } from "react";
import { Cpu, Camera, Terminal, ShieldCheck, Heart, Database, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectArchitectureProps {
    projectId: "deepshield" | "greensort" | "suicide-prediction" | "supplier-ranking" | "vegetable-classifier";
}

interface NodeDetail {
    title: string;
    tech: string;
    description: string;
    specs: Record<string, string>;
}

const ARCHITECTURE_METADATA: Record<string, Record<string, NodeDetail>> = {
    greensort: {
        camera: {
            title: "Pi Camera Input",
            tech: "OpenCV, Picamera API",
            description: "Captures 640x480 resolution frame streams at 30 FPS under dynamic conveyor belt lighting conditions, feeding raw frame buffers into the processing pipeline.",
            specs: { "Resolution": "640x480", "Rate": "30 FPS", "Format": "RGB NumPy" }
        },
        rpi4: {
            title: "Raspberry Pi 4 (Edge Compute)",
            tech: "YOLOv8, PyTorch, ONNX Runtime",
            description: "Acts as the central edge processor. Performs crop detection and classification in real-time, executing localized inferences to distinguish recyclable materials.",
            specs: { "Latency": "12ms / frame", "Weights": "INT8 Quantized", "Accuracy": "96.4%" }
        },
        arduino: {
            title: "Arduino Uno",
            tech: "Embedded C++, PWM Control",
            description: "Receives raw binary steering bytes via Serial interface (UART), computes the target actuator sorting flap angle, and issues PWM signals to the servo.",
            specs: { "Baud Rate": "115200 bps", "Protocol": "UART over USB", "Clock": "16 MHz" }
        },
        servo: {
            title: "MG996R Servo Flap",
            tech: "Hardware Actuator",
            description: "A high-torque metal gear servo motor that adjusts physical gates on the conveyor track to steer waste categories into appropriate bins.",
            specs: { "Torque": "11 kg/cm", "Voltage": "6.0V", "Angle": "0° - 180°" }
        }
    },
    deepshield: {
        input: {
            title: "Input Image Feed",
            tech: "Next.js Image API",
            description: "Accepts uploaded digital images or GAN-generated files, serving as the input payload wrapper for ELA and DCT compression analysis.",
            specs: { "Support": "JPEG, PNG, WebP", "Max Size": "10 MB", "Payload": "Multipart / Base64" }
        },
        ela: {
            title: "Error Level Analysis (ELA)",
            tech: "Python, Pillow (PIL)",
            description: "Saves the image at a baseline 95% compression level, computing pixel difference metrics to reveal localized variations in compression levels indicative of GAN edits.",
            specs: { "Resave Rate": "95%", "Diff Algorithm": "Absolute Delta", "Detects": "Splicing, GAN Alterations" }
        },
        dct: {
            title: "Discrete Cosine Transform (DCT)",
            tech: "NumPy, SciPy",
            description: "Examines JPEG grid compression coefficients in frequency domain. Uncovers anomalous repeating patterns from double-compression or copy-paste edits.",
            specs: { "Block Size": "8x8 pixels", "Analysis Mode": "Frequency Domain", "Detects": "Double Compression" }
        },
        vit: {
            title: "Vision Transformer (ViT)",
            tech: "PyTorch, Transformers",
            description: "Splits images into 16x16 flattened patches, using self-attention heads to model long-range spatial context and detect subtle pixel inconsistency signatures.",
            specs: { "Model": "ViT-Base-16", "Parameters": "86 Million", "Accuracy": "97.5%" }
        },
        output: {
            title: "Grad-CAM & Forensics Verdict",
            tech: "PyTorch (Grad-CAM), Tailwind CSS",
            description: "Generates visual heatmaps using final-layer classification gradients, highlighting anomalous pixels directly on the image to explain the classification.",
            specs: { "Accuracy": "97.5%", "Method": "Grad-CAM Heatmap", "Output": "Bounding Highlight" }
        }
    },
    "suicide-prediction": {
        input: {
            title: "Behavioral Text Ingestion",
            tech: "React Forms, Next.js",
            description: "Accepts sensitive, raw distress posts securely. Performs all operations locally or within secure API routes without storing private transcripts.",
            specs: { "Type": "Secure String", "Storage": "Non-persistent", "Privacy": "GDPR-compliant local processing" }
        },
        sklearn: {
            title: "SKLearn Classifier",
            tech: "Scikit-Learn, Pandas, Joblib",
            description: "Converts raw text into numeric matrices using a TF-IDF vectorizer and evaluates features with a Random Forest and Logistic Regression voting ensemble.",
            specs: { "Featurizer": "TF-IDF Vectorizer", "Ensemble": "Voting Classifier", "Latency": "<5ms" }
        },
        neo4j: {
            title: "Neo4j Graph Database",
            tech: "Neo4j Graph DB, Cypher",
            description: "Maps distress tokens to semantic pathways. Traces key phrase patterns and relationships dynamically to identify suicidal ideation context.",
            specs: { "DB Type": "Native Graph", "Query Lang": "Cypher Queries", "Tracing": "Semantic Pathways" }
        },
        dashboard: {
            title: "Clinician Decision Alert",
            tech: "Tailwind UI, React Notifications",
            description: "Triggers urgent visual alerts on clinician dashboard screens if the distress severity score exceeds high-risk classification thresholds.",
            specs: { "Alert Style": "Real-time Overlay", "Threshold": "Severity Score > 0.8", "Action": "Clinician Notification" }
        }
    },
    "vegetable-classifier": {
        input: {
            title: "Market Camera Stream",
            tech: "OpenCV Web Stream",
            description: "Streams crop items continuously under volatile, real-world wholesale market lighting conditions.",
            specs: { "Resolution": "720p", "Frame Rate": "24 FPS", "Lighting": "Ambient-adaptive" }
        },
        opencv: {
            title: "OpenCV Segmenter",
            tech: "OpenCV, Python NumPy",
            description: "Applies background subtraction to isolate crop foregrounds from conveyor shadows. Extracts color masks using HSV ranges.",
            specs: { "Color Space": "HSV Segmenting", "Latency": "<3ms", "Mask Type": "Binary Contour Mask" }
        },
        pytorch: {
            title: "ResNet18 Classifier",
            tech: "PyTorch, Torchvision",
            description: "Runs model inference comparing ResNet18, MobileNetV2, and custom CNNs to identify vegetable categories and output soft score probabilities.",
            specs: { "Backbones": "ResNet18, MobileNetV2", "Model Size": "44 MB", "Classes": "Multi-class Crop" }
        },
        flask: {
            title: "Flask Microservice",
            tech: "Flask, Gunicorn",
            description: "Exposes classification predictions as REST API endpoints, returning JSON payloads containing crop types and softmax probability scores.",
            specs: { "Protocol": "HTTP REST / JSON", "Accuracy": "92.0%", "Framework": "Flask / Python" }
        }
    },
    "supplier-ranking": {
        input: {
            title: "Logistics Carrier Logs",
            tech: "Pandas Ingestion",
            description: "Ingests raw multivariable transport records containing performance statistics, freight delay metrics, and carrier data sheets.",
            specs: { "Format": "CSV / XLSX", "Variables": "Delays, Defects, Costs", "Source": "Logistics Logs" }
        },
        pandas: {
            title: "Pandas Data Cleaner",
            tech: "Pandas, NumPy",
            description: "Imputes missing performance columns, handles anomalies, and aggregates data to produce standard metrics like defect ratios and transit logs.",
            specs: { "Imputation": "Median & Fallbacks", "Libraries": "Pandas, NumPy", "Execution": "Batch ETL" }
        },
        sklearn: {
            title: "Regression Engine",
            tech: "Scikit-Learn, Linear/Ridge",
            description: "Fits a weighted Ridge regression model to calculate unified carrier risk scores based on aggregated defect, cost, and latency dimensions.",
            specs: { "Algorithm": "Ridge Regression", "Features": "Delay Rate, Cost Index", "Target": "Carrier Score" }
        },
        streamlit: {
            title: "Streamlit Dashboard",
            tech: "Streamlit UI, Plotly",
            description: "Renders carrier rank scorecards and comparative charts for business analytics, highly commended by the logistics team CEO.",
            specs: { "Dashboard": "Streamlit", "Visualization": "Plotly Express", "Endorsement": "CEO Commended" }
        }
    }
};

export default function ProjectArchitecture({ projectId }: ProjectArchitectureProps) {
    const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
    const projectMetadata = ARCHITECTURE_METADATA[projectId];

    const getGlowFilter = (nodeId: string) => {
        return activeNodeId === nodeId ? "url(#glow)" : "none";
    };

    const getNodeHandlers = (nodeId: string) => ({
        onMouseEnter: () => setActiveNodeId(nodeId),
        onMouseLeave: () => setActiveNodeId(null),
        onClick: () => setActiveNodeId(activeNodeId === nodeId ? null : nodeId),
        onKeyDown: (e: React.KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveNodeId(activeNodeId === nodeId ? null : nodeId);
            }
        },
        role: "button",
        tabIndex: 0,
        className: "cursor-pointer transition-all duration-300 focus:outline-none select-none"
    });

    const renderDiagram = () => {
        if (projectId === "greensort") {
            return (
                <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Signals flowing lines */}
                    <path d="M 120 120 L 260 120" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 380 120 L 520 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 640 120 L 710 120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                    {/* Node 1: Camera Feed */}
                    <g transform="translate(40, 70)" {...getNodeHandlers("camera")}>
                        <rect 
                            width="80" 
                            height="100" 
                            rx="12" 
                            fill="#1e293b" 
                            stroke={activeNodeId === "camera" ? "#6366f1" : "#475569"} 
                            strokeWidth={activeNodeId === "camera" ? "2.5" : "1.5"}
                            filter={getGlowFilter("camera")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="80" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Camera className="w-6 h-6" /></div>
                        </foreignObject>
                        <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" className="pointer-events-none">Camera Feed</text>
                        <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" className="pointer-events-none">640x480 Raw</text>
                    </g>

                    {/* Node 2: Raspberry Pi 4 */}
                    <g transform="translate(260, 50)" {...getNodeHandlers("rpi4")}>
                        <rect 
                            width="120" 
                            height="140" 
                            rx="16" 
                            fill="#1e1b4b" 
                            stroke={activeNodeId === "rpi4" ? "#818cf8" : "#6366f1"} 
                            strokeWidth={activeNodeId === "rpi4" ? "3" : "2"}
                            filter={getGlowFilter("rpi4")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="20" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                        </foreignObject>
                        <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" className="pointer-events-none">Raspberry Pi 4</text>
                        <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8" className="pointer-events-none">YOLOv8 quantized</text>
                        <rect x="20" y="105" width="80" height="20" rx="4" fill="#312e81" stroke="#4f46e5" className="pointer-events-none" />
                        <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold" className="pointer-events-none">INT8 (12 fps)</text>
                    </g>

                    {/* Node 3: Arduino Uno */}
                    <g transform="translate(520, 65)" {...getNodeHandlers("arduino")}>
                        <rect 
                            width="120" 
                            height="110" 
                            rx="16" 
                            fill="#064e3b" 
                            stroke={activeNodeId === "arduino" ? "#34d399" : "#10b981"} 
                            strokeWidth={activeNodeId === "arduino" ? "2.5" : "1.5"}
                            filter={getGlowFilter("arduino")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-emerald-400"><Terminal className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="60" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" className="pointer-events-none">Arduino Uno</text>
                        <text x="60" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">USB Serial (UART)</text>
                        <text x="60" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">Pulse Width Mod</text>
                    </g>

                    {/* Node 4: MG996R Servo Flap */}
                    <g transform="translate(710, 85)" {...getNodeHandlers("servo")}>
                        <circle 
                            cx="35" 
                            cy="35" 
                            r="35" 
                            fill="#78350f" 
                            stroke={activeNodeId === "servo" ? "#fbbf24" : "#f59e0b"} 
                            strokeWidth={activeNodeId === "servo" ? "3" : "2"}
                            filter={getGlowFilter("servo")}
                            className="transition-all duration-300"
                        />
                        <text x="35" y="32" textAnchor="middle" fill="#fcd34d" fontWeight="bold" className="pointer-events-none">Flap</text>
                        <text x="35" y="47" textAnchor="middle" fill="#fef3c7" fontSize="8" className="pointer-events-none">Servo</text>
                    </g>
                </svg>
            );
        }

        if (projectId === "deepshield") {
            return (
                <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Signals flowing lines */}
                    <path d="M 120 120 L 220 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 340 85 L 430 100" stroke="#f472b6" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 340 155 L 430 140" stroke="#fb7185" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 550 120 L 650 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                    {/* Node 1: Input image */}
                    <g transform="translate(40, 70)" {...getNodeHandlers("input")}>
                        <rect 
                            width="80" 
                            height="100" 
                            rx="12" 
                            fill="#1e293b" 
                            stroke={activeNodeId === "input" ? "#818cf8" : "#475569"} 
                            strokeWidth={activeNodeId === "input" ? "2.5" : "1.5"}
                            filter={getGlowFilter("input")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="80" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-slate-400"><Camera className="w-6 h-6" /></div>
                        </foreignObject>
                        <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" className="pointer-events-none">Input Image</text>
                        <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" className="pointer-events-none">JPEG / GAN</text>
                    </g>

                    {/* Node 2A: Error Level Analysis (ELA) */}
                    <g transform="translate(220, 35)" {...getNodeHandlers("ela")}>
                        <rect 
                            width="120" 
                            height="70" 
                            rx="12" 
                            fill="#881337" 
                            stroke={activeNodeId === "ela" ? "#f43f5e" : "#fb7185"} 
                            strokeWidth={activeNodeId === "ela" ? "2.5" : "1.5"}
                            filter={getGlowFilter("ela")}
                            className="transition-all duration-300"
                        />
                        <text x="60" y="25" textAnchor="middle" fill="#fda4af" fontWeight="bold" className="pointer-events-none">ELA Pipeline</text>
                        <text x="60" y="42" textAnchor="middle" fill="#fecdd3" fontSize="8" className="pointer-events-none">Resave Diff (95%)</text>
                        <text x="60" y="55" textAnchor="middle" fill="#fecdd3" fontSize="8" className="pointer-events-none">Isolate GAN edits</text>
                    </g>

                    {/* Node 2B: Discrete Cosine Transform (DCT) */}
                    <g transform="translate(220, 135)" {...getNodeHandlers("dct")}>
                        <rect 
                            width="120" 
                            height="70" 
                            rx="12" 
                            fill="#701a75" 
                            stroke={activeNodeId === "dct" ? "#d946ef" : "#f472b6"} 
                            strokeWidth={activeNodeId === "dct" ? "2.5" : "1.5"}
                            filter={getGlowFilter("dct")}
                            className="transition-all duration-300"
                        />
                        <text x="60" y="25" textAnchor="middle" fill="#f5d0fe" fontWeight="bold" className="pointer-events-none">DCT Frequencies</text>
                        <text x="60" y="42" textAnchor="middle" fill="#fae8ff" fontSize="8" className="pointer-events-none">Extract grid artifacts</text>
                        <text x="60" y="55" textAnchor="middle" fill="#fae8ff" fontSize="8" className="pointer-events-none">High-freq noise</text>
                    </g>

                    {/* Node 3: Vision Transformer (ViT-Base-16) */}
                    <g transform="translate(430, 50)" {...getNodeHandlers("vit")}>
                        <rect 
                            width="120" 
                            height="140" 
                            rx="16" 
                            fill="#1e1b4b" 
                            stroke={activeNodeId === "vit" ? "#818cf8" : "#6366f1"} 
                            strokeWidth={activeNodeId === "vit" ? "3" : "2"}
                            filter={getGlowFilter("vit")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="20" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                        </foreignObject>
                        <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" className="pointer-events-none">ViT-Base-16</text>
                        <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8" className="pointer-events-none">16x16 Patches</text>
                        <rect x="25" y="105" width="70" height="20" rx="4" fill="#312e81" stroke="#4f46e5" className="pointer-events-none" />
                        <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold" className="pointer-events-none">Self-Attention</text>
                    </g>

                    {/* Node 4: Grad-CAM anomaly heatmaps */}
                    <g transform="translate(650, 70)" {...getNodeHandlers("output")}>
                        <rect 
                            width="110" 
                            height="100" 
                            rx="16" 
                            fill="#064e3b" 
                            stroke={activeNodeId === "output" ? "#34d399" : "#10b981"} 
                            strokeWidth={activeNodeId === "output" ? "2.5" : "2"}
                            filter={getGlowFilter("output")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="110" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-emerald-400"><ShieldCheck className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="55" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" className="pointer-events-none">97.5% Acc</text>
                        <text x="55" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">Grad-CAM Heatmap</text>
                    </g>
                </svg>
            );
        }

        if (projectId === "suicide-prediction") {
            return (
                <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Signals flowing lines */}
                    <path d="M 120 120 L 220 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 340 120 L 440 120" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 560 120 L 660 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                    {/* Node 1: Input text */}
                    <g transform="translate(40, 70)" {...getNodeHandlers("input")}>
                        <rect 
                            width="80" 
                            height="100" 
                            rx="12" 
                            fill="#1e293b" 
                            stroke={activeNodeId === "input" ? "#818cf8" : "#475569"} 
                            strokeWidth={activeNodeId === "input" ? "2.5" : "1.5"}
                            filter={getGlowFilter("input")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="80" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-slate-400"><Terminal className="w-6 h-6" /></div>
                        </foreignObject>
                        <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" className="pointer-events-none">Behavioral Text</text>
                        <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" className="pointer-events-none">NLP Ingestion</text>
                    </g>

                    {/* Node 2: Scikit-Learn Ensemble classifier */}
                    <g transform="translate(220, 65)" {...getNodeHandlers("sklearn")}>
                        <rect 
                            width="120" 
                            height="110" 
                            rx="16" 
                            fill="#3b0764" 
                            stroke={activeNodeId === "sklearn" ? "#c084fc" : "#a855f7"} 
                            strokeWidth={activeNodeId === "sklearn" ? "2.5" : "1.5"}
                            filter={getGlowFilter("sklearn")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-purple-400"><Heart className="w-7 h-7 animate-pulse" /></div>
                        </foreignObject>
                        <text x="60" y="65" textAnchor="middle" fill="#d8b4fe" fontWeight="bold" className="pointer-events-none">SKLearn Engine</text>
                        <text x="60" y="80" textAnchor="middle" fill="#e9d5ff" fontSize="8" className="pointer-events-none">TF-IDF Vectorizer</text>
                        <text x="60" y="95" textAnchor="middle" fill="#e9d5ff" fontSize="8" className="pointer-events-none">Ensemble Classifier</text>
                    </g>

                    {/* Node 3: Neo4j Graph DB mapping distress tokens */}
                    <g transform="translate(440, 50)" {...getNodeHandlers("neo4j")}>
                        <rect 
                            width="120" 
                            height="140" 
                            rx="16" 
                            fill="#1e1b4b" 
                            stroke={activeNodeId === "neo4j" ? "#818cf8" : "#6366f1"} 
                            strokeWidth={activeNodeId === "neo4j" ? "3" : "2"}
                            filter={getGlowFilter("neo4j")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="20" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Database className="w-8 h-8" /></div>
                        </foreignObject>
                        <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" className="pointer-events-none">Neo4j Database</text>
                        <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8" className="pointer-events-none">Cypher queries</text>
                        <rect x="25" y="105" width="70" height="20" rx="4" fill="#312e81" stroke="#4f46e5" className="pointer-events-none" />
                        <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold" className="pointer-events-none">Temporal Paths</text>
                    </g>

                    {/* Node 4: Clinician dashboard alerts */}
                    <g transform="translate(660, 70)" {...getNodeHandlers("dashboard")}>
                        <rect 
                            width="100" 
                            height="100" 
                            rx="16" 
                            fill="#064e3b" 
                            stroke={activeNodeId === "dashboard" ? "#34d399" : "#10b981"} 
                            strokeWidth={activeNodeId === "dashboard" ? "2.5" : "2"}
                            filter={getGlowFilter("dashboard")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="100" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-emerald-400"><AlertCircle className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="50" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" className="pointer-events-none">Decision Alert</text>
                        <text x="50" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">Clinician View</text>
                    </g>
                </svg>
            );
        }

        if (projectId === "vegetable-classifier") {
            return (
                <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Signals flowing lines */}
                    <path d="M 120 120 L 220 120" stroke="#6366f1" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 340 120 L 440 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 560 120 L 660 120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                    {/* Node 1: Camera Crop Input */}
                    <g transform="translate(40, 70)" {...getNodeHandlers("input")}>
                        <rect 
                            width="80" 
                            height="100" 
                            rx="12" 
                            fill="#1e293b" 
                            stroke={activeNodeId === "input" ? "#818cf8" : "#475569"} 
                            strokeWidth={activeNodeId === "input" ? "2.5" : "1.5"}
                            filter={getGlowFilter("input")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="80" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Camera className="w-6 h-6" /></div>
                        </foreignObject>
                        <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" className="pointer-events-none">Crop Camera</text>
                        <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" className="pointer-events-none">1,200+ Photos</text>
                    </g>

                    {/* Node 2: OpenCV Preprocessing */}
                    <g transform="translate(220, 65)" {...getNodeHandlers("opencv")}>
                        <rect 
                            width="120" 
                            height="110" 
                            rx="16" 
                            fill="#064e3b" 
                            stroke={activeNodeId === "opencv" ? "#34d399" : "#10b981"} 
                            strokeWidth={activeNodeId === "opencv" ? "2.5" : "1.5"}
                            filter={getGlowFilter("opencv")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-emerald-400"><Terminal className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="60" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" className="pointer-events-none">OpenCV Filter</text>
                        <text x="60" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">Background Sub</text>
                        <text x="60" y="95" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">HSV Segmenter</text>
                    </g>

                    {/* Node 3: PyTorch Model Evaluator */}
                    <g transform="translate(440, 50)" {...getNodeHandlers("pytorch")}>
                        <rect 
                            width="120" 
                            height="140" 
                            rx="16" 
                            fill="#1e1b4b" 
                            stroke={activeNodeId === "pytorch" ? "#818cf8" : "#6366f1"} 
                            strokeWidth={activeNodeId === "pytorch" ? "3" : "2"}
                            filter={getGlowFilter("pytorch")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="20" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                        </foreignObject>
                        <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" className="pointer-events-none">PyTorch Model</text>
                        <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8" className="pointer-events-none">CNN Comparison</text>
                        <rect x="20" y="105" width="80" height="20" rx="4" fill="#312e81" stroke="#4f46e5" className="pointer-events-none" />
                        <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold" className="pointer-events-none">MobileNet/ResNet</text>
                    </g>

                    {/* Node 4: Flask Server Output */}
                    <g transform="translate(660, 70)" {...getNodeHandlers("flask")}>
                        <rect 
                            width="100" 
                            height="100" 
                            rx="16" 
                            fill="#78350f" 
                            stroke={activeNodeId === "flask" ? "#fbbf24" : "#f59e0b"} 
                            strokeWidth={activeNodeId === "flask" ? "2.5" : "1.5"}
                            filter={getGlowFilter("flask")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="100" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-amber-400"><AlertCircle className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="50" y="65" textAnchor="middle" fill="#fcd34d" fontWeight="bold" className="pointer-events-none">Flask Server</text>
                        <text x="50" y="80" textAnchor="middle" fill="#fef3c7" fontSize="8" className="pointer-events-none">92% Accuracy</text>
                    </g>
                </svg>
            );
        }

        if (projectId === "supplier-ranking") {
            return (
                <svg viewBox="0 0 800 240" className="w-full h-full font-mono text-[10px]">
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Signals flowing lines */}
                    <path d="M 120 120 L 220 120" stroke="#818cf8" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 340 120 L 440 120" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />
                    <path d="M 560 120 L 660 120" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]" />

                    {/* Node 1: Logistics CSV Data */}
                    <g transform="translate(40, 70)" {...getNodeHandlers("input")}>
                        <rect 
                            width="80" 
                            height="100" 
                            rx="12" 
                            fill="#1e293b" 
                            stroke={activeNodeId === "input" ? "#818cf8" : "#475569"} 
                            strokeWidth={activeNodeId === "input" ? "2.5" : "1.5"}
                            filter={getGlowFilter("input")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="80" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Database className="w-6 h-6" /></div>
                        </foreignObject>
                        <text x="40" y="65" textAnchor="middle" fill="#94a3b8" fontSize="8" className="pointer-events-none">Logistics CSV</text>
                        <text x="40" y="80" textAnchor="middle" fill="#cbd5e1" fontWeight="bold" className="pointer-events-none">Carrier Logs</text>
                    </g>

                    {/* Node 2: Pandas Data Cleaning */}
                    <g transform="translate(220, 65)" {...getNodeHandlers("pandas")}>
                        <rect 
                            width="120" 
                            height="110" 
                            rx="16" 
                            fill="#3b0764" 
                            stroke={activeNodeId === "pandas" ? "#c084fc" : "#a855f7"} 
                            strokeWidth={activeNodeId === "pandas" ? "2.5" : "1.5"}
                            filter={getGlowFilter("pandas")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-purple-400"><Terminal className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="60" y="65" textAnchor="middle" fill="#d8b4fe" fontWeight="bold" className="pointer-events-none">Pandas Cleaner</text>
                        <text x="60" y="80" textAnchor="middle" fill="#e9d5ff" fontSize="8" className="pointer-events-none">Impute Missing</text>
                        <text x="60" y="95" textAnchor="middle" fill="#e9d5ff" fontSize="8" className="pointer-events-none">Delay/Defect Rates</text>
                    </g>

                    {/* Node 3: Regression Engine */}
                    <g transform="translate(440, 50)" {...getNodeHandlers("sklearn")}>
                        <rect 
                            width="120" 
                            height="140" 
                            rx="16" 
                            fill="#1e1b4b" 
                            stroke={activeNodeId === "sklearn" ? "#818cf8" : "#6366f1"} 
                            strokeWidth={activeNodeId === "sklearn" ? "3" : "2"}
                            filter={getGlowFilter("sklearn")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="20" width="120" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-indigo-400"><Cpu className="w-8 h-8 animate-pulse" /></div>
                        </foreignObject>
                        <text x="60" y="75" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" className="pointer-events-none">Regression Engine</text>
                        <text x="60" y="95" textAnchor="middle" fill="#818cf8" fontSize="8" className="pointer-events-none">Scikit-Learn</text>
                        <rect x="25" y="105" width="70" height="20" rx="4" fill="#312e81" stroke="#4f46e5" className="pointer-events-none" />
                        <text x="60" y="118" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold" className="pointer-events-none">Weighted Rank</text>
                    </g>

                    {/* Node 4: Streamlit Scorecard Dashboard */}
                    <g transform="translate(660, 70)" {...getNodeHandlers("streamlit")}>
                        <rect 
                            width="100" 
                            height="100" 
                            rx="16" 
                            fill="#064e3b" 
                            stroke={activeNodeId === "streamlit" ? "#34d399" : "#10b981"} 
                            strokeWidth={activeNodeId === "streamlit" ? "2.5" : "2"}
                            filter={getGlowFilter("streamlit")}
                            className="transition-all duration-300"
                        />
                        <foreignObject x="0" y="15" width="100" height="35" className="pointer-events-none">
                            <div className="flex justify-center text-emerald-400"><AlertCircle className="w-7 h-7" /></div>
                        </foreignObject>
                        <text x="50" y="65" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" className="pointer-events-none">Streamlit Dashboard</text>
                        <text x="50" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8" className="pointer-events-none">CEO Commended</text>
                    </g>
                </svg>
            );
        }
        return null;
    };

    const hasActiveDetails = activeNodeId && projectMetadata && projectMetadata[activeNodeId];

    return (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-slate-300 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-[10px] uppercase tracking-wider">
                    {projectId === "greensort" || projectId === "vegetable-classifier" ? (
                        <Cpu className="w-4 h-4" />
                    ) : projectId === "deepshield" ? (
                        <ShieldCheck className="w-4 h-4" />
                    ) : (
                        <Database className="w-4 h-4" />
                    )}
                    <span>
                        System Architecture:{" "}
                        {projectId === "greensort"
                            ? "Greensort IoT Sorter"
                            : projectId === "deepshield"
                            ? "DeepShield AI Forensics"
                            : projectId === "suicide-prediction"
                            ? "NLP Crisis Context Mapper"
                            : projectId === "vegetable-classifier"
                            ? "Local Crop Classifier"
                            : "Logistics Supplier Ranker"}
                    </span>
                </div>
                {activeNodeId && (
                    <button 
                        onClick={() => setActiveNodeId(null)}
                        className="text-[9px] font-mono text-slate-500 hover:text-indigo-400 transition-colors uppercase tracking-wider"
                    >
                        Clear Inspect [x]
                    </button>
                )}
            </div>

            <div className="relative w-full aspect-[16/6] bg-slate-900/60 rounded-xl overflow-hidden p-2 flex items-center justify-center border border-slate-900">
                {renderDiagram()}
                <style jsx global>{`
                    @keyframes dash {
                        to {
                            stroke-dashoffset: -20;
                        }
                    }
                `}</style>
            </div>

            {/* Details Inspector Panel */}
            <div className="relative min-h-[90px] bg-slate-900/40 border border-slate-900 rounded-xl p-4 overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-slate-900/20 pointer-events-none" />
                <AnimatePresence mode="wait">
                    {hasActiveDetails ? (
                        <motion.div
                            key={activeNodeId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.18 }}
                            className="space-y-2 relative z-10"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-1.5">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
                                    <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                                        {projectMetadata[activeNodeId].title}
                                    </h4>
                                </div>
                                <span className="text-[9px] font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900/30">
                                    {projectMetadata[activeNodeId].tech}
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                                {projectMetadata[activeNodeId].description}
                            </p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[9px] font-mono text-slate-500">
                                {Object.entries(projectMetadata[activeNodeId].specs).map(([key, val]) => (
                                    <div key={key} className="flex items-center gap-1">
                                        <span className="text-slate-500">{key}:</span>
                                        <span className="text-slate-300 font-semibold">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex items-center justify-center text-center text-[10px] text-slate-500 font-light italic py-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30 animate-ping" />
                                <span>Hover or click any node in the system diagram to inspect technical telemetry specifications.</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
