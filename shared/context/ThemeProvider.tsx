"use client";

import React from "react";

import { ChangeThemeAnimate } from "../ui/ChangeThemeAnimate";

export type ThemeType = "light" | "dark";

type ThemeContextProps = {
    theme: ThemeType;
    toggleTheme: () => void;
    chooseTheme: (theme: ThemeType) => void;
    readyAnimation: boolean;
};

const ThemeContext = React.createContext<ThemeContextProps | null>(null);

export const useThemeContext = () => {
    const data = React.useContext(ThemeContext);

    if (!data) {
        throw new Error("Can not useThemeContext outside of the ThemeProvider");
    }

    return data;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = React.useState<ThemeType>("light");
    const [readyAnimation, setReadyAnimation] = React.useState(false);

    const changeThemeBody = (theme: ThemeType) => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    };

    const themeChanger = (theme: ThemeType = "light") => {
        setReadyAnimation(true);
        setTheme(theme);
        localStorage.setItem("theme", theme);

        setTimeout(() => {
            changeThemeBody(theme);
        }, 1000);
    };

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        themeChanger(newTheme);
    };

    const chooseTheme = (theme: ThemeType = "light") => {
        themeChanger(theme);
    };

    React.useEffect(() => {
        let themeLocal = localStorage.getItem("theme") as ThemeType;

        if (themeLocal !== "light" && themeLocal !== "dark") {
            themeLocal = "light";
        }

        if (themeLocal) {
            setTheme(themeLocal);
            changeThemeBody(themeLocal);
        }
    }, []);

    return (
        <ThemeContext.Provider
            value={{ theme, toggleTheme, chooseTheme, readyAnimation }}
        >
            <ChangeThemeAnimate />
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
