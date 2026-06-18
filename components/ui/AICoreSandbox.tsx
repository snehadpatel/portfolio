"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Cpu, X, RotateCcw, Zap, Gamepad2, 
    Layers, RefreshCw, CheckCircle 
} from "lucide-react";

// Types for Game 1: EdgeSift
interface SorterItem {
    id: number;
    type: "recyclable" | "organic" | "hazardous";
    label: string;
    iconKey: string;
    x: number;
    y: number;
    speed: number;
    width: number;
    height: number;
    confidence: number;
    detectedClass: "recyclable" | "organic" | "hazardous" | "unknown";
    status: "conveyor" | "sorting" | "sorted" | "missed";
    sortProgress: number; // 0 to 1
    targetBinY: number;
    isCorrect?: boolean;
}

const ITEMS_POOL = [
    { type: "recyclable", label: "Soda Can", iconKey: "can" },
    { type: "recyclable", label: "Water Bottle", iconKey: "bottle" },
    { type: "recyclable", label: "Cardboard Box", iconKey: "box" },
    { type: "organic", label: "Banana Peel", iconKey: "banana" },
    { type: "organic", label: "Apple Core", iconKey: "apple" },
    { type: "organic", label: "Carrot Waste", iconKey: "carrot" },
    { type: "hazardous", label: "Battery", iconKey: "battery" },
    { type: "hazardous", label: "Light Bulb", iconKey: "bulb" },
    { type: "hazardous", label: "Spray Can", iconKey: "spray" }
] as const;

// Types for Game 2: IoT Linker
type TileType = "straight" | "corner" | "t-junction" | "cross" | "empty";

interface CircuitTile {
    row: number;
    col: number;
    type: TileType;
    rotation: number; // 0 = 0deg, 1 = 90deg, 2 = 180deg, 3 = 270deg
    isActive: boolean;
}

// Constants for IoT Linker grid
const GRID_SIZE = 4;
const startCell = { row: 1, col: 0 }; // VCC +5V Input
const endCell = { row: 2, col: 3 };   // ESP32 Output

