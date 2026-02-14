import type { Metadata, Viewport } from "next";
import { SkeletonTheme } from "react-loading-skeleton";

import "./globals.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { ReactQueryProvider, ReduxProvider } from "@/shared/providers";
import { ThemeProvider } from "@/shared/context";
import { InitialWrapper } from "@/shared/wrappers/InitialWrapper";

export const metadata: Metadata = {
    title: "Фотодел",
    description: "Фотодел - найдите фотографа, модель или студию для съемок",
};

export const viewport: Viewport = {
    initialScale: 1,
    width: "device-width",
    maximumScale: 1,
    userScalable: false,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body>
                <ReduxProvider>
                    <ReactQueryProvider>
                        <ThemeProvider>
                            <SkeletonTheme
                                baseColor="var(--input)"
                                highlightColor="var(--inputDarken)"
                            >
                                <InitialWrapper>{children}</InitialWrapper>
                            </SkeletonTheme>
                        </ThemeProvider>
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
