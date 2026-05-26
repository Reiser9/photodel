import React from "react";

import styles from "./index.module.scss";

import { Tabs } from "@/shared/ui/Tabs";

const RequestLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.requests}>
            <Tabs
                tabs={[
                    { name: "Запросы на съемку", href: "/profile/requests" },
                    {
                        name: "Запросы на обучения",
                        href: "/profile/requests/training",
                    },
                ]}
            />

            {children}
        </div>
    );
};

export default RequestLayout;
