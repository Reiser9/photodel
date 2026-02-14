import React from "react";

import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    );
};

export default MainLayout;
