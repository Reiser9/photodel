import React from "react";
import {
    Map,
    Placemark,
    useYMaps,
    ZoomControl,
    SearchControl,
} from "@iminside/react-yandex-maps";

import styles from "./index.module.scss";

import { Input } from "../Input";

type CoordinatesType = [number, number];

interface IMapClickEvent {
    get: (key: string) => CoordinatesType;
}

type Props = {
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    coords: [number, number] | null;
    setCoords: React.Dispatch<React.SetStateAction<[number, number] | null>>;
    title?: string;
};

const GetLocation: React.FC<Props> = ({
    address,
    setAddress,
    coords,
    setCoords,
    title = "Местонахождения",
}) => {
    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const ymaps = useYMaps(["geocode"]);

    // Обработчик клика по карте
    const handleGeoResult = (result: ymaps.IGeocodeResult) => {
        const firstGeoObject = result.geoObjects.get(0);

        if (firstGeoObject) {
            const properties = firstGeoObject.properties;

            const location = String(properties.get("description", {}));
            const route = String(properties.get("name", {}));

            const foundAddress = {
                location,
                route,
            };

            return foundAddress;
        }
    };

    const handleClick = async (e: IMapClickEvent) => {
        const coords = e.get("coords");
        setCoords(coords);
        setLoading(true);
        setAddress("");
        setError(null);
        setIsError(false);

        await ymaps
            ?.geocode(coords)
            .then((data) => {
                const address = handleGeoResult(data);
                setAddress(`${address?.location}, ${address?.route}`);
            })
            .catch((err) => {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Ошибка получения адреса";
                console.error("Ошибка геокодирования:", err);
                setError(errorMessage);
                setIsError(true);
                setAddress("");
            });

        setLoading(false);
    };

    return (
        <div className={styles.locationWrapper}>
            <Input
                title={title}
                full
                value={loading ? "Поиск.." : address}
                error={isError}
                errorMessage={error || ""}
                readOnly
            />

            <div className={styles.locationMap}>
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 5,
                        controls: [],
                    }}
                    onClick={handleClick}
                    width="100%"
                    height="100%"
                >
                    <SearchControl />
                    <ZoomControl />
                    {coords && (
                        <Placemark
                            geometry={coords}
                            options={{ iconColor: "#50A398" }}
                        />
                    )}
                </Map>
            </div>
        </div>
    );
};

export default GetLocation;
