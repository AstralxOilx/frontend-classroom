"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./ui/button";

export function ThemeModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant={"link"}
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme mode"
            className="w-[21.5rem] transition-all duration-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
        >
            {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-600" />
            ) : (
                <Sun className="h-5 w-5 text-gray-300" />
            )} 
        </Button>

    )
}