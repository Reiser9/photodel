import React from "react";
import { Map, Placemark } from "@iminside/react-yandex-maps";

import styles from "./index.module.scss";

import { Pin2 } from "@/shared/icons";

type Props = {
    location: string;
    distance?: string;
    coords?: [number, number];
};

const MapLocation: React.FC<Props> = ({ location, distance, coords }) => {
    return (
        <>
            <div className={styles.mapLocationBlock}>
                <Pin2 />

                <p className={styles.mapLocation}>{location}</p>

                {distance && (
                    <p className={styles.mapLocationDistance}>{distance}</p>
                )}
            </div>

            {coords && (
                <div className={styles.mapLocationMap}>
                    <Map
                        defaultState={{
                            center: coords,
                            zoom: 9,
                        }}
                        width="100%"
                        height="100%"
                    >
                        <Placemark geometry={coords} options={{ iconColor: "#50A398" }} />
                    </Map>
                </div>
            )}
        </>
    );
};

export default MapLocation;
