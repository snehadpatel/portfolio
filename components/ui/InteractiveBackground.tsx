"use client";

import { useEffect, useRef } from "react";

interface Blob {
    x: number;
    y: number;
    radius: number;
    color: string;
    vx: number;
    vy: number;
    targetRadius: number;
}

interface BgNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    pulse: number;
    pulseDir: number;
}

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const currentMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let blobs: Blob[] = [];
        let bgNodes: BgNode[] = [];

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initBlobs();
            initNodes();
        };

        const initBlobs = () => {
            const w = canvas.width;
            const h = canvas.height;
            const minDim = Math.min(w, h);
            
            blobs = [
                {
                    x: w * 0.2,
                    y: h * 0.3,
                    radius: minDim * 0.35,
                    targetRadius: minDim * 0.35,
                    color: "rgba(94, 96, 231, 0.045)", // Soft Periwinkle
                    vx: 0.15,
                    vy: 0.12,
                },
                {
                    x: w * 0.7,
                    y: h * 0.25,
                    radius: minDim * 0.4,
                    targetRadius: minDim * 0.4,
                    color: "rgba(16, 185, 129, 0.03)", // Soft Mint Green
                    vx: -0.12,
                    vy: 0.15,
                },
                {
                    x: w * 0.45,
                    y: h * 0.75,
                    radius: minDim * 0.38,
                    targetRadius: minDim * 0.38,
                    color: "rgba(251, 113, 133, 0.04)", // Soft Rose Peach
                    vx: 0.1,
                    vy: -0.1,
                },
            ];
        };

        const initNodes = () => {
            bgNodes = [];
            const w = canvas.width;
            const h = canvas.height;
            // Scale number of nodes based on screen size
            const numNodes = Math.min(45, Math.floor((w * h) / 32000) + 15);

            for (let i = 0; i < numNodes; i++) {
                const rx = Math.random() * w;
                const ry = Math.random() * h;
                bgNodes.push({
                    x: rx,
                    y: ry,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    baseX: rx,
                    baseY: ry,
                    radius: 1.2 + Math.random() * 1.8,
                    pulse: Math.random(),
                    pulseDir: Math.random() > 0.5 ? 0.008 : -0.008
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const w = canvas.width;
            const h = canvas.height;

            // 1. Smoothly interpolate mouse coordinates for parallax
            if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                currentMouse.current.x += (mouseRef.current.x - currentMouse.current.x) * 0.05;
                currentMouse.current.y += (mouseRef.current.y - currentMouse.current.y) * 0.05;
            } else {
                currentMouse.current.x += (w / 2 - currentMouse.current.x) * 0.02;
                currentMouse.current.y += (h / 2 - currentMouse.current.y) * 0.02;
            }

            // 2. Draw ambient color blobs
            for (let i = 0; i < blobs.length; i++) {
                const b = blobs[i];

                b.x += b.vx;
                b.y += b.vy;

                const pad = b.radius * 0.2;
                if (b.x < -pad || b.x > w + pad) b.vx *= -1;
                if (b.y < -pad || b.y > h + pad) b.vy *= -1;

                const offsetX = (currentMouse.current.x - w / 2) * 0.04 * (i + 1);
                const offsetY = (currentMouse.current.y - h / 2) * 0.04 * (i + 1);
                
                const drawX = b.x + offsetX;
                const drawY = b.y + offsetY;

                const gradient = ctx.createRadialGradient(
                    drawX,
                    drawY,
                    0,
                    drawX,
                    drawY,
                    b.radius
                );
                gradient.addColorStop(0, b.color);
                gradient.addColorStop(1, "rgba(248, 249, 252, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(drawX, drawY, b.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Draw faint developer grid alignment lines
            ctx.strokeStyle = "rgba(15, 23, 42, 0.008)";
            ctx.lineWidth = 0.8;
            const gridSpacing = 80;
            
            for (let x = gridSpacing; x < w; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = gridSpacing; y < h; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }

            // 4. Update & Draw Neural Node Graph
            const maxConnectDist = 130;

            // Physics update
            for (let i = 0; i < bgNodes.length; i++) {
                const n = bgNodes[i];

                // Mouse Gravity attraction
                if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                    const dx = mouseRef.current.x - n.x;
                    const dy = mouseRef.current.y - n.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const attractionDist = 180;

                    if (dist < attractionDist) {
                        const force = (1 - dist / attractionDist) * 0.08;
                        n.vx += (dx / dist) * force;
                        n.vy += (dy / dist) * force;
                    }
                }

                // Damping
                n.vx *= 0.95;
                n.vy *= 0.95;

                // Return spring back to base coordinates
                const homeDx = n.baseX - n.x;
                const homeDy = n.baseY - n.y;
                n.vx += homeDx * 0.0015;
                n.vy += homeDy * 0.0015;

                n.x += n.vx;
                n.y += n.vy;

                // Pulsing size
                n.pulse += n.pulseDir;
                if (n.pulse > 1 || n.pulse < 0) {
                    n.pulseDir *= -1;
                }

                // Bounds check bounce (failsafe)
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            }

            // Draw connection lines
            for (let i = 0; i < bgNodes.length; i++) {
                const n1 = bgNodes[i];
                for (let j = i + 1; j < bgNodes.length; j++) {
                    const n2 = bgNodes[j];
                    const dx = n2.x - n1.x;
                    const dy = n2.y - n1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxConnectDist) {
                        const alpha = (1 - dist / maxConnectDist) * 0.06; // extremely subtle watermark opacity
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw node points
            bgNodes.forEach(n => {
                ctx.fillStyle = `rgba(99, 102, 241, ${0.08 + n.pulse * 0.08})`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.radius + n.pulse * 0.8, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `rgba(99, 102, 241, 0.25)`;
                ctx.beginPath();
                ctx.arc(n.x, n.y, 0.8, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        resizeCanvas();
        currentMouse.current.x = window.innerWidth / 2;
        currentMouse.current.y = window.innerHeight / 2;
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
            className="fixed inset-0 pointer-events-none -z-20 opacity-90"
            style={{ mixBlendMode: "multiply" }}
        />
    );
}
