"use client";

import React, { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    label: string;
    pulse: number;
    pulseDir: number;
}

interface SignalPacket {
    x: number;
    y: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    progress: number;
    speed: number;
    color: string;
}

export default function HeroCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: Node[] = [];
        let packets: SignalPacket[] = [];
        let scanX = 0;
        const scanSpeed = 1.2;

        const resizeCanvas = () => {
            if (!canvas) return;
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            } else {
                canvas.width = 400;
                canvas.height = 400;
            }
            initNodes();
        };

        const initNodes = () => {
            nodes = [];
            packets = [];
            const w = canvas.width;
            const h = canvas.height;
            const numNodes = Math.min(30, Math.floor((w * h) / 12000) + 12);

            for (let i = 0; i < numNodes; i++) {
                // Keep nodes within container margin bounds
                const rx = 40 + Math.random() * (w - 80);
                const ry = 40 + Math.random() * (h - 80);
                nodes.push({
                    x: rx,
                    y: ry,
                    vx: 0,
                    vy: 0,
                    baseX: rx,
                    baseY: ry,
                    radius: 2 + Math.random() * 2.5,
                    label: `NODE_0x${i.toString(16).toUpperCase()}`,
                    pulse: Math.random(),
                    pulseDir: Math.random() > 0.5 ? 0.015 : -0.015
                });
            }
        };

        const draw = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;

            // Update scan sweep coordinate
            scanX += scanSpeed;
            if (scanX > w + 100) {
                scanX = -100;
            }

            // Draw faint ambient background grid (matching globals.css grid styles)
            ctx.strokeStyle = "rgba(15, 23, 42, 0.007)";
            ctx.lineWidth = 1;
            const gridSpacing = 60;
            for (let lx = 0; lx < w; lx += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(lx, 0);
                ctx.lineTo(lx, h);
                ctx.stroke();
            }
            for (let ly = 0; ly < h; ly += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, ly);
                ctx.lineTo(w, ly);
                ctx.stroke();
            }

            // Draw CV scanning sweep vertical line
            ctx.strokeStyle = "rgba(99, 102, 241, 0.04)";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(scanX, 0);
            ctx.lineTo(scanX, h);
            ctx.stroke();

            // Draw CV scanner subtle lead glow
            const scanGrad = ctx.createLinearGradient(scanX - 60, 0, scanX, 0);
            scanGrad.addColorStop(0, "rgba(99, 102, 241, 0)");
            scanGrad.addColorStop(1, "rgba(99, 102, 241, 0.02)");
            ctx.fillStyle = scanGrad;
            ctx.fillRect(scanX - 60, 0, 60, h);

            // Update physics & draw connections first (behind nodes)
            const maxConnectDist = 120;
            ctx.lineWidth = 0.8;

            for (let i = 0; i < nodes.length; i++) {
                const n1 = nodes[i];

                // Mouse Magnet attraction logic
                if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                    const dx = mouseRef.current.x - n1.x;
                    const dy = mouseRef.current.y - n1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const influenceRadius = 180;
                    
                    if (dist < influenceRadius) {
                        // Spring/Magnetic pull proportional to closeness
                        const force = (1 - dist / influenceRadius) * 0.16;
                        n1.vx += (dx / dist) * force;
                        n1.vy += (dy / dist) * force;
                    }
                }

                // Damping friction (prevents flying away)
                n1.vx *= 0.93;
                n1.vy *= 0.93;

                // Return spring pull back to base coordinates
                const homeDx = n1.baseX - n1.x;
                const homeDy = n1.baseY - n1.y;
                n1.vx += homeDx * 0.008;
                n1.vy += homeDy * 0.008;

                // Apply velocity updates
                n1.x += n1.vx;
                n1.y += n1.vy;

                // Pulsing animation
                n1.pulse += n1.pulseDir;
                if (n1.pulse > 1 || n1.pulse < 0) {
                    n1.pulseDir *= -1;
                }

                // Connections to other nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectDist) {
                        // Opacity fades as nodes drift apart
                        const alpha = (1 - dist / maxConnectDist) * 0.12;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();

                        // Occasionally spawn a glowing data packet along this connection
                        if (Math.random() < 0.0003 && packets.length < 8) {
                            packets.push({
                                x: n1.x,
                                y: n1.y,
                                startX: n1.x,
                                startY: n1.y,
                                endX: n2.x,
                                endY: n2.y,
                                progress: 0,
                                speed: 0.015 + Math.random() * 0.015,
                                color: Math.random() > 0.4 ? "rgba(99, 102, 241, 0.4)" : "rgba(16, 185, 129, 0.4)"
                            });
                        }
                    }
                }
            }

            // Update & Render data packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += p.speed;

                if (p.progress >= 1) {
                    packets.splice(i, 1);
                    continue;
                }

                p.x = p.startX + (p.endX - p.startX) * p.progress;
                p.y = p.startY + (p.endY - p.startY) * p.progress;

                // Draw tiny signal dot
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Draw Nodes and CV scan bounding boxes
            nodes.forEach(n => {
                // Nodes themselves: soft translucent center, slightly sharper border
                ctx.fillStyle = "rgba(99, 102, 241, 0.18)";
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius + n.pulse * 1.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "rgba(99, 102, 241, 0.45)";
                ctx.beginPath();
                ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Bounding box sweep triggers when scanning line passes
                const distToScanner = Math.abs(n.x - scanX);
                const scanHighlightRadius = 75;

                if (distToScanner < scanHighlightRadius) {
                    const scanAlpha = (1 - distToScanner / scanHighlightRadius) * 0.15;
                    const boxSize = 24 + n.radius * 2;

                    ctx.strokeStyle = `rgba(16, 185, 129, ${scanAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.setLineDash([2, 2]);
                    
                    // Draw bounding box corners
                    ctx.strokeRect(n.x - boxSize / 2, n.y - boxSize / 2, boxSize, boxSize);
                    ctx.setLineDash([]);

                    // Draw a leader pointer line to label text
                    ctx.strokeStyle = `rgba(16, 185, 129, ${scanAlpha * 0.6})`;
                    ctx.beginPath();
                    ctx.moveTo(n.x + boxSize / 2, n.y - boxSize / 2);
                    ctx.lineTo(n.x + boxSize / 2 + 10, n.y - boxSize / 2 - 10);
                    ctx.lineTo(n.x + boxSize / 2 + 25, n.y - boxSize / 2 - 10);
                    ctx.stroke();

                    // Object label metadata
                    ctx.fillStyle = `rgba(16, 185, 129, ${scanAlpha})`;
                    ctx.font = "7px monospace";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "bottom";
                    ctx.fillText(`${n.label} TRK:98%`, n.x + boxSize / 2 + 12, n.y - boxSize / 2 - 12);
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            // Mouse coordinates relative to canvas
            mouseRef.current.x = e.clientX - rect.left;
            mouseRef.current.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        resizeCanvas();
        draw();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none block"
            style={{ mixBlendMode: "multiply" }}
        />
    );
}
