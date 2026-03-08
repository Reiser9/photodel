import React from "react";
import { Map, Placemark, YMaps } from "@iminside/react-yandex-maps";

import styles from "./index.module.scss";

import { Pin2 } from "@/shared/icons";

type Props = {
    location: string;
    distance: string;
};

const MapLocation: React.FC<Props> = ({ location, distance }) => {
    return (
        <>
            <div className={styles.mapLocationBlock}>
                <Pin2 />

                <p className={styles.mapLocation}>{location}</p>

                <p className={styles.mapLocationDistance}>{distance}</p>
            </div>

            <div className={styles.mapLocationMap}>
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 5,
                    }}
                    width="100%"
                    height="100%"
                >
                    <Placemark geometry={[55.684751, 37.738521]} />
                </Map>
            </div>
        </>
    );
};

export default MapLocation;
