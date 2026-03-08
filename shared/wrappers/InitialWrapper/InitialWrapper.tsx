"use client";

import React from "react";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider } from "antd";
import { YMaps } from "@iminside/react-yandex-maps";

import styles from "./index.module.scss";
import useUserInfo from "@/features/user/user/useUserInfo";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { Preloader } from "@/shared/ui/Preloader";

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    const authIsLoading = useAppSelector((state) => state.app.authIsLoading);
    const { getShortInfo } = useUserInfo();

    React.useEffect(() => {
        getShortInfo();
    }, []);

    if (authIsLoading) {
        return <Preloader page fill />;
    }

    return (
        <YMaps
            query={{
                lang: "ru_RU",
                apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
            }}
        >
            <ConfigProvider
                locale={ruRU}
                theme={{
                    token: {
                        colorPrimary: "#50A398",
                        fontFamily: "Montserrat, sans-serif",
                    },
                }}
            >
                <div className={styles.mainRoot}>{children}</div>
            </ConfigProvider>
        </YMaps>
    );
};

export default InitialWrapper;
