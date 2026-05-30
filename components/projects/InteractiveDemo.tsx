"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { 
    Play, Shield, ShieldCheck, Eye, Cpu, RefreshCw, Trash2, 
    Layers, CheckCircle2, AlertTriangle, ArrowRight, Activity, 
    Plus, Sliders, Database, Search, Sparkles
} from "lucide-react";

interface InteractiveDemoProps {
    projectId: string;
}

export default function InteractiveDemo({ projectId }: InteractiveDemoProps) {
    const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    
    // Reset state on project change
    useEffect(() => {
        setStatus("idle");
        setProgress(0);
        setLogs([]);
    }, [projectId]);

    const runProgressSim = (steps: string[], callback: () => void) => {
        setStatus("running");
        setProgress(0);
        setLogs([]);
        
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < steps.length) {
                setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${steps[currentStep]}`]);
                setProgress(((currentStep + 1) / steps.length) * 100);
                currentStep++;
            } else {
                clearInterval(interval);
                setStatus("done");
                callback();
            }
        }, 800);
    };

    // ==========================================
    // 1. DEEPSHIELD AI DEMO STATE & LOGIC
    // ==========================================
    const [deepshieldImage, setDeepshieldImage] = useState<"real" | "fake" | "compressed">("real");
    const [deepshieldProtected, setDeepshieldProtected] = useState(false);
    const [deepshieldResult, setDeepshieldResult] = useState<{
        isFake: boolean;
        confidence: number;
        vitConfidence: number;
        forensicScore: number;
    } | null>(null);
    const [activeTab, setActiveTab] = useState<"normal" | "ela" | "heatmap">("normal");

    const runDeepShieldDemo = () => {
        const steps = [
            "Initializing digital forensics analyzer...",
            "Computing Error Level Analysis (ELA) with high frequency scaling...",
            "Analyzing discrete cosine transform (DCT) frequency distributions...",
            "Running Vision Transformer (ViT-Base-16) spatial feature extractor...",
            "Ensembling deep classifier weights and computing final output..."
        ];

        runProgressSim(steps, () => {
            if (deepshieldProtected) {
                // FGSM protection tricks the detector into thinking a fake image is real, 
                // or keeps a real image clean, but specifically it renders fakes undetectable!
                setDeepshieldResult({
                    isFake: false,
                    confidence: 97.9,
                    vitConfidence: 98.4,
                    forensicScore: 12.3
                });
            } else if (deepshieldImage === "fake") {
                setDeepshieldResult({
                    isFake: true,
                    confidence: 99.2,
                    vitConfidence: 98.9,
                    forensicScore: 88.5
                });
            } else if (deepshieldImage === "compressed") {
                setDeepshieldResult({
                    isFake: false,
                    confidence: 84.1,
                    vitConfidence: 87.2,
                    forensicScore: 35.4 // higher ELA artifacts due to jpeg saving, but ViT flags real
                });
            } else {
                setDeepshieldResult({
                    isFake: false,
                    confidence: 98.7,
                    vitConfidence: 99.1,
                    forensicScore: 5.6
                });
            }
        });
    };

    // ==========================================
    // 2. VEGETABLE CLASSIFIER DEMO STATE & LOGIC
    // ==========================================
    const [vegSelected, setVegSelected] = useState<"karela" | "parwal" | "tindora" | "suran">("karela");
    const [vegModel, setVegModel] = useState<"resnet" | "gap" | "depthwise">("gap");
    const [vegResult, setVegResult] = useState<{
        name: string;
        scientificName: string;
        confidence: number;
        latency: number;
        modelParams: string;
    } | null>(null);

    const runVegetableClassifier = () => {
        const steps = [
            "Reading uploaded crop image stream...",
            "Applying HSV segmentation and background subtractor...",
            "Normalizing image dimensions to 224x224...",
            `Feeding features into ${vegModel === "resnet" ? "ResNet18" : vegModel === "gap" ? "Custom GAP-CNN" : "Depthwise-CNN"}...`,
            "Calculating softmax classification probabilities..."
        ];

        runProgressSim(steps, () => {
            const crops = {
                karela: { name: "Bitter Gourd (Karela)", scientificName: "Momordica charantia" },
                parwal: { name: "Pointed Gourd (Parwal)", scientificName: "Trichosanthes dioica" },
                tindora: { name: "Ivy Gourd (Tindora)", scientificName: "Coccinia grandis" },
                suran: { name: "Elephant Foot Yam (Suran)", scientificName: "Amorphophallus paeoniifolius" }
            };

            const selectedCrop = crops[vegSelected];
            const baseConf = vegModel === "resnet" ? 99.1 : vegModel === "gap" ? 97.8 : 94.2;
            const latency = vegModel === "resnet" ? 82 : vegModel === "gap" ? 14 : 26;
            const params = vegModel === "resnet" ? "11.7M parameters" : vegModel === "gap" ? "1.2M parameters" : "840K parameters";

            setVegResult({
                name: selectedCrop.name,
                scientificName: selectedCrop.scientificName,
                confidence: Math.round(baseConf * (0.98 + Math.random() * 0.04) * 10) / 10,
                latency,
                modelParams: params
            });
        });
    };

    // ==========================================
    // 3. GREENSORT (SMART WASTE SEGREGATION) LOGIC
    // ==========================================
    const [wasteItem, setWasteItem] = useState<"bottle" | "peel" | "battery" | "can">("bottle");
    const [greensortResult, setGreensortResult] = useState<{
        category: "Recyclable" | "Biodegradable" | "Hazardous";
        confidence: number;
        servoAngle: number;
        binCapacity: number;
    } | null>(null);

    const runGreensortDemo = () => {
        const steps = [
            "Ultrasonic distance sensor triggered: object detected in chute.",
            "Enabling PiCamera feed & capturing image frame...",
            "Loading YOLOv8 Waste Classifier weights on edge TPU...",
            "Extracting bounding boxes & predicting classes...",
            "Sending actuator code via USB Serial port (/dev/ttyACM0)...",
            "Arduino Uno received motor command. Adjusting servo flap angle..."
        ];

        runProgressSim(steps, () => {
            const mappings = {
                bottle: { cat: "Recyclable" as const, angle: 45 },
                peel: { cat: "Biodegradable" as const, angle: 90 },
                battery: { cat: "Hazardous" as const, angle: 135 },
                can: { cat: "Recyclable" as const, angle: 45 }
            };

            const match = mappings[wasteItem];
            setGreensortResult({
                category: match.cat,
                confidence: Math.round((92 + Math.random() * 6) * 10) / 10,
                servoAngle: match.angle,
                binCapacity: Math.round(35 + Math.random() * 20)
            });
        });
    };

    // ==========================================
    // 4. SUPPLIER RANKING DEMO STATE & LOGIC
    // ==========================================
    const [delayRate, setDelayRate] = useState(12); // percentage
    const [defectRatio, setDefectRatio] = useState(2.1); // percentage
    const [compliance, setCompliance] = useState(94); // percentage
    const [costIndex, setCostIndex] = useState(4.5); // 1-10 index
    const [rankingResult, setRankingResult] = useState<{
        name: string;
        score: number;
        risk: "Low" | "Moderate" | "High";
    }[]>([]);

    const runSupplierRanking = () => {
        const steps = [
            "Parsing logistics supplier data repositories...",
            "Validating input compliance and history telemetry...",
            "Applying regression scoring algorithm (w1*Delay + w2*Defects + w3*Compliance + w4*Cost)...",
            "Sorting providers & generating analytical ranking report..."
        ];

        runProgressSim(steps, () => {
            // Delay has negative weight
            // Defect has heavy negative weight
            // Compliance has positive weight
            // Cost index has negative weight (higher index = expensive)
            const calculateScore = (baseScore: number, factor: number) => {
                const computed = baseScore - (delayRate * 0.4) - (defectRatio * 2.2) + (compliance * 0.3) - (costIndex * 1.5) + (factor * 2);
                return Math.max(0, Math.min(100, Math.round(computed * 10) / 10));
            };

            const suppliers = [
                { name: "Logistics Hub Alpha", base: 65, factor: 4 },
                { name: "Sardar Freight Ltd", base: 58, factor: 8 },
                { name: "Vibrant Gujarat Cargo", base: 70, factor: 1 }
            ];

            const scored = suppliers.map(s => {
                const score = calculateScore(s.base, s.factor);
                let risk: "Low" | "Moderate" | "High" = "Low";
                if (score < 50 || delayRate > 25 || defectRatio > 5) risk = "High";
                else if (score < 75 || delayRate > 15 || defectRatio > 3) risk = "Moderate";
                
                return { name: s.name, score, risk };
            }).sort((a, b) => b.score - a.score);

            setRankingResult(scored);
        });
    };

    // ==========================================
    // 5. SUICIDE CRISIS PREDICTION LOGIC
    // ==========================================
    const [crisisText, setCrisisText] = useState("");
    const [selectedSample, setSelectedSample] = useState<string>("");
    const [crisisResult, setCrisisResult] = useState<{
        riskLevel: "Low Risk" | "Elevated Risk" | "Crisis Alert";
        score: number; // 0-100
        keyTokens: string[];
        graphNodes: { label: string; group: "user" | "sentiment" | "risk" | "pattern" }[];
    } | null>(null);

    const samples = [
        {
            label: "Normal/Healthy statement",
            text: "Had a great meeting with the CSRBOX team, feeling inspired about graph neural networks!"
        },
        {
            label: "Anxious / Sleep deprivation warning",
            text: "Struggling to sleep recently due to stress and high anxiety about the upcoming final exams."
        },
        {
            label: "High risk / Crisis cry",
            text: "I can't take this anymore, I'm feeling so alone and helpless. I want to give up..."
        }
    ];

    const runCrisisPrediction = () => {
        if (!crisisText.trim()) return;

        const steps = [
            "Cleaning input text and removing stop words...",
            "Extracting TF-IDF token metrics & polarity indexes...",
            "Passing vector embeddings to Scikit-Learn crisis classifier...",
            "Querying Neo4j database to trace behavioral nodes & associations...",
            "Compiling risk report and rendering graph visualization..."
        ];

        runProgressSim(steps, () => {
            const lowerText = crisisText.toLowerCase();
            let riskLevel: "Low Risk" | "Elevated Risk" | "Crisis Alert" = "Low Risk";
            let score = 12.5;
            let keyTokens: string[] = [];
            let graphNodes: { label: string; group: "user" | "sentiment" | "risk" | "pattern" }[] = [];

            if (lowerText.includes("alone") || lowerText.includes("helpless") || lowerText.includes("give up") || lowerText.includes("take this anymore")) {
                riskLevel = "Crisis Alert";
                score = 92.4;
                keyTokens = Array.from(new Set(lowerText.match(/(alone|helpless|give up|take this anymore)/g) || []));
                graphNodes = [
                    { label: "Client User", group: "user" },
                    { label: "Sentiment: Highly Negative", group: "sentiment" },
                    { label: "Crisis Alert", group: "risk" },
                    { label: "Pattern: Helplessness", group: "pattern" },
                    { label: "Triggers: Existential Distress", group: "pattern" }
                ];
            } else if (lowerText.includes("sleep") || lowerText.includes("anxiety") || lowerText.includes("stress") || lowerText.includes("struggling")) {
                riskLevel = "Elevated Risk";
                score = 54.8;
                keyTokens = Array.from(new Set(lowerText.match(/(sleep|anxiety|stress|struggling)/g) || []));
                graphNodes = [
                    { label: "Client User", group: "user" },
                    { label: "Sentiment: Anxious", group: "sentiment" },
                    { label: "Elevated Risk", group: "risk" },
                    { label: "Pattern: Sleep Deprivation", group: "pattern" },
                    { label: "Context: Exam Stress", group: "pattern" }
                ];
            } else {
                riskLevel = "Low Risk";
                score = 8.1;
                keyTokens = Array.from(new Set(lowerText.match(/(great|inspired|feeling|networks)/g) || []));
                graphNodes = [
                    { label: "Client User", group: "user" },
                    { label: "Sentiment: Positive", group: "sentiment" },
                    { label: "Low Risk", group: "risk" },
                    { label: "Context: Project Collaboration", group: "pattern" }
                ];
            }

            setCrisisResult({ riskLevel, score, keyTokens, graphNodes });
        });
    };

    return (
        <section className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-lg overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-[0.01]">
                <Sparkles className="w-24 h-24 text-white" />
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-6">
                <div>
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2 text-white uppercase">
                        <Activity className="w-4 h-4 text-white animate-pulse" /> Live Working Simulation
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1 font-light">
                        Interact with this mock model instance to test its functionalities directly in your browser.
                    </p>
                </div>
                {status !== "idle" && (
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                            setStatus("idle");
                            setLogs([]);
                            setProgress(0);
                            setDeepshieldResult(null);
                            setVegResult(null);
                            setGreensortResult(null);
                            setRankingResult([]);
                            setCrisisResult(null);
                        }}
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-2" /> Reset Sandbox
                    </Button>
                )}
            </div>

            {/* MAIN DEMOS */}
            <div className="grid lg:grid-cols-5 gap-8">
                
                {/* CONFIGURATION / CONTROL PANEL */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Sliders className="w-4 h-4" /> Parameters
                    </h3>

                    {/* 1. DEEPSHIELD PARAMS */}
                    {projectId === "deepshield" && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Select Image to Test</label>
                                <div className="grid grid-cols-1 gap-2">
                                    <button 
                                        onClick={() => { setDeepshieldImage("real"); setDeepshieldResult(null); }}
                                        className={`p-3 text-left rounded-xl border text-xs transition-all flex items-center justify-between ${deepshieldImage === "real" ? "border-white/20 bg-white/[0.04] font-medium" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                    >
                                        <span>Camera Selfie (Original)</span>
                                        <span className="text-[9px] bg-emerald-950/20 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded font-mono">Real</span>
                                    </button>
                                    <button 
                                        onClick={() => { setDeepshieldImage("fake"); setDeepshieldResult(null); }}
                                        className={`p-3 text-left rounded-xl border text-xs transition-all flex items-center justify-between ${deepshieldImage === "fake" ? "border-white/20 bg-white/[0.04] font-medium" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                    >
                                        <span>AI Generated FaceSwap</span>
                                        <span className="text-[9px] bg-rose-950/20 text-rose-400 border border-rose-900/30 px-2 py-0.5 rounded font-mono">Fake</span>
                                    </button>
                                    <button 
                                        onClick={() => { setDeepshieldImage("compressed"); setDeepshieldResult(null); }}
                                        className={`p-3 text-left rounded-xl border text-xs transition-all flex items-center justify-between ${deepshieldImage === "compressed" ? "border-white/20 bg-white/[0.04] font-medium" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                    >
                                        <span>Compressed Web JPG</span>
                                        <span className="text-[9px] bg-blue-950/20 text-blue-400 border border-blue-900/30 px-2 py-0.5 rounded font-mono">JPEG ELA Test</span>
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 border border-white/5 rounded-xl bg-white/[0.01]">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                                        <Shield className="w-3.5 h-3.5 text-white" /> FGSM Protection Shield
                                    </span>
                                    <input 
                                        type="checkbox" 
                                        id="fgsm"
                                        checked={deepshieldProtected}
                                        onChange={(e) => { setDeepshieldProtected(e.target.checked); setDeepshieldResult(null); }}
                                        className="w-4 h-4 rounded text-white focus:ring-white bg-transparent border-white/10"
                                    />
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-normal">
                                    Apply fast-gradient sign adversarial noise to the original pixel map. This breaks generative models while maintaining structural similarity for human eyes.
                                </p>
                            </div>

                            <Button onClick={runDeepShieldDemo} disabled={status === "running"} className="w-full">
                                {status === "running" ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Run Forensic Scan
                            </Button>
                        </div>
                    )}

                    {/* 2. VEGETABLE CLASSIFIER PARAMS */}
                    {projectId === "vegetable-classifier" && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Select Vegetable Photo</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: "karela", label: "Bitter Gourd (Karela)" },
                                        { id: "parwal", label: "Pointed Gourd (Parwal)" },
                                        { id: "tindora", label: "Ivy Gourd (Tindora)" },
                                        { id: "suran", label: "Elephant Yam (Suran)" }
                                    ].map((v) => (
                                        <button 
                                            key={v.id}
                                            onClick={() => { setVegSelected(v.id as any); setVegResult(null); }}
                                            className={`p-2.5 text-left rounded-xl border text-xs transition-all ${vegSelected === v.id ? "border-white/20 bg-white/[0.04] font-semibold text-white" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                        >
                                            {v.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-2">Model Architecture</label>
                                <select 
                                    value={vegModel} 
                                    onChange={(e) => { setVegModel(e.target.value as any); setVegResult(null); }}
                                    className="w-full px-3 py-2 border border-white/10 bg-black/40 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                                >
                                    <option value="gap">Custom GAP-CNN (Global Average Pooling)</option>
                                    <option value="resnet">Transfer Learning: ResNet18</option>
                                    <option value="depthwise">Depthwise Separable CNN (Mobile-Optimized)</option>
                                </select>
                            </div>

                            <Button onClick={runVegetableClassifier} disabled={status === "running"} className="w-full">
                                {status === "running" ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Classify Crop
                            </Button>
                        </div>
                    )}

                    {/* 3. GREENSORT PARAMS */}
                    {projectId === "greensort" && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">Place Trash Item in Dispenser</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { id: "bottle", label: "Plastic Bottle", icon: "🥤" },
                                        { id: "peel", label: "Banana Peel", icon: "🍌" },
                                        { id: "battery", label: "Lead Battery", icon: "🔋" },
                                        { id: "can", label: "Soda Can", icon: "🥫" }
                                    ].map((item) => (
                                        <button 
                                            key={item.id}
                                            onClick={() => { setWasteItem(item.id as any); setGreensortResult(null); }}
                                            className={`p-3 text-left rounded-xl border text-xs transition-all flex flex-col gap-1.5 ${wasteItem === item.id ? "border-white/20 bg-white/[0.04] font-semibold text-white" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="text-xs">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={runGreensortDemo} disabled={status === "running"} className="w-full">
                                {status === "running" ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Drop Item into Sorter
                            </Button>
                        </div>
                    )}

                    {/* 4. SUPPLIER RANKING PARAMS */}
                    {projectId === "supplier-ranking" && (
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1">
                                    <span>Historical Delay Rate</span>
                                    <span className="font-mono text-accent font-semibold">{delayRate}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="50" value={delayRate} 
                                    onChange={(e) => { setDelayRate(Number(e.target.value)); setRankingResult([]); }}
                                    className="w-full accent-accent bg-secondary rounded-lg h-1.5"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1">
                                    <span>Quality Defect Ratio</span>
                                    <span className="font-mono text-accent font-semibold">{defectRatio}%</span>
                                </div>
                                <input 
                                    type="range" min="0" max="10" step="0.1" value={defectRatio} 
                                    onChange={(e) => { setDefectRatio(Number(e.target.value)); setRankingResult([]); }}
                                    className="w-full accent-accent bg-secondary rounded-lg h-1.5"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1">
                                    <span>Compliance Rating</span>
                                    <span className="font-mono text-accent font-semibold">{compliance}%</span>
                                </div>
                                <input 
                                    type="range" min="50" max="100" value={compliance} 
                                    onChange={(e) => { setCompliance(Number(e.target.value)); setRankingResult([]); }}
                                    className="w-full accent-accent bg-secondary rounded-lg h-1.5"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-medium mb-1">
                                    <span>Cost Index (Lower = Cheaper)</span>
                                    <span className="font-mono text-accent font-semibold">{costIndex} / 10</span>
                                </div>
                                <input 
                                    type="range" min="1" max="10" step="0.1" value={costIndex} 
                                    onChange={(e) => { setCostIndex(Number(e.target.value)); setRankingResult([]); }}
                                    className="w-full accent-accent bg-secondary rounded-lg h-1.5"
                                />
                            </div>

                            <Button onClick={runSupplierRanking} disabled={status === "running"} className="w-full mt-2">
                                {status === "running" ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Run Regression Engine
                            </Button>
                        </div>
                    )}

                    {/* 5. SUICIDE CRISIS PREDICTION PARAMS */}
                    {projectId === "suicide-prediction" && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1.5">Load Predefined Statement</label>
                                <div className="space-y-1.5">
                                    {samples.map((s, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => { setCrisisText(s.text); setSelectedSample(s.text); setCrisisResult(null); }}
                                            className={`w-full p-2 text-left rounded-lg text-[10px] border transition-all ${selectedSample === s.text ? "border-white/20 bg-white/[0.04] font-medium text-white" : "border-white/5 bg-transparent hover:bg-white/[0.02]"}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1">Custom Text Analyzer</label>
                                <textarea
                                    value={crisisText}
                                    onChange={(e) => { setCrisisText(e.target.value); setSelectedSample(""); setCrisisResult(null); }}
                                    placeholder="Type patient behavioral log or crisis chat transcript here..."
                                    rows={4}
                                    className="w-full p-3 border border-white/10 bg-black/40 text-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-white resize-none font-sans"
                                />
                            </div>

                            <Button onClick={runCrisisPrediction} disabled={status === "running" || !crisisText.trim()} className="w-full">
                                {status === "running" ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                                Run NLP Diagnostics
                            </Button>
                        </div>
                    )}

                </div>

                {/* VISUAL MONITOR & REAL-TIME OUTPUT */}
                <div className="lg:col-span-3 flex flex-col justify-between border border-white/5 rounded-xl bg-white/[0.01] p-5 min-h-[350px]">
                    
                    {/* RUNNING / PROCESSING LOG STATE */}
                    {status === "running" && (
                        <div className="h-full flex flex-col justify-between py-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-accent animate-spin" /> Execution in progress...</span>
                                    <span className="font-mono text-xs">{Math.round(progress)}%</span>
                                </div>
                                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                    <div className="bg-accent h-full transition-all duration-300" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                            <div className="mt-6 bg-slate-950 p-4 rounded-xl font-mono text-[10px] text-emerald-400 space-y-1.5 max-h-[160px] overflow-y-auto shadow-inner">
                                {logs.map((log, index) => (
                                    <div key={index} className="line-clamp-1">{log}</div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* IDLE STATE */}
                    {status === "idle" && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center text-accent mb-4 border border-accent/10">
                                <Sliders className="w-8 h-8" />
                            </div>
                            <h4 className="font-bold text-lg font-heading">Waiting for Inputs</h4>
                            <p className="text-xs text-muted-foreground max-w-sm mt-1">
                                Adjust parameters on the configuration panel and hit the action button to initialize model analysis.
                            </p>
                        </div>
                    )}

                    {/* DONE / COMPLETED STATE */}
                    {status === "done" && (
                        <div className="h-full flex flex-col justify-between gap-6">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 font-mono">Diagnostics Output</span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-900/30 font-mono">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                                </span>
                            </div>

                            <div className="flex-1">
                                
                                {/* 1. DEEPSHIELD OUTPUTS */}
                                {projectId === "deepshield" && deepshieldResult && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`px-3 py-1 rounded font-bold text-[10px] uppercase tracking-wider font-mono ${deepshieldResult.isFake ? "bg-red-950/20 text-red-400 border border-red-900/30" : "bg-emerald-950/20 text-emerald-400 border border-emerald-900/30"}`}>
                                                {deepshieldResult.isFake ? "Deepfake Flagged" : "Authentic Verified"}
                                            </div>
                                            <span className="text-[11px] text-zinc-400 font-mono">
                                                Confidence: <strong className="text-white">{deepshieldResult.confidence}%</strong>
                                            </span>
                                        </div>

                                        {/* Image Display Panel tabs */}
                                        <div className="border border-white/5 rounded-xl overflow-hidden bg-black/20">
                                            <div className="flex bg-white/[0.01] border-b border-white/5 text-[9px] font-mono uppercase tracking-wider">
                                                <button 
                                                    onClick={() => setActiveTab("normal")}
                                                    className={`px-3 py-2 border-r border-white/5 transition-colors ${activeTab === "normal" ? "bg-black/20 font-bold text-white" : "text-zinc-500 hover:bg-white/[0.02]"}`}
                                                >
                                                    Visual Spectrum
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab("ela")}
                                                    className={`px-3 py-2 border-r border-white/5 transition-colors ${activeTab === "ela" ? "bg-black/20 font-bold text-white" : "text-zinc-500 hover:bg-white/[0.02]"}`}
                                                >
                                                    JPEG ELA (Digital Error)
                                                </button>
                                                <button 
                                                    onClick={() => setActiveTab("heatmap")}
                                                    className={`px-3 py-2 transition-colors ${activeTab === "heatmap" ? "bg-black/20 font-bold text-white" : "text-zinc-500 hover:bg-white/[0.02]"}`}
                                                >
                                                    Grad-CAM Heatmap
                                                </button>
                                            </div>

                                            <div className="relative h-32 w-full flex items-center justify-center p-4 bg-black/40 overflow-hidden">
                                                {/* Scanning horizontal line */}
                                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(223,186,115,0.015)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />
                                                <div className="absolute left-0 right-0 h-0.5 bg-amber-400/40 shadow-[0_0_8px_rgba(223,186,115,0.6)] animate-[scan_3s_linear_infinite] z-20 pointer-events-none" />

                                                {activeTab === "normal" && (
                                                    <div className={`w-20 h-20 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden ${deepshieldProtected ? "contrast-125 saturate-50" : ""}`}>
                                                        <span className="text-3xl">{deepshieldImage === "fake" ? "🤖" : "👤"}</span>
                                                        {deepshieldProtected && (
                                                            <div className="absolute inset-0 bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                                                                <ShieldCheck className="w-5 h-5 text-amber-400 animate-pulse" />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {activeTab === "ela" && (
                                                    <div className="w-full h-full bg-slate-950 font-mono text-[9px] text-amber-500 p-2.5 flex flex-col justify-center gap-1.5 select-none border border-amber-950/20">
                                                        <div className="flex justify-between border-b border-amber-950/40 pb-1">
                                                            <span>Rescale Offset: 0.95</span>
                                                            <span>Forensic Score: {deepshieldResult.forensicScore}%</span>
                                                        </div>
                                                        <div className="text-[7.5px] text-amber-400/70 leading-tight truncate">
                                                            {deepshieldImage === "fake" 
                                                                ? "|||||||||| GAN ARTIFACT DETECTED AT COORD C0-E4 ||||||||||" 
                                                                : deepshieldImage === "compressed"
                                                                ? "|||||| Compression boundaries flagged (Resave artifacts) ||||||"
                                                                : "|||||| Minimal compression loss (Organic pixel map) ||||||"}
                                                        </div>
                                                        <div className="w-full h-8 border border-amber-950/30 flex items-center justify-around">
                                                            <div className={`w-2 h-6 bg-amber-400/20 rounded ${deepshieldResult.forensicScore > 50 ? "animate-pulse bg-amber-400/60" : ""}`} />
                                                            <div className={`w-4 h-4 bg-amber-400/25 rounded ${deepshieldResult.forensicScore > 30 ? "animate-pulse bg-amber-400/50" : ""}`} />
                                                            <div className={`w-3 h-5 bg-amber-400/10 rounded ${deepshieldResult.forensicScore > 70 ? "animate-pulse bg-amber-400/80" : ""}`} />
                                                        </div>
                                                    </div>
                                                )}

                                                {activeTab === "heatmap" && (
                                                    <div className="relative w-20 h-20 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-3xl">
                                                        <span>{deepshieldImage === "fake" ? "🤖" : "👤"}</span>
                                                        <div className={`absolute inset-0 rounded-full mix-blend-color-dodge opacity-60 bg-gradient-to-tr ${deepshieldImage === "fake" ? "from-red-500 via-yellow-400 to-transparent" : "from-amber-500/20 to-transparent"}`} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-[11px] text-muted-foreground leading-normal">
                                            {deepshieldProtected 
                                                ? "✨ Adversarial protection detected! The model successfully misclassified the threat vector due to the mathematical noise layer overlay, safeguarding identity properties."
                                                : deepshieldResult.isFake 
                                                ? "⚠️ High classification anomaly index. ViT flagged inconsistent lighting vectors on eye contours, while ELA showed distinct boundary shifts." 
                                                : "✅ Natural pixel distribution. Compression metadata aligned with sensor profile."}
                                        </p>
                                    </div>
                                )}

                                {/* 2. VEGETABLE CLASSIFIER OUTPUTS */}
                                {projectId === "vegetable-classifier" && vegResult && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between bg-black/20 border border-white/5 p-4 rounded-xl">
                                            <div>
                                                <h5 className="font-bold text-sm text-white">{vegResult.name}</h5>
                                                <p className="text-[10px] text-zinc-500 italic">{vegResult.scientificName}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-extrabold text-white">{vegResult.confidence}%</div>
                                                <div className="text-[9px] text-zinc-500 font-mono">confidence</div>
                                            </div>
                                        </div>

                                        {/* Animated Neural Network Propagation Schema */}
                                        <div className="border border-white/5 bg-black/20 p-4 rounded-xl relative overflow-hidden">
                                            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-3 flex items-center justify-between">
                                                <span>CNN Layer Convolutions & Activations</span>
                                                <span className="text-amber-400 font-bold animate-pulse">Active State Feedforward</span>
                                            </div>
                                            <div className="h-24 w-full flex items-center justify-center">
                                                <svg className="w-full h-full max-w-[280px]" viewBox="0 0 280 100">
                                                    <g className="stroke-white/[0.04] stroke-[0.75]">
                                                        <line x1="20" y1="20" x2="100" y2="20" className="animate-[pulse_1.5s_infinite]" />
                                                        <line x1="20" y1="20" x2="100" y2="50" />
                                                        <line x1="20" y1="20" x2="100" y2="80" />
                                                        <line x1="20" y1="50" x2="100" y2="20" />
                                                        <line x1="20" y1="50" x2="100" y2="50" className="animate-[pulse_1.8s_infinite]" style={{ animationDelay: "0.2s" }} />
                                                        <line x1="20" y1="50" x2="100" y2="80" />
                                                        <line x1="20" y1="80" x2="100" y2="20" />
                                                        <line x1="20" y1="80" x2="100" y2="50" />
                                                        <line x1="20" y1="80" x2="100" y2="80" className="animate-[pulse_1.2s_infinite]" style={{ animationDelay: "0.4s" }} />

                                                        <line x1="100" y1="20" x2="180" y2="20" />
                                                        <line x1="100" y1="20" x2="180" y2="50" />
                                                        <line x1="100" y1="20" x2="180" y2="80" />
                                                        <line x1="100" y1="50" x2="180" y2="20" />
                                                        <line x1="100" y1="50" x2="180" y2="50" />
                                                        <line x1="100" y1="50" x2="180" y2="80" />
                                                        <line x1="100" y1="80" x2="180" y2="20" />
                                                        <line x1="100" y1="80" x2="180" y2="50" />
                                                        <line x1="100" y1="80" x2="180" y2="80" />

                                                        <line x1="180" y1="20" x2="260" y2="35" stroke="rgba(223, 186, 115, 0.15)" />
                                                        <line x1="180" y1="20" x2="260" y2="65" stroke="rgba(223, 186, 115, 0.15)" />
                                                        <line x1="180" y1="50" x2="260" y2="35" stroke="rgba(223, 186, 115, 0.15)" />
                                                        <line x1="180" y1="50" x2="260" y2="65" stroke="rgba(223, 186, 115, 0.15)" />
                                                        <line x1="180" y1="80" x2="260" y2="35" stroke="rgba(223, 186, 115, 0.15)" />
                                                        <line x1="180" y1="80" x2="260" y2="65" stroke="rgba(223, 186, 115, 0.15)" />
                                                    </g>

                                                    <circle cx="20" cy="50" r="2" fill="#DFBA73" className="animate-[ping_2s_infinite]" />
                                                    <circle cx="100" cy="20" r="2.5" fill="#DFBA73" className="animate-[ping_2.5s_infinite]" style={{ animationDelay: "0.5s" }} />
                                                    <circle cx="180" cy="80" r="2.5" fill="#DFBA73" className="animate-[ping_2.2s_infinite]" style={{ animationDelay: "0.8s" }} />

                                                    <g className="fill-zinc-950 stroke-[1.25]">
                                                        <circle cx="20" cy="20" r="4.5" stroke="rgba(255,255,255,0.4)" />
                                                        <circle cx="20" cy="50" r="4.5" stroke="rgba(255,255,255,0.4)" />
                                                        <circle cx="20" cy="80" r="4.5" stroke="rgba(255,255,255,0.4)" />

                                                        <circle cx="100" cy="20" r="5" stroke="rgba(255,255,255,0.6)" />
                                                        <circle cx="100" cy="50" r="5" stroke="rgba(255,255,255,0.6)" />
                                                        <circle cx="100" cy="80" r="5" stroke="rgba(255,255,255,0.6)" />

                                                        <circle cx="180" cy="20" r="5" stroke="rgba(255,255,255,0.6)" />
                                                        <circle cx="180" cy="50" r="5" stroke="rgba(255,255,255,0.6)" />
                                                        <circle cx="180" cy="80" r="5" stroke="rgba(255,255,255,0.6)" />

                                                        <circle cx="260" cy="35" r="6" stroke="#DFBA73" className="fill-amber-500/10" />
                                                        <circle cx="260" cy="65" r="6" stroke="rgba(255,255,255,0.4)" />
                                                    </g>

                                                    <g className="fill-zinc-500 font-mono text-[5.5px] select-none text-center" textAnchor="middle">
                                                        <text x="20" y="93">INPUT</text>
                                                        <text x="100" y="93">CONV2D</text>
                                                        <text x="180" y="93">FLATTEN</text>
                                                        <text x="260" y="93">DENSE</text>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div className="p-3 border border-white/5 bg-black/20 rounded-lg">
                                                <div className="text-[10px] text-zinc-500 uppercase font-medium">Inference Latency</div>
                                                <div className="text-lg font-bold font-mono text-white mt-0.5">{vegResult.latency} ms</div>
                                            </div>
                                            <div className="p-3 border border-white/5 bg-black/20 rounded-lg">
                                                <div className="text-[10px] text-zinc-500 uppercase font-medium">Weight Complexity</div>
                                                <div className="text-xs font-bold font-mono text-white mt-1 truncate">{vegResult.modelParams}</div>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg flex gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                                            <p className="text-[10px] text-zinc-300 leading-snug">
                                                Custom GAP-CNN reaches standard ResNet18 output accuracies while reducing parameters by <strong>90%</strong> and compute latency by <strong>83%</strong> on edge configurations.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* 3. GREENSORT OUTPUTS */}
                                {projectId === "greensort" && greensortResult && (
                                    <div className="space-y-4">
                                        <div className="p-4 border border-white/5 bg-black/20 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">
                                                    {wasteItem === "bottle" ? "🥤" : wasteItem === "peel" ? "🍌" : wasteItem === "battery" ? "🔋" : "🥫"}
                                                </span>
                                                <div>
                                                    <span className="text-[10px] font-semibold text-zinc-500 uppercase font-mono">YOLOv8 Output</span>
                                                    <h5 className="font-bold text-sm leading-tight flex items-center gap-1.5 text-white">
                                                        {greensortResult.category}
                                                        <span className="text-xs text-zinc-400">({greensortResult.confidence}%)</span>
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold font-mono text-zinc-500">Servo Motor</div>
                                                <div className="text-sm font-extrabold text-white">{greensortResult.servoAngle}° Angle</div>
                                            </div>
                                        </div>

                                        {/* Oscilloscope hardware telemetry wave */}
                                        <div className="p-3 border border-white/5 bg-black/20 rounded-xl space-y-2">
                                            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-between">
                                                <span>Edge TPU Hardware Telemetry</span>
                                                <span className="text-amber-400 font-semibold font-mono animate-pulse">SPI Buffer: OK</span>
                                            </div>
                                            <div className="h-10 w-full bg-slate-950 border border-zinc-900 rounded-lg relative overflow-hidden flex items-center">
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(223,186,115,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(223,186,115,0.015)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                                <svg className="w-full h-full text-amber-500/40 opacity-70" viewBox="0 0 200 40">
                                                    <path 
                                                        d="M 0,20 Q 25,5 50,20 T 100,20 T 150,20 T 200,20" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="0.75"
                                                        strokeDasharray="4 2"
                                                    />
                                                    <path 
                                                        d="M 0,20 L 20,20 L 30,5 L 40,35 L 50,20 L 100,20 L 110,10 L 120,30 L 130,20 L 200,20" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        strokeWidth="1"
                                                    />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Graphic belt representation */}
                                        <div className="h-16 w-full relative bg-black/20 border border-white/5 rounded-xl overflow-hidden flex items-center justify-between px-6">
                                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_2px,transparent_2px)] bg-[size:16px_100%] opacity-20" />
                                            
                                            <div className="text-xs font-mono text-zinc-500">Gate State:</div>
                                            
                                            {/* Gate representation rotating */}
                                            <div className="relative w-16 h-8 flex items-center justify-center">
                                                <div 
                                                    className="w-12 h-1 bg-white/40 rounded transition-transform duration-500 origin-center" 
                                                    style={{ transform: `rotate(${greensortResult.servoAngle - 90}deg)` }}
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <span className={`w-3.5 h-3.5 rounded-full ${greensortResult.category === "Recyclable" ? "bg-blue-500" : greensortResult.category === "Biodegradable" ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                                                <span className="text-[10px] font-mono text-zinc-400">{greensortResult.category} Box</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                                            <span>Telemetry: UART Serial port connected</span>
                                            <span>Bin Capacity: {greensortResult.binCapacity}%</span>
                                        </div>
                                    </div>
                                )}

                                {/* 4. SUPPLIER RANKING OUTPUTS */}
                                {projectId === "supplier-ranking" && rankingResult.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="space-y-2.5">
                                            {rankingResult.map((supplier, idx) => (
                                                <div key={idx} className="p-3 border border-white/5 bg-black/20 rounded-xl flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs font-mono text-white">
                                                            {idx + 1}
                                                        </span>
                                                        <div>
                                                            <h5 className="font-bold text-xs text-white">{supplier.name}</h5>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className={`w-1.5 h-1.5 rounded-full ${supplier.risk === "Low" ? "bg-green-500" : supplier.risk === "Moderate" ? "bg-amber-500" : "bg-red-500"}`} />
                                                                <span className="text-[9px] text-zinc-500 font-mono">{supplier.risk} Risk Profile</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Score bar */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden hidden sm:block">
                                                            <div className="bg-white h-full" style={{ width: `${supplier.score}%` }} />
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-xs font-bold font-mono text-white">{supplier.score}</div>
                                                            <div className="text-[8px] text-zinc-500 uppercase font-semibold font-mono">Index Score</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <p className="text-[10px] text-zinc-500 italic leading-normal">
                                            * Regression model dynamically calculates supplier performance index weights. High Delay rate (&gt;20%) and quality defect ratios (&gt;4%) automatically trigger a &quot;High Risk&quot; compliance flag.
                                        </p>
                                    </div>
                                )}

                                {/* 5. SUICIDE CRISIS PREDICTION OUTPUTS */}
                                {projectId === "suicide-prediction" && crisisResult && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border border-white/5 p-4 rounded-xl bg-black/20">
                                            <div>
                                                <span className="text-[10px] font-semibold text-zinc-500 uppercase font-mono">Model Assessment</span>
                                                <h5 className={`font-extrabold text-sm ${crisisResult.riskLevel === "Crisis Alert" ? "text-red-500" : crisisResult.riskLevel === "Elevated Risk" ? "text-amber-500" : "text-emerald-500"}`}>
                                                    {crisisResult.riskLevel}
                                                </h5>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[10px] font-semibold text-zinc-500 uppercase font-mono">Severity Index</span>
                                                <div className="text-sm font-mono font-bold text-white">{crisisResult.score} / 100</div>
                                            </div>
                                        </div>

                                        {/* Graph Visualizer simulation */}
                                        <div>
                                            <span className="block text-[9px] font-semibold text-zinc-500 uppercase font-mono mb-2">Neo4j Active Subgraph (Trace Nodes)</span>
                                            <div className="h-32 w-full border border-white/5 bg-black/20 rounded-xl p-3 relative flex items-center justify-center gap-4 overflow-hidden">
                                                
                                                {/* Center Node (User) */}
                                                <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-amber-500/5 flex items-center justify-center text-[10px] font-bold relative z-10 animate-pulse hover:scale-105 transition-transform cursor-pointer">
                                                    Patient
                                                </div>

                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <svg className="w-full h-full opacity-30 text-amber-500" viewBox="0 0 300 120">
                                                        <line x1="150" y1="60" x2="80" y2="30" stroke="currentColor" strokeWidth="0.75" />
                                                        <line x1="150" y1="60" x2="220" y2="30" stroke="currentColor" strokeWidth="0.75" />
                                                        <line x1="150" y1="60" x2="80" y2="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3" />
                                                        <line x1="150" y1="60" x2="220" y2="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3" />
                                                        {/* Glowing pulse along node edges */}
                                                        <circle cx="150" cy="60" r="2" fill="currentColor" className="animate-[ping_3s_infinite]" />
                                                    </svg>
                                                </div>

                                                {/* Peripheral nodes */}
                                                <div className="absolute top-2 left-6 px-2.5 py-1 rounded border border-white/10 bg-zinc-950 text-[8.5px] font-mono text-zinc-300 hover:border-amber-400/50 cursor-pointer transition-colors shadow-sm">
                                                    {crisisResult.graphNodes[1]?.label || "Sentiment: Pending"}
                                                </div>
                                                <div className="absolute top-2 right-6 px-2.5 py-1 rounded border border-white/10 bg-zinc-950 text-[8.5px] font-mono text-zinc-300 hover:border-amber-400/50 cursor-pointer transition-colors shadow-sm">
                                                    {crisisResult.graphNodes[2]?.label || "Risk: Pending"}
                                                </div>
                                                <div className="absolute bottom-2 left-4 px-2.5 py-1 rounded border border-white/10 bg-zinc-950 text-[8.5px] font-mono text-zinc-300 hover:border-amber-400/50 cursor-pointer transition-colors shadow-sm">
                                                    {crisisResult.graphNodes[3]?.label || "Pattern: Pending"}
                                                </div>
                                                <div className="absolute bottom-2 right-4 px-2.5 py-1 rounded border border-white/10 bg-zinc-950 text-[8.5px] font-mono text-zinc-300 hover:border-amber-400/50 cursor-pointer transition-colors shadow-sm">
                                                    {crisisResult.graphNodes[4]?.label || "Context: Pending"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Highlighted NLP terms */}
                                        <div className="flex flex-wrap gap-1.5 items-center">
                                            <span className="text-[9px] font-semibold text-zinc-500 uppercase font-mono mr-1">Flagged NLP Tokens:</span>
                                            {crisisResult.keyTokens.length > 0 ? (
                                                crisisResult.keyTokens.map((t, i) => (
                                                    <span key={i} className="px-2.5 py-0.5 rounded bg-red-950/20 text-red-400 text-[9.5px] font-mono border border-red-200/50">
                                                        &quot;{t}&quot;
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-[9.5px] text-zinc-500 italic font-mono">None Flagged</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* BACK TO INQUIRE CALL */}
                            <div className="border-t border-white/5 pt-4 flex items-center justify-between text-xs">
                                <span className="text-zinc-500 font-light">Interested in this implementation?</span>
                                <a 
                                    href={`/contact?service=${
                                        projectId === "deepshield" ? "computer-vision" : 
                                        projectId === "vegetable-classifier" ? "computer-vision" : 
                                        projectId === "greensort" ? "iot-edge" : 
                                        projectId === "supplier-ranking" ? "data-engineering" : 
                                        "ml-nlp"
                                    }`}
                                    className="group text-xs font-semibold text-white hover:text-zinc-300 flex items-center gap-1 transition-all duration-300"
                                >
                                    Discuss Collaboration <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
