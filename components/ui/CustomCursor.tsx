"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    const [cursorType, setCursorType] = useState<"default" | "hover" | "magnetic">("default");
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 260, mass: 0.6 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect touch device to disable custom cursor
        const touchCheck = window.matchMedia("(pointer: coarse)").matches;
        setIsTouchDevice(touchCheck);
        if (touchCheck) return;

        document.documentElement.classList.add("custom-cursor-active");

        const moveCursor = (e: MouseEvent) => {
            if (cursorType !== "magnetic") {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
            
            if (interactiveEl) {
                const magnetic = interactiveEl.getAttribute("data-cursor") === "magnetic" || interactiveEl.tagName === "A" || interactiveEl.tagName === "BUTTON";
                if (magnetic) {
                    setCursorType("magnetic");
                    const rect = interactiveEl.getBoundingClientRect();
                    setHoveredRect(rect);
                    // Center cursor inside the hovered element rect
                    mouseX.set(rect.left + rect.width / 2);
                    mouseY.set(rect.top + rect.height / 2);
                } else {
                    setCursorType("hover");
                }
            } else {
                setCursorType("default");
                setHoveredRect(null);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            document.documentElement.classList.remove("custom-cursor-active");
        };
    }, [cursorType, mouseX, mouseY]);

    if (isTouchDevice) return null;

    const variants = {
        default: {
            width: 8,
            height: 8,
            backgroundColor: "rgba(223, 186, 115, 0.9)", // Champagne Gold core
            border: "0px solid rgba(223, 186, 115, 0)",
            borderRadius: "50%",
            x: "-50%",
            y: "-50%",
        },
        hover: {
            width: 44,
            height: 44,
            backgroundColor: "rgba(223, 186, 115, 0.05)",
            border: "1px solid rgba(223, 186, 115, 0.4)", // Hollow expanded ring
            borderRadius: "50%",
            x: "-50%",
            y: "-50%",
        },
        magnetic: {
            width: hoveredRect ? hoveredRect.width + 12 : 44,
            height: hoveredRect ? hoveredRect.height + 8 : 44,
            backgroundColor: "rgba(223, 186, 115, 0.02)",
            border: "1px solid rgba(223, 186, 115, 0.5)", // Snapped container overlay
            borderRadius: hoveredRect ? "12px" : "50%",
            x: "-50%",
            y: "-50%",
        }
    };

    return (
        <>
            {/* Custom glowing tracking ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                variants={variants}
                animate={cursorType}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
            />
            {/* Fine pinpoint helper dot inside cursor */}
            {cursorType !== "magnetic" && (
                <motion.div
                    className="fixed top-0 left-0 w-2 h-2 bg-amber-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />
            )}
        </>
    );
}
