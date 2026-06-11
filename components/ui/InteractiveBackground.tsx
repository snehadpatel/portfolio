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

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initBlobs();
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
                    color: "rgba(94, 96, 231, 0.05)", // Soft Periwinkle
                    vx: 0.15,
                    vy: 0.12,
                },
                {
                    x: w * 0.7,
                    y: h * 0.25,
                    radius: minDim * 0.4,
                    targetRadius: minDim * 0.4,
                    color: "rgba(16, 185, 129, 0.035)", // Soft Mint Green
                    vx: -0.12,
                    vy: 0.15,
                },
                {
                    x: w * 0.45,
                    y: h * 0.75,
                    radius: minDim * 0.38,
                    targetRadius: minDim * 0.38,
                    color: "rgba(251, 113, 133, 0.045)", // Soft Rose Peach
                    vx: 0.1,
                    vy: -0.1,
                },
            ];
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smoothly interpolate mouse coordinates for parallax
            if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
                currentMouse.current.x += (mouseRef.current.x - currentMouse.current.x) * 0.05;
                currentMouse.current.y += (mouseRef.current.y - currentMouse.current.y) * 0.05;
            } else {
                // Drift back to center
                currentMouse.current.x += (canvas.width / 2 - currentMouse.current.x) * 0.02;
                currentMouse.current.y += (canvas.height / 2 - currentMouse.current.y) * 0.02;
            }

            // Draw blobs
            for (let i = 0; i < blobs.length; i++) {
                const b = blobs[i];

                // Slowly move blobs
                b.x += b.vx;
                b.y += b.vy;

                // Bounce off canvas bounds (with padding)
                const pad = b.radius * 0.2;
                if (b.x < -pad || b.x > canvas.width + pad) b.vx *= -1;
                if (b.y < -pad || b.y > canvas.height + pad) b.vy *= -1;

                // Add mouse parallax offset (blobs drift towards mouse direction slightly, 4% weight)
                const offsetX = (currentMouse.current.x - canvas.width / 2) * 0.04 * (i + 1);
                const offsetY = (currentMouse.current.y - canvas.height / 2) * 0.04 * (i + 1);
                
                const drawX = b.x + offsetX;
                const drawY = b.y + offsetY;

                // Draw soft gradient sphere
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

            // Draw faint grid alignment markers for clean developer aesthetic
            ctx.strokeStyle = "rgba(15, 23, 42, 0.012)";
            ctx.lineWidth = 0.8;
            const gridSpacing = 80;
            
            for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

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
        currentMouse.current.x = canvas.width / 2;
        currentMouse.current.y = canvas.height / 2;
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
