"use client";

import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { LocationCountry } from "@/entities/places";

type Geolocation = { latitude: number; longitude: number } | null;
type GeolocationCurrent = LocationCountry | null;

const LocationContext = createContext<{
    location: Geolocation;
    setLocation: React.Dispatch<React.SetStateAction<Geolocation>>;
    currentLocation: GeolocationCurrent;
    setCurrentLocation: React.Dispatch<
        React.SetStateAction<GeolocationCurrent>
    >;
}>({
    location: null,
    setLocation: () => {},
    currentLocation: null,
    setCurrentLocation: () => {},
});

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
    const [location, setLocation] = useLocalStorage<Geolocation>(
        "location",
        null,
    );
    const [currentLocation, setCurrentLocation] =
        useLocalStorage<GeolocationCurrent>("currentLocation", null);

    React.useEffect(() => {
        if (!location) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setLocation({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                },
                (err) => console.warn("Geolocation denied:", err),
                { maximumAge: 6000000, enableHighAccuracy: true },
            );
        }
    }, [location, setLocation]);

    const value = useMemo(
        () => ({ location, setLocation, currentLocation, setCurrentLocation }),
        [location, setLocation, currentLocation, setCurrentLocation],
    );

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const ctx = useContext(LocationContext);
    if (!ctx)
        throw new Error("useLocation must be used within LocationProvider");
    return ctx;
};

export default LocationProvider;