// Helper to draw clean vector icon shapes on canvas
const drawVectorItem = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    iconKey: string, 
    color: string
) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (iconKey) {
        case "can":
            // Cylinder top ellipse
            ctx.beginPath();
            ctx.ellipse(x + w/2, y + h*0.2, w*0.28, h*0.08, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Bottom ellipse arc
            ctx.beginPath();
            ctx.ellipse(x + w/2, y + h*0.8, w*0.28, h*0.08, 0, 0, Math.PI);
            ctx.stroke();
            
            // Sides
            ctx.beginPath();
            ctx.moveTo(x + w*0.22, y + h*0.2);
            ctx.lineTo(x + w*0.22, y + h*0.8);
            ctx.moveTo(x + w*0.78, y + h*0.2);
            ctx.lineTo(x + w*0.78, y + h*0.8);
            
            // Tab at top
            ctx.moveTo(x + w/2, y + h*0.2);
            ctx.lineTo(x + w/2, y + h*0.1);
            ctx.stroke();
            break;
            
        case "bottle":
            ctx.beginPath();
            // Cap
            ctx.rect(x + w*0.38, y + h*0.08, w*0.24, h*0.1);
            // Neck
            ctx.moveTo(x + w*0.38, y + h*0.18);
            ctx.lineTo(x + w*0.38, y + h*0.28);
            // Neck slope to body
            ctx.lineTo(x + w*0.22, y + h*0.42);
            // Body
            ctx.lineTo(x + w*0.22, y + h*0.82);
            // Bottom
            ctx.lineTo(x + w*0.78, y + h*0.82);
            ctx.lineTo(x + w*0.78, y + h*0.42);
            ctx.lineTo(x + w*0.62, y + h*0.28);
            ctx.lineTo(x + w*0.62, y + h*0.18);
            ctx.stroke();
            break;
            
        case "box":
            const cx = x + w/2;
            const cy = y + h/2;
            ctx.beginPath();
            // Top face of isometric cube
            ctx.moveTo(cx, y + h*0.1);
            ctx.lineTo(x + w*0.9, cy - h*0.15);
            ctx.lineTo(cx, y + h*0.85 - h*0.2);
            ctx.lineTo(x + w*0.1, cy - h*0.15);
            ctx.closePath();
            ctx.stroke();
            
            // Vertical outer ribs
            ctx.beginPath();
            ctx.moveTo(x + w*0.1, cy - h*0.15);
            ctx.lineTo(x + w*0.1, y + h*0.8);
            ctx.moveTo(x + w*0.9, cy - h*0.15);
            ctx.lineTo(x + w*0.9, y + h*0.8);
            ctx.moveTo(cx, y + h*0.85 - h*0.2);
            ctx.lineTo(cx, y + h*0.88);
            ctx.stroke();
            
            // Bottom ribs
            ctx.beginPath();
            ctx.moveTo(x + w*0.1, y + h*0.8);
            ctx.lineTo(cx, y + h*0.88);
            ctx.lineTo(x + w*0.9, y + h*0.8);
            ctx.stroke();
            break;
            
        case "banana":
            // Curved outer banana stem arc
            ctx.beginPath();
            ctx.arc(x + w*0.75, y + h*0.25, w*0.55, Math.PI * 0.55, Math.PI * 1.15);
            ctx.stroke();
            
            // Inner banana curve
            ctx.beginPath();
            ctx.arc(x + w*0.6, y + h*0.4, w*0.4, Math.PI * 0.55, Math.PI * 1.15);
            ctx.stroke();
            
            // Peel flaps splayed out
            ctx.beginPath();
            ctx.moveTo(x + w*0.45, y + h*0.55);
            ctx.quadraticCurveTo(x + w*0.15, y + h*0.4, x + w*0.1, y + h*0.7);
            ctx.moveTo(x + w*0.45, y + h*0.55);
            ctx.quadraticCurveTo(x + w*0.65, y + h*0.85, x + w*0.85, y + h*0.75);
            ctx.stroke();
            break;
            
        case "apple":
            ctx.beginPath();
            // Left profile curve
            ctx.moveTo(x + w/2, y + h*0.2);
            ctx.bezierCurveTo(x - w*0.15, y + h*0.15, x - w*0.1, y + h*0.75, x + w/2, y + h*0.82);
            // Right profile curve
            ctx.bezierCurveTo(x + w*1.1, y + h*0.75, x + w*1.15, y + h*0.15, x + w/2, y + h*0.2);
            ctx.stroke();
            
            // Apple stem
            ctx.beginPath();
            ctx.moveTo(x + w/2, y + h*0.2);
            ctx.quadraticCurveTo(x + w*0.6, y + h*0.05, x + w*0.7, y + h*0.08);
            ctx.stroke();
            break;
            
        case "carrot":
            ctx.beginPath();
            // Carrot cone body pointing down-left
            ctx.moveTo(x + w*0.78, y + h*0.22);
            ctx.lineTo(x + w*0.58, y + h*0.42);
            ctx.lineTo(x + w*0.18, y + h*0.82); // Tip
            ctx.lineTo(x + w*0.42, y + h*0.58);
            ctx.closePath();
            ctx.stroke();
            
            // Green leafy top details
            ctx.beginPath();
            ctx.moveTo(x + w*0.78, y + h*0.22);
            ctx.lineTo(x + w*0.88, y + h*0.06);
            ctx.moveTo(x + w*0.78, y + h*0.22);
            ctx.lineTo(x + w*0.94, y + h*0.26);
            ctx.stroke();
            break;
            
        case "battery":
            // Battery body outer outline
            ctx.beginPath();
            ctx.rect(x + w*0.24, y + h*0.18, w*0.52, h*0.64);
            ctx.stroke();
            
            // Positive terminal contact on top
            ctx.fillStyle = color;
            ctx.fillRect(x + w*0.42, y + h*0.08, w*0.16, h*0.1);
            
            // Grid level bars
            ctx.fillStyle = color;
            ctx.fillRect(x + w*0.32, y + h*0.3, w*0.36, h*0.1);
            ctx.fillRect(x + w*0.32, y + h*0.48, w*0.36, h*0.1);
            ctx.fillRect(x + w*0.32, y + h*0.66, w*0.36, h*0.1);
            break;
            
        case "bulb":
            // Lightbulb glass outer shell
            ctx.beginPath();
            ctx.arc(x + w/2, y + h*0.42, w*0.28, Math.PI * 0.76, Math.PI * 0.24);
            ctx.lineTo(x + w*0.64, y + h*0.74);
            ctx.lineTo(x + w*0.36, y + h*0.74);
            ctx.closePath();
            ctx.stroke();
            
            // Screw contact lines at base
            ctx.beginPath();
            ctx.moveTo(x + w*0.38, y + h*0.78);
            ctx.lineTo(x + w*0.62, y + h*0.78);
            ctx.moveTo(x + w*0.42, y + h*0.84);
            ctx.lineTo(x + w*0.58, y + h*0.84);
            ctx.stroke();
            
            // Filament inside
            ctx.beginPath();
            ctx.moveTo(x + w*0.44, y + h*0.56);
            ctx.lineTo(x + w*0.46, y + h*0.42);
            ctx.lineTo(x + w*0.54, y + h*0.42);
            ctx.lineTo(x + w*0.56, y + h*0.56);
            ctx.stroke();
            break;
            
        case "spray":
            // Aerosol spray can body outline
            ctx.beginPath();
            ctx.rect(x + w*0.26, y + h*0.28, w*0.48, h*0.58);
            ctx.stroke();
            
            // Shoulder curve details
            ctx.beginPath();
            ctx.moveTo(x + w*0.26, y + h*0.28);
            ctx.quadraticCurveTo(x + w*0.26, y + h*0.2, x + w*0.38, y + h*0.2);
            ctx.lineTo(x + w*0.62, y + h*0.2);
            ctx.quadraticCurveTo(x + w*0.74, y + h*0.28, x + w*0.74, y + h*0.28);
            ctx.stroke();
            
            // Dispensing nozzle on top
            ctx.beginPath();
            ctx.moveTo(x + w/2, y + h*0.2);
            ctx.lineTo(x + w/2, y + h*0.1);
            ctx.lineTo(x + w*0.42, y + h*0.1);
            ctx.stroke();
            
            // Particle spray cloud dots
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x + w*0.26, y + h*0.06, 1.2, 0, Math.PI * 2);
            ctx.arc(x + w*0.14, y + h*0.12, 1, 0, Math.PI * 2);
            ctx.fill();
            break;
    }

    ctx.restore();
};

