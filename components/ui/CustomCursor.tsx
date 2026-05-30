"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    const [cursorType, setCursorType] = useState<"default" | "hover" | "magnetic">("default");
    const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // rawMouseX/Y always track the exact physical cursor position (pinpoint precision)
    const rawMouseX = useMotionValue(-100);
    const rawMouseY = useMotionValue(-100);

    // mouseX/Y track the smoothed/snapped coordinates for the ambient tracking ring
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 260, mass: 0.6 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Detect if the device lacks a fine pointer (e.g. pure touch devices like phones)
        const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
        const disableCustomCursor = !hasFinePointer;
        setIsTouchDevice(disableCustomCursor);

        if (disableCustomCursor) return;

        // Ensure we add the class to hide native cursor globally
        document.documentElement.classList.add("custom-cursor-active");

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);

            // 1. Always update raw coordinates for the pinpoint helper dot
            rawMouseX.set(e.clientX);
            rawMouseY.set(e.clientY);

            const target = e.target as HTMLElement | null;
            if (!target) return;

            const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");

            if (interactiveEl) {
                const magnetic = interactiveEl.getAttribute("data-cursor") === "magnetic" || 
                                 interactiveEl.tagName === "A" || 
                                 interactiveEl.tagName === "BUTTON";
                
                if (magnetic) {
                    setCursorType("magnetic");
                    const rect = interactiveEl.getBoundingClientRect();
                    setHoveredRect(rect);

                    // Snap to center of the element, but with a slight magnetic pull towards the mouse (25% weight)
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const pullX = (e.clientX - centerX) * 0.25;
                    const pullY = (e.clientY - centerY) * 0.25;

                    mouseX.set(centerX + pullX);
                    mouseY.set(centerY + pullY);
                } else {
                    setCursorType("hover");
                    setHoveredRect(null);
                    mouseX.set(e.clientX);
                    mouseY.set(e.clientY);
                }
            } else {
                setCursorType("default");
                setHoveredRect(null);
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.documentElement.classList.remove("custom-cursor-active");
        };
    }, [mouseX, mouseY, rawMouseX, rawMouseY, isVisible]);

    if (isTouchDevice) return null;

    // Use specific properties instead of shorthand border. Use numeric values for interpolation when possible.
    const variants = {
        default: {
            width: 8,
            height: 8,
            backgroundColor: "rgba(223, 186, 115, 0.9)", // Champagne Gold core
            borderWidth: 0,
            borderColor: "rgba(223, 186, 115, 0)",
            borderRadius: "50%",
        },
        hover: {
            width: 44,
            height: 44,
            backgroundColor: "rgba(223, 186, 115, 0.05)",
            borderWidth: 1,
            borderColor: "rgba(223, 186, 115, 0.4)", // Hollow expanded ring
            borderRadius: "50%",
        },
        magnetic: {
            width: hoveredRect ? hoveredRect.width + 16 : 44,
            height: hoveredRect ? hoveredRect.height + 10 : 44,
            backgroundColor: "rgba(223, 186, 115, 0.02)",
            borderWidth: 1,
            borderColor: "rgba(223, 186, 115, 0.5)", // Snapped container overlay
            borderRadius: hoveredRect ? 8 : 22,
        }
    };

    return (
        <div style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s ease-in-out" }} className="relative z-[9999]">
            {/* Custom glowing tracking ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    borderStyle: "solid",
                }}
                variants={variants}
                animate={cursorType}
                transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
            />
            {/* Fine pinpoint helper dot inside cursor - always visible at raw coordinates */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-400 rounded-full pointer-events-none z-[9999]"
                style={{
                    x: rawMouseX,
                    y: rawMouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </div>
    );
}
