"use client";

import React from "react";
import ruRU from "antd/locale/ru_RU";
import { ConfigProvider } from "antd";

import styles from "./index.module.scss";
import useUserInfo from "@/features/user/user/useUserInfo";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { Preloader } from "@/shared/ui/Preloader";

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    const authIsLoading = useAppSelector(state => state.app.authIsLoading);
    const { getShortInfo } = useUserInfo();

    React.useEffect(() => {
        getShortInfo();
    }, []);

    if(authIsLoading){
        return <Preloader page fill   />
    }

    return (
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
    );
};

export default InitialWrapper;