export default function AICoreSandbox() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"edgesift" | "iotlinker">("edgesift");
    
    // --- GENERAL STATES ---
    const containerRef = useRef<HTMLDivElement>(null);

    // --- GAME 1: EDGESIFT STATES & REFS ---
    const siftCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [siftAutopilot, setSiftAutopilot] = useState(true);
    const [confidenceThreshold, setConfidenceThreshold] = useState(0.75);
    const [useTPU, setUseTPU] = useState(false);
    const [siftStats, setSiftStats] = useState({
        sorted: 0,
        misclassified: 0,
        missed: 0,
        accuracy: 100,
        fps: 0,
        latency: 45
    });
    
    const siftStateRef = useRef({
        items: [] as SorterItem[],
        nextId: 1,
        stats: { sorted: 0, misclassified: 0, missed: 0 },
        lastSpawnTime: 0,
        lastFrameTime: 0,
        fpsFilter: 60,
        latencyVal: 45,
        autopilot: true,
        threshold: 0.75,
        tpu: false
    });

    // Sync refs with React state to access inside requestAnimationFrame
    useEffect(() => {
        siftStateRef.current.autopilot = siftAutopilot;
        siftStateRef.current.threshold = confidenceThreshold;
        siftStateRef.current.tpu = useTPU;
        siftStateRef.current.latencyVal = useTPU ? 4 : 42;
    }, [siftAutopilot, confidenceThreshold, useTPU]);

    // --- GAME 2: IOT LINKER STATES & REFS ---
    const linkerCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [linkerScore, setLinkerScore] = useState(0);
    const [circuitGrid, setCircuitGrid] = useState<CircuitTile[]>([]);
    const [circuitConnected, setCircuitConnected] = useState(false);
    const gridRef = useRef<CircuitTile[]>([]);
    const linkerParticlesRef = useRef<{ x: number; y: number; progress: number; path: {x: number, y: number}[] }[]>([]);

    // IoT Linker constants (moved static)

    // Initialize/Regenerate IoT grid
    const generateCircuit = useCallback(() => {
        const tiles: CircuitTile[] = [];
        const types: TileType[] = ["straight", "corner", "t-junction", "cross"];
        
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                // Keep it simple: pick a random type and random rotation
                const randomType = types[Math.floor(Math.random() * types.length)];
                const randomRotation = Math.floor(Math.random() * 4);
                tiles.push({
                    row: r,
                    col: c,
                    type: randomType,
                    rotation: randomRotation,
                    isActive: false
                });
            }
        }
        
        // Guarantee that start and end cells have appropriate tiles (no empty)
        const startIdx = startCell.row * GRID_SIZE + startCell.col;
        const endIdx = endCell.row * GRID_SIZE + endCell.col;
        tiles[startIdx].type = Math.random() > 0.5 ? "straight" : "corner";
        tiles[endIdx].type = Math.random() > 0.5 ? "straight" : "corner";

        setCircuitGrid(tiles);
        gridRef.current = tiles;
        setCircuitConnected(false);
        linkerParticlesRef.current = [];
    }, []);

    // Load IoT Linker on tab swap or open
    useEffect(() => {
        if (activeTab === "iotlinker" && circuitGrid.length === 0) {
            generateCircuit();
        }
    }, [activeTab, circuitGrid.length, generateCircuit]);

    // --- EDGESIFT LOGIC ---
    // Handle manual sorting button click
    const handleManualSort = (binType: "recyclable" | "organic" | "hazardous") => {
        if (siftAutopilot) return;
        
        // Find the oldest unsorted item currently passing the sensor line (x between 160 and 240)
        const items = siftStateRef.current.items;
        const target = items.find(
            item => item.status === "conveyor" && item.x > 130 && item.x < 250
        );

        if (target) {
            triggerSort(target, binType);
        }
    };

    const triggerSort = useCallback((item: SorterItem, binType: "recyclable" | "organic" | "hazardous") => {
        item.status = "sorting";
        item.detectedClass = binType;
        item.isCorrect = item.type === binType;
        
        // Setup sorting target coordinates (Y coordinates of bins at bottom)
        const targetY = 160; 
        item.targetBinY = targetY;

        if (item.isCorrect) {
            siftStateRef.current.stats.sorted++;
        } else {
            siftStateRef.current.stats.misclassified++;
        }
        updateStats();
    }, []);

    const updateStats = () => {
        const { sorted, misclassified, missed } = siftStateRef.current.stats;
        const total = sorted + misclassified + missed;
        const accuracy = total > 0 ? Math.round((sorted / total) * 100) : 100;
        
        setSiftStats(prev => ({
            ...prev,
            sorted,
            misclassified,
            missed,
            accuracy,
            latency: siftStateRef.current.latencyVal
        }));
    };

    // EdgeSift Game Loop
    useEffect(() => {
        if (!isOpen || activeTab !== "edgesift") return;

        const canvas = siftCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const state = siftStateRef.current;
        state.lastFrameTime = performance.now();
        state.lastSpawnTime = performance.now();

        const spawnItem = () => {
            const proto = ITEMS_POOL[Math.floor(Math.random() * ITEMS_POOL.length)];
            
            // Generate prediction with some confidence
            const isTpu = state.tpu;
            const rand = Math.random();
            let predicted: "recyclable" | "organic" | "hazardous" | "unknown" = "unknown";
            let confidence = 0.4 + Math.random() * 0.58;

            if (isTpu) {
                // TPU runs a larger, optimized model: 98% accuracy, high confidence
                confidence = 0.85 + Math.random() * 0.14;
                predicted = rand < 0.98 ? proto.type : ITEMS_POOL.find(i => i.type !== proto.type)!.type;
            } else {
                // CPU runs small model: 80% accuracy, average confidence
                confidence = 0.5 + Math.random() * 0.48;
                predicted = rand < 0.80 ? proto.type : ITEMS_POOL.find(i => i.type !== proto.type)!.type;
            }

            const item: SorterItem = {
                id: state.nextId++,
                type: proto.type,
                label: proto.label,
                iconKey: proto.iconKey,
                x: -30,
                y: 65,
                speed: 1.2 + Math.random() * 0.8,
                width: 28,
                height: 28,
                confidence,
                detectedClass: predicted,
                status: "conveyor",
                sortProgress: 0,
                targetBinY: 160
            };
            state.items.push(item);
        };

        const render = (time: number) => {
            // FPS calculation
            const dt = time - state.lastFrameTime;
            state.lastFrameTime = time;
            if (dt > 0) {
                state.fpsFilter = Math.round(0.95 * state.fpsFilter + 0.05 * (1000 / dt));
            }

            // Spawn logic
            const spawnInterval = state.tpu ? 1800 : 2500;
            if (time - state.lastSpawnTime > spawnInterval) {
                spawnItem();
                state.lastSpawnTime = time;
            }

            // Draw Background Grid
            ctx.fillStyle = "#090d16";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Conveyor belt background
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(0, 50, canvas.width, 35);
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 2;
            ctx.strokeRect(-2, 50, canvas.width + 4, 35);

            // Draw belt roller lines
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1;
            const beltOffset = (time / 15) % 20;
            for (let lx = -20 + beltOffset; lx < canvas.width; lx += 20) {
                ctx.beginPath();
                ctx.moveTo(lx, 50);
                ctx.lineTo(lx - 5, 85);
                ctx.stroke();
            }

            // Draw Bins at bottom
            const binWidth = 90;
            const binLabels = [
                { type: "recyclable", label: "RECYCLE", color: "#3b82f6", x: 20 },
                { type: "organic", label: "ORGANIC", color: "#10b981", x: 140 },
                { type: "hazardous", label: "HAZARD", color: "#ef4444", x: 260 }
            ];

            binLabels.forEach(bin => {
                // Outer glow
                ctx.shadowColor = bin.color;
                ctx.shadowBlur = 4;
                
                // Bin Box
                ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
                ctx.strokeStyle = bin.color;
                ctx.lineWidth = 1.5;
                
                // Rounded corner path
                const x = bin.x;
                const y = 145;
                const w = binWidth;
                const h = 45;
                const r = 6;
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.lineTo(x + w - r, y);
                ctx.quadraticCurveTo(x + w, y, x + w, y + r);
                ctx.lineTo(x + w, y + h - r);
                ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
                ctx.lineTo(x + r, y + h);
                ctx.quadraticCurveTo(x, y + h, x, y + h - r);
                ctx.lineTo(x, y + r);
                ctx.quadraticCurveTo(x, y, x + r, y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Bin text
                ctx.shadowBlur = 0;
                ctx.fillStyle = bin.color;
                ctx.font = "bold 9px monospace";
                ctx.textAlign = "center";
                ctx.fillText(bin.label, bin.x + binWidth / 2, 160);

                // Small count labels
                ctx.fillStyle = "#94a3b8";
                ctx.font = "8px monospace";
                ctx.fillText(bin.type === "recyclable" ? "BIN [01]" : bin.type === "organic" ? "BIN [02]" : "BIN [03]", bin.x + binWidth / 2, 175);
            });

            // Draw "Camera / CV Sensor zone" lines
            const sensorX = 180;
            const sensorW = 40;
            ctx.fillStyle = "rgba(99, 102, 241, 0.08)";
            ctx.fillRect(sensorX, 0, sensorW, 140);
            ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(sensorX, 0);
            ctx.lineTo(sensorX, 140);
            ctx.moveTo(sensorX + sensorW, 0);
            ctx.lineTo(sensorX + sensorW, 140);
            ctx.stroke();
            ctx.setLineDash([]);

            // Draw Camera symbol at top
            ctx.fillStyle = "#6366f1";
            ctx.beginPath();
            ctx.arc(sensorX + sensorW / 2, 10, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "7px monospace";
            ctx.textAlign = "center";
            ctx.fillStyle = "#818cf8";
            ctx.fillText("CV CAM", sensorX + sensorW / 2, 22);

            // Update & Draw Items
            state.items.forEach((item) => {
                if (item.status === "conveyor") {
                    item.x += item.speed;

                    // Auto sorting checks (Autopilot mode)
                    if (state.autopilot && item.x >= sensorX + 10 && item.x <= sensorX + 30) {
                        const meetsConfidence = item.confidence >= state.threshold;
                        if (meetsConfidence && item.detectedClass !== "unknown") {
                            triggerSort(item, item.detectedClass as "recyclable" | "organic" | "hazardous");
                        }
                    }

                    // Fall off edge (Missed)
                    if (item.x > canvas.width + 20) {
                        item.status = "missed";
                        state.stats.missed++;
                        updateStats();
                    }
                } else if (item.status === "sorting") {
                    // Animate item falling into its target bin
                    item.sortProgress += 0.06;
                    
                    // Bezier/Interpolation to bin
                    const startX = item.x;
                    const startY = 65;
                    let binTargetX = 65; // Recycle
                    if (item.detectedClass === "organic") binTargetX = 185;
                    if (item.detectedClass === "hazardous") binTargetX = 305;

                    item.x = startX + (binTargetX - startX) * 0.12;
                    item.y = startY + (item.targetBinY - startY) * item.sortProgress;

                    if (item.sortProgress >= 1) {
                        item.status = "sorted";
                    }
                }

                // Render Item if visible
                if (item.status !== "sorted" && item.status !== "missed") {
                    // Draw bounding box if inside sensor zone and autopilot/CV is active
                    const inSensor = item.x + item.width / 2 > sensorX && item.x < sensorX + sensorW;
                    
                    if (inSensor || item.status === "sorting") {
                        const color = item.status === "sorting"
                            ? (item.isCorrect ? "#10b981" : "#ef4444")
                            : (item.confidence >= state.threshold ? "#6366f1" : "#f59e0b");
                        
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 1;
                        ctx.strokeRect(item.x - 3, item.y - 3, item.width + 6, item.height + 6);
                        
                        // Label text
                        ctx.fillStyle = color;
                        ctx.font = "8px monospace";
                        ctx.textAlign = "left";
                        
                        const labelText = `${item.detectedClass.substring(0, 5)}:${Math.round(item.confidence * 100)}%`;
                        ctx.fillText(labelText, item.x - 3, item.y - 8);
                    }

                    // Draw custom glowing vector item
                    const itemColor = item.status === "sorting"
                        ? (item.isCorrect ? "#10b981" : "#ef4444")
                        : (item.confidence >= state.threshold ? "#00f0ff" : "#f59e0b");
                    
                    drawVectorItem(ctx, item.x, item.y, item.width, item.height, item.iconKey, itemColor);
                }
            });

            // Clean up offscreen/sorted items
            state.items = state.items.filter(item => item.status !== "sorted" && item.status !== "missed");

            // Write telemetry stats inside canvas top left
            ctx.fillStyle = "#475569";
            ctx.font = "7px monospace";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(`FPS: ${state.fpsFilter}`, 10, 8);
            ctx.fillText(`LATENCY: ${state.latencyVal}ms`, 10, 18);

            // Update stats ref
            setSiftStats(prev => ({
                ...prev,
                fps: state.fpsFilter
            }));

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animId);
        };
    }, [isOpen, activeTab, triggerSort]);

    const resetSift = () => {
        const state = siftStateRef.current;
        state.items = [];
        state.stats = { sorted: 0, misclassified: 0, missed: 0 };
        state.nextId = 1;
        updateStats();
    };

    // --- IOT LINKER CIRCUITS LOGIC ---
    // Rotates a tile inside the grid ref and re-runs pathfinding
    const handleTileClick = (row: number, col: number) => {
        if (circuitConnected) return; // Wait until reset / progress

        const updated = gridRef.current.map(tile => {
            if (tile.row === row && tile.col === col) {
                return { ...tile, rotation: (tile.rotation + 1) % 4 };
            }
            return tile;
        });

        gridRef.current = updated;
        setCircuitGrid(updated);
        checkConnectivity();
    };

    // Helper to get active connections of a tile based on type and rotation
    // Array: [top, right, bottom, left]
    const getConnections = (tile: CircuitTile): boolean[] => {
        let base: boolean[] = [false, false, false, false];
        switch (tile.type) {
            case "straight":
                base = [false, true, false, true]; // Left & Right
                break;
            case "corner":
                base = [true, true, false, false]; // Top & Right
                break;
            case "t-junction":
                base = [true, true, true, false];  // Top, Right, Bottom
                break;
            case "cross":
                base = [true, true, true, true];   // All 4
                break;
            case "empty":
                base = [false, false, false, false];
                break;
        }

        // Rotate connections array R times to the right
        const r = tile.rotation;
        const rotated = [...base];
        for (let i = 0; i < r; i++) {
            const last = rotated.pop()!;
            rotated.unshift(last);
        }
        return rotated;
    };

    // DFS pathfinder to verify layout connectivity
    const checkConnectivity = () => {
        const grid = gridRef.current;
        if (grid.length === 0) return;

        // Visited set
        const visited = new Set<string>();
        const queue: { r: number; c: number; path: {r: number, c: number}[] }[] = [];

        // Check start cell connections (must connect left to receive VCC)
        const startTile = grid[startCell.row * GRID_SIZE + startCell.col];
        const startConns = getConnections(startTile);

        // VCC input feeds from left (index 3). Start tile must accept connection from left!
        if (startConns[3]) {
            queue.push({ r: startCell.row, c: startCell.col, path: [{ r: startCell.row, c: startCell.col }] });
            visited.add(`${startCell.row},${startCell.col}`);
        }

        let completedPath: {r: number, c: number}[] | null = null;

        while (queue.length > 0) {
            const { r, c, path } = queue.shift()!;
            const tileIdx = r * GRID_SIZE + c;
            const currentTile = grid[tileIdx];
            const currentConns = getConnections(currentTile);

            // If we reached the end node, does it connect right (index 1) to power ESP32?
            if (r === endCell.row && c === endCell.col) {
                if (currentConns[1]) {
                    completedPath = path;
                    break;
                }
            }

            // Look in 4 directions: top (0), right (1), bottom (2), left (3)
            const dirs = [
                { dr: -1, dc: 0, fromDir: 2, toDir: 0 }, // Top
                { dr: 0, dc: 1, fromDir: 3, toDir: 1 },  // Right
                { dr: 1, dc: 0, fromDir: 0, toDir: 2 },  // Bottom
                { dr: 0, dc: -1, fromDir: 1, toDir: 3 }  // Left
            ];

            for (const d of dirs) {
                const nr = r + d.dr;
                const nc = c + d.dc;

                // Bounds check
                if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                    const neighborKey = `${nr},${nc}`;
                    if (!visited.has(neighborKey)) {
                        const neighborTile = grid[nr * GRID_SIZE + nc];
                        const neighborConns = getConnections(neighborTile);

                        // If current tile connects out in that direction, AND neighbor connects back in
                        if (currentConns[d.toDir] && neighborConns[d.fromDir]) {
                            visited.add(neighborKey);
                            queue.push({
                                r: nr,
                                c: nc,
                                path: [...path, { r: nr, c: nc }]
                            });
                        }
                    }
                }
            }
        }

        // Update active flags
        const newGrid = grid.map(tile => {
            const inPath = completedPath?.some(p => p.r === tile.row && p.c === tile.col) || false;
            return { ...tile, isActive: inPath };
        });

        gridRef.current = newGrid;
        setCircuitGrid(newGrid);

        if (completedPath) {
            setCircuitConnected(true);
            setLinkerScore(prev => prev + 1);

            // Fire electrical pulse animations along the path
            triggerElectricalPulse(completedPath);
        }
    };

    // Convert row/col grid path into canvas (X, Y) pixel path
    const triggerElectricalPulse = (path: {r: number, c: number}[]) => {
        const cellSize = 60;
        const padding = 25;
        
        // Convert grid coordinates to canvas offsets
        const pixelPath = path.map(p => ({
            x: padding + p.c * cellSize + cellSize / 2,
            y: padding + p.r * cellSize + cellSize / 2
        }));

        // Add start VCC node coordinate at left
        pixelPath.unshift({ x: 0, y: padding + startCell.row * cellSize + cellSize / 2 });
        // Add end MCU node coordinate at right
        pixelPath.push({ x: 300, y: padding + endCell.row * cellSize + cellSize / 2 });

        // Spawn multiple electricity particles
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                linkerParticlesRef.current.push({
                    x: pixelPath[0].x,
                    y: pixelPath[0].y,
                    progress: 0,
                    path: pixelPath
                });
            }, i * 200);
        }

        // Auto trigger next level after 2 seconds
        setTimeout(() => {
            generateCircuit();
        }, 2200);
    };

    // IoT Linker canvas draw loop
    useEffect(() => {
        if (!isOpen || activeTab !== "iotlinker" || circuitGrid.length === 0) return;

        const canvas = linkerCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const cellSize = 60;
        const padding = 25;

        const drawTileGraphics = (
            x: number, 
            y: number, 
            type: TileType, 
            rotation: number, 
            isActive: boolean
        ) => {
            const half = cellSize / 2;
            const cx = x + half;
            const cy = y + half;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate((rotation * 90 * Math.PI) / 180);

            // Base trace styling
            ctx.lineWidth = isActive ? 3 : 2;
            ctx.strokeStyle = isActive ? "#00f0ff" : "#334155";
            if (isActive) {
                ctx.shadowColor = "#00f0ff";
                ctx.shadowBlur = 6;
            }

            ctx.beginPath();
            switch (type) {
                case "straight":
                    ctx.moveTo(-half, 0);
                    ctx.lineTo(half, 0);
                    break;
                case "corner":
                    // Curve from Top (0, -half) to Right (half, 0)
                    ctx.arc(-half, -half, half, 0, Math.PI / 2);
                    break;
                case "t-junction":
                    // Connect Top, Right, Bottom
                    ctx.moveTo(0, -half);
                    ctx.lineTo(0, half);
                    ctx.moveTo(0, 0);
                    ctx.lineTo(half, 0);
                    break;
                case "cross":
                    // Draw horizontal and vertical
                    ctx.moveTo(-half, 0);
                    ctx.lineTo(half, 0);
                    ctx.moveTo(0, -half);
                    ctx.lineTo(0, half);
                    break;
                default:
                    break;
            }
            ctx.stroke();
            ctx.restore();

            // Reset shadows
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";

            // Draw a small copper contact ring at junctions
            ctx.fillStyle = isActive ? "#00f0ff" : "#1e293b";
            ctx.strokeStyle = isActive ? "#00f0ff" : "#475569";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(cx, cy, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        };

        const render = () => {
            // Draw clean dark background
            ctx.fillStyle = "#090d16";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid backdrop
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
            ctx.lineWidth = 1;
            for (let i = 0; i <= GRID_SIZE; i++) {
                ctx.beginPath();
                ctx.moveTo(padding + i * cellSize, padding);
                ctx.lineTo(padding + i * cellSize, padding + GRID_SIZE * cellSize);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(padding, padding + i * cellSize);
                ctx.lineTo(padding + GRID_SIZE * cellSize, padding + i * cellSize);
                ctx.stroke();
            }

            // Draw Start (VCC Node) at left
            const vccY = padding + startCell.row * cellSize + cellSize / 2;
            ctx.fillStyle = circuitConnected ? "#10b981" : "#e11d48";
            ctx.shadowColor = circuitConnected ? "#10b981" : "#e11d48";
            ctx.shadowBlur = circuitConnected ? 10 : 4;
            ctx.beginPath();
            ctx.arc(10, vccY, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 7px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("VCC", 10, vccY);

            // Draw End (MCU Chip) at right
            const mcuY = padding + endCell.row * cellSize + cellSize / 2;
            const mcuX = padding + GRID_SIZE * cellSize + 15;
            
            // Draw Chip Body
            ctx.fillStyle = circuitConnected ? "#10b981" : "#1e293b";
            ctx.strokeStyle = circuitConnected ? "#059669" : "#475569";
            ctx.lineWidth = 1.5;
            if (circuitConnected) {
                ctx.shadowColor = "#10b981";
                ctx.shadowBlur = 8;
            }
            ctx.fillRect(mcuX - 10, mcuY - 12, 20, 24);
            ctx.strokeRect(mcuX - 10, mcuY - 12, 20, 24);
            ctx.shadowBlur = 0;

            // Pins details on chip
            ctx.fillStyle = "#94a3b8";
            for (let pinY = mcuY - 10; pinY <= mcuY + 10; pinY += 5) {
                ctx.fillRect(mcuX - 13, pinY - 1, 3, 2);
                ctx.fillRect(mcuX + 10, pinY - 1, 3, 2);
            }
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 6px monospace";
            ctx.fillText("MCU", mcuX, mcuY);

            // Draw circuit lines on board connecting edge to grid
            ctx.strokeStyle = circuitConnected ? "#00f0ff" : "#334155";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(18, vccY);
            ctx.lineTo(padding, vccY);
            ctx.moveTo(padding + GRID_SIZE * cellSize, mcuY);
            ctx.lineTo(mcuX - 12, mcuY);
            ctx.stroke();

            // Draw all tiles
            gridRef.current.forEach(tile => {
                const tx = padding + tile.col * cellSize;
                const ty = padding + tile.row * cellSize;
                drawTileGraphics(tx, ty, tile.type, tile.rotation, tile.isActive);
            });

            // Update & Draw Electricity Particles
            const particles = linkerParticlesRef.current;
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.progress += 0.05;

                if (p.progress >= p.path.length - 1) {
                    // Reached end, delete particle
                    particles.splice(i, 1);
                    continue;
                }

                // Interpolate along path segments
                const segIdx = Math.floor(p.progress);
                const segProgress = p.progress - segIdx;
                const pStart = p.path[segIdx];
                const pEnd = p.path[segIdx + 1];

                p.x = pStart.x + (pEnd.x - pStart.x) * segProgress;
                p.y = pStart.y + (pEnd.y - pStart.y) * segProgress;

                // Draw glowing node
                ctx.fillStyle = "#ffffff";
                ctx.shadowColor = "#00f0ff";
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animId);
        };
    }, [isOpen, activeTab, circuitGrid, circuitConnected]);

    // Handle clicks on the canvas for IoT Linker grid cells
    const handleLinkerCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (circuitConnected) return;

        const canvas = linkerCanvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const cellSize = 60;
        const padding = 25;

        // Determine which row/col was clicked
        const col = Math.floor((clickX - padding) / cellSize);
        const row = Math.floor((clickY - padding) / cellSize);

        if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
            handleTileClick(row, col);
        }
    };

    return (
        <>
            {/* Floating Core trigger button in bottom right corner */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border border-slate-700/80 shadow-lg text-indigo-400 hover:text-indigo-300 hover:scale-105 transition-all duration-300 group"
                    aria-label="Open AI Systems Sandbox"
                    id="ai-core-trigger-btn"
                >
                    {/* Ring Glows */}
                    <span className="absolute inset-0 rounded-full border border-indigo-500/30 scale-100 group-hover:scale-125 opacity-100 group-hover:opacity-0 transition-all duration-700" />
                    <span className="absolute inset-0 rounded-full bg-indigo-500/10 blur-sm scale-95 group-hover:scale-110 transition-transform duration-300" />
                    
                    <Cpu className={`w-6 h-6 transition-transform duration-500 ${isOpen ? "rotate-90 text-rose-400" : "group-hover:rotate-12"}`} />
                    
                    {/* Glowing status indicator */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900" />
                        </span>
                    )}
                </button>
            </div>

            {/* Main Dashboard Dialog Panel Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-24 right-6 w-[360px] h-[480px] bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden text-slate-200"
                        id="ai-sandbox-console-panel"
                    >
                        {/* Header Area */}
                        <div className="px-4 py-3 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-indigo-400 animate-pulse" />
                                <span className="text-[10px] font-mono tracking-widest text-indigo-300 uppercase font-bold">
                                    DevOS // AI Core Sandbox
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:text-white transition-colors"
                                aria-label="Close panel"
                            >
                                <X className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="grid grid-cols-2 border-b border-slate-800/40 bg-slate-900/30">
                            <button
                                onClick={() => setActiveTab("edgesift")}
                                className={`py-2 text-[10px] font-mono uppercase font-bold border-b-2 tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === "edgesift"
                                        ? "border-indigo-500 text-indigo-400 bg-slate-900/40"
                                        : "border-transparent text-slate-500 hover:text-slate-400"
                                }`}
                            >
                                <Layers className="w-3 h-3" />
                                EdgeSift (AI)
                            </button>
                            <button
                                onClick={() => setActiveTab("iotlinker")}
                                className={`py-2 text-[10px] font-mono uppercase font-bold border-b-2 tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                                    activeTab === "iotlinker"
                                        ? "border-indigo-500 text-indigo-400 bg-slate-900/40"
                                        : "border-transparent text-slate-500 hover:text-slate-400"
                                }`}
                            >
                                <Cpu className="w-3 h-3" />
                                IoT Linker
                            </button>
                        </div>

                        {/* TAB CONTENTS */}
                        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
                            
                            {/* TAB 1: EDGESIFT */}
                            {activeTab === "edgesift" && (
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="text-[10px] text-slate-400 leading-relaxed font-light font-mono">
                                        <span className="text-indigo-400 font-semibold">Pi Waste Sorter Simulator</span>. Sort incoming trash into bins. Enable Autopilot to test CV inference speeds vs. model accuracy thresholds.
                                    </div>

                                    {/* Sift Canvas Container */}
                                    <div className="relative border border-slate-800 rounded-lg overflow-hidden h-[190px] bg-slate-950">
                                        <canvas
                                            ref={siftCanvasRef}
                                            width={326}
                                            height={188}
                                            className="w-full h-full block"
                                        />
                                    </div>

                                    {/* Manual Trigger Buttons (Disabled when Autopilot is on) */}
                                    <div className="grid grid-cols-3 gap-2">
                                        <button
                                            disabled={siftAutopilot}
                                            onClick={() => handleManualSort("recyclable")}
                                            className={`py-1.5 rounded text-[9px] font-bold font-mono border transition-all ${
                                                siftAutopilot
                                                    ? "bg-slate-900/20 border-slate-800/50 text-slate-600 cursor-not-allowed"
                                                    : "bg-blue-950/40 border-blue-800/40 text-blue-400 hover:bg-blue-950/70"
                                            }`}
                                        >
                                            RECYCLE
                                        </button>
                                        <button
                                            disabled={siftAutopilot}
                                            onClick={() => handleManualSort("organic")}
                                            className={`py-1.5 rounded text-[9px] font-bold font-mono border transition-all ${
                                                siftAutopilot
                                                    ? "bg-slate-900/20 border-slate-800/50 text-slate-600 cursor-not-allowed"
                                                    : "bg-emerald-950/40 border-emerald-800/40 text-emerald-400 hover:bg-emerald-950/70"
                                            }`}
                                        >
                                            ORGANIC
                                        </button>
                                        <button
                                            disabled={siftAutopilot}
                                            onClick={() => handleManualSort("hazardous")}
                                            className={`py-1.5 rounded text-[9px] font-bold font-mono border transition-all ${
                                                siftAutopilot
                                                    ? "bg-slate-900/20 border-slate-800/50 text-slate-600 cursor-not-allowed"
                                                    : "bg-rose-950/40 border-rose-800/40 text-rose-400 hover:bg-rose-950/70"
                                            }`}
                                        >
                                            HAZARD
                                        </button>
                                    </div>

                                    {/* Control Panel / Metrics */}
                                    <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-3 space-y-3 font-mono">
                                        {/* Autopilot toggle & TPU toggle */}
                                        <div className="flex items-center justify-between border-b border-slate-800/40 pb-2">
                                            <label className="flex items-center gap-1.5 text-[9px] text-slate-300 font-bold uppercase tracking-wider cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={siftAutopilot}
                                                    onChange={(e) => setSiftAutopilot(e.target.checked)}
                                                    className="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                                                />
                                                CV Autopilot
                                            </label>
                                            <button
                                                onClick={() => setUseTPU(prev => !prev)}
                                                className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border flex items-center gap-1 transition-all ${
                                                    useTPU
                                                        ? "bg-indigo-950 border-indigo-600 text-indigo-300 shadow-glow"
                                                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-300"
                                                }`}
                                            >
                                                <Cpu className="w-2.5 h-2.5" />
                                                Coral TPU: {useTPU ? "ON" : "OFF"}
                                            </button>
                                        </div>

                                        {/* Slider for Confidence Threshold */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                                                <span>CV DETECT CONFIDENCE THRESHOLD</span>
                                                <span className="text-indigo-400 font-semibold">{Math.round(confidenceThreshold * 100)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="0.99"
                                                step="0.05"
                                                value={confidenceThreshold}
                                                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                                                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                            />
                                        </div>

                                        {/* Real-time stats */}
                                        <div className="grid grid-cols-4 gap-2 text-center pt-1">
                                            <div>
                                                <span className="text-[7px] text-slate-500 block">ACCURACY</span>
                                                <span className={`text-[10px] font-bold ${siftStats.accuracy > 80 ? "text-emerald-400" : "text-amber-400"}`}>
                                                    {siftStats.accuracy}%
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[7px] text-slate-500 block">SORTED</span>
                                                <span className="text-[10px] font-bold text-blue-400">{siftStats.sorted}</span>
                                            </div>
                                            <div>
                                                <span className="text-[7px] text-slate-500 block">MISSED</span>
                                                <span className="text-[10px] font-bold text-amber-500">{siftStats.missed}</span>
                                            </div>
                                            <div>
                                                <span className="text-[7px] text-slate-500 block">LATENCY</span>
                                                <span className="text-[10px] font-bold text-indigo-400">{siftStats.latency}ms</span>
                                            </div>
                                        </div>

                                        {/* Reset stats */}
                                        <div className="flex justify-end pt-1">
                                            <button
                                                onClick={resetSift}
                                                className="text-[8px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
                                            >
                                                <RotateCcw className="w-2.5 h-2.5" />
                                                Reset Stats
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: IOT LINKER */}
                            {activeTab === "iotlinker" && (
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="text-[10px] text-slate-400 leading-relaxed font-light font-mono">
                                        <span className="text-cyan-400 font-semibold">IoT Linker PCB Routing</span>. Click and rotate the tracks to build a connection from <span className="text-rose-400 font-semibold">VCC (+5V)</span> to the <span className="text-indigo-400 font-semibold">ESP32 MCU Node</span>.
                                    </div>

                                    {/* Linker Canvas */}
                                    <div className="relative border border-slate-800 rounded-lg overflow-hidden h-[290px] bg-slate-950 flex items-center justify-center">
                                        <canvas
                                            ref={linkerCanvasRef}
                                            width={326}
                                            height={288}
                                            onClick={handleLinkerCanvasClick}
                                            className="w-full h-full block cursor-pointer"
                                        />
                                        
                                        {/* Completed Overlay HUD */}
                                        <AnimatePresence>
                                            {circuitConnected && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2"
                                                >
                                                    <CheckCircle className="w-10 h-10 text-emerald-400 animate-bounce" />
                                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                                                        Signal Link Connected!
                                                    </span>
                                                    <span className="text-[8px] font-mono text-slate-400">
                                                        Generating next circuit layout...
                                                    </span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Score and Reset Controls */}
                                    <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-2.5 flex items-center justify-between font-mono">
                                        <div className="flex items-center gap-2">
                                            <Gamepad2 className="w-4 h-4 text-cyan-400" />
                                            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">
                                                Circuits Completed:
                                            </span>
                                            <span className="text-xs font-bold text-cyan-400">{linkerScore}</span>
                                        </div>
                                        
                                        <button
                                            onClick={generateCircuit}
                                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[8px] font-bold uppercase tracking-wider rounded border border-slate-700 transition-colors flex items-center gap-1"
                                        >
                                            <RefreshCw className="w-2.5 h-2.5" />
                                            Re-Route PCB
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
