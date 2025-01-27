"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// กำหนดประเภทของ Layout Context
interface LayoutContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarState: (state: boolean) => void;
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
    setDrawerState: (state: boolean) => void;
}

// ค่าเริ่มต้นของ Context
const LayoutContext = createContext<LayoutContextProps>({
    isSidebarOpen: false,
    toggleSidebar: () => { },
    setSidebarState: () => { },
    isDrawerOpen: false,
    toggleDrawer: () => { },
    setDrawerState: () => { },
});

// Provider สำหรับ Layout Context
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const storedState = localStorage.getItem("isSidebarOpen");
            return storedState === "true";
        }
        return false;
    });

    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

    // ฟังก์ชันสลับสถานะ Sidebar
    const toggleSidebar = () => {
        setSidebarOpen((prev) => {
            const newState = !prev;
            localStorage.setItem("isSidebarOpen", newState.toString());
            return newState;
        });
    };

    // ฟังก์ชันตั้งค่าสถานะ Sidebar โดยตรง
    const setSidebarState = (state: boolean) => {
        setSidebarOpen(state);
        localStorage.setItem("isSidebarOpen", state.toString());
    };

    // ฟังก์ชันสลับสถานะ Drawer
    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    // ฟังก์ชันตั้งค่าสถานะ Drawer โดยตรง
    const setDrawerState = (state: boolean) => {
        setDrawerOpen(state);
    };

    // โหลดค่าจาก localStorage เมื่อคอมโพเนนต์ mount
    useEffect(() => {
        const storedState = localStorage.getItem("isSidebarOpen");
        if (storedState !== null) {
            setSidebarOpen(storedState === "true");
        }
    }, []);

    return (
        <LayoutContext.Provider
            value={{
                isSidebarOpen,
                toggleSidebar,
                setSidebarState,
                isDrawerOpen,
                toggleDrawer,
                setDrawerState,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
};

// Hook สำหรับใช้ Context
export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
};
