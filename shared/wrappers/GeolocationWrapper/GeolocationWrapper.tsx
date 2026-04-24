"use client";

import React from "react";

const GeolocationWrapper = ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
        if (!localStorage.getItem("location")) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const userGeolocation = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    };

                    localStorage.setItem(
                        "location",
                        JSON.stringify(userGeolocation),
                    );

                    window.dispatchEvent(
                        new CustomEvent("localstorage-sync", {
                            detail: { key: "location", value: userGeolocation },
                        }),
                    );
                },
                (error) => console.warn("Geolocation error:", error),
                { maximumAge: 6000000, enableHighAccuracy: true },
            );
        }
    }, []);

    return <>{children}</>;
};

export default GeolocationWrapper;
