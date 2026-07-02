"use client";

interface Step {
    title: string;
    desc: string;
}

const PIPELINE_STEPS: Record<string, Step[]> = {
    deepshield: [
        { title: "Next.js Portal", desc: "Front-end image upload payload wrapper" },
        { title: "FastAPI Gateway", desc: "Fast asynchronous validation route" },
        { title: "ELA & DCT Forensics", desc: "Digital signal image compression audits" },
        { title: "Vision Transformer", desc: "ViT classification ensemble analysis" },
        { title: "Grad-CAM Heatmap", desc: "Anomalous visual coordinate outputs" }
    ],
    "vegetable-classifier": [
        { title: "Camera Input", desc: "Chaotic wholesale market crop stream" },
        { title: "OpenCV Subtractor", desc: "Background leaf & shadow isolation" },
        { title: "HSV Segmenter", desc: "Vegetable color segment extraction" },
        { title: "PyTorch ResNet18", desc: "Deep transfer weights category inference" },
        { title: "Flask Server", desc: "Scored softmax metrics outputs" }
    ],
    greensort: [
        { title: "Ultrasonic sensor", desc: "Object proximity sensor trigger" },
        { title: "PiCamera Frame", desc: "Pi capture raw color frame" },
        { title: "YOLOv8 Edge TPU", desc: "INT8 quantized classification scoring" },
        { title: "Serial Interface", desc: "USB Serial command byte coordinate" },
        { title: "Actuator Flaps", desc: "MG996R high-torque mechanical sorting" }
    ],
    "suicide-prediction": [
        { title: "Crisis Input", desc: "Sensitive user distress raw text" },
        { title: "NLP TF-IDF Parser", desc: "Mathematical keyword vector mappings" },
        { title: "Sentiment Polarity", desc: "Behavioral polarity extraction" },
        { title: "Clinical Classifier", desc: "Scikit-Learn risk assessment score" },
        { title: "Neo4j Graph db", desc: "Cypher semantic node context tracing" }
    ],
    "supplier-ranking": [
        { title: "Logistics Datasets", desc: "Raw transport defect records" },
        { title: "Pandas Cleaner", desc: "Imputing sparse logistics metrics" },
        { title: "Regression Engine", desc: "Supplier risk performance scoring" },
        { title: "Streamlit UI", desc: "Logistics ranking dashboard display" }
    ]
};

export default function PipelineVisualizer({ projectId }: { projectId: string }) {
    const steps = PIPELINE_STEPS[projectId];
    if (!steps) return null;

    return (
        <div className="relative border border-slate-200/50 rounded-2xl bg-white/40 p-5 overflow-hidden shadow-sm">
            {/* Glowing background accent sphere */}
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-24 rounded-full bg-indigo-400/[0.03] blur-[40px] pointer-events-none" />

            {/* Horizontally scrollable container to prevent card squishing inside restricted sidebars/drawers */}
            <div className="flex flex-row items-stretch gap-3 overflow-x-auto pb-2 relative z-10 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-row items-center gap-3 shrink-0">
                        {/* Fixed-width step card */}
                        <div className="w-[190px] sm:w-[210px] bg-white border border-slate-200/60 p-4 rounded-xl space-y-3 hover:border-indigo-300 hover:shadow-sm transition-all duration-300 flex flex-col justify-between min-h-[110px] group">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-slate-450 uppercase tracking-wider">Step 0{idx + 1}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300/40 group-hover:bg-indigo-500 transition-colors duration-300" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 tracking-wide">{step.title}</h4>
                                <p className="text-xs text-slate-650 font-normal mt-1 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>

                        {/* Connection Arrow */}
                        {idx < steps.length - 1 && (
                            <div className="text-slate-450 font-mono text-xs select-none">
                                →
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
