"use client";

import React from "react";

const GeolocationWrapper = ({ children }: { children: React.ReactNode }) => {
    React.useEffect(() => {
        if (!localStorage.getItem("location")) {
            navigator.geolocation.getCurrentPosition(
                (pos) => console.log(pos),
                () => {},
                { maximumAge: 6000000, enableHighAccuracy: true },
            );
        }
    }, []);

    return <>{children}</>;
};

export default GeolocationWrapper;
