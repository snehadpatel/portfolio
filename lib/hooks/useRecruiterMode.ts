"use client";

import { useState, useEffect } from "react";

export type RecruiterRole = "ml" | "data" | "iot" | "fullstack" | null;

export const RECRUITER_ROLE_EVENT = "recruiter-role-change";

export function useRecruiterMode() {
    const [role, setRoleState] = useState<RecruiterRole>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("recruiter-role") as RecruiterRole;
            if (saved && ["ml", "data", "iot", "fullstack"].includes(saved)) {
                setRoleState(saved);
            } else {
                setRoleState(null);
            }
        }
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleRoleChange = (e: Event) => {
            const customEvent = e as CustomEvent<RecruiterRole>;
            setRoleState(customEvent.detail);
        };

        window.addEventListener(RECRUITER_ROLE_EVENT, handleRoleChange);
        return () => {
            window.removeEventListener(RECRUITER_ROLE_EVENT, handleRoleChange);
        };
    }, [isMounted]);

    const setRole = (newRole: RecruiterRole) => {
        if (typeof window !== "undefined") {
            if (newRole) {
                localStorage.setItem("recruiter-role", newRole);
            } else {
                localStorage.removeItem("recruiter-role");
            }
            setRoleState(newRole);
            const event = new CustomEvent(RECRUITER_ROLE_EVENT, { detail: newRole });
            window.dispatchEvent(event);
        }
    };

    return { role, setRole, isMounted };
}
