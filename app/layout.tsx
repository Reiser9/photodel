import type { Metadata, Viewport } from "next";
import { SkeletonTheme } from "react-loading-skeleton";

import "./globals.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { ReactQueryProvider, ReduxProvider } from "@/shared/providers";
import {
    AuthProvider,
    LocationProvider,
    ThemeProvider,
} from "@/shared/context";
import { InitialWrapper } from "@/shared/wrappers/InitialWrapper";
import { NotifiesWrapper } from "@/shared/wrappers/NotifiesWrapper";
import { GeolocationWrapper } from "@/shared/wrappers/GeolocationWrapper";

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
                            <AuthProvider>
                                <LocationProvider>
                                    <SkeletonTheme
                                        baseColor="var(--lightGrey)"
                                        highlightColor="var(--lightWhite)"
                                    >
                                        <InitialWrapper>
                                            <GeolocationWrapper>
                                                <NotifiesWrapper>
                                                    {children}
                                                </NotifiesWrapper>
                                            </GeolocationWrapper>
                                        </InitialWrapper>
                                    </SkeletonTheme>
                                </LocationProvider>
                            </AuthProvider>
                        </ThemeProvider>
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
