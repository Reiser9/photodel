import React from "react";

import styles from "./index.module.scss";

import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";

const ProfileTeamPage = () => {
    return (
        <div className={styles.places}>
            <div className={styles.placesTop}>
                <UserInfoBlock
                    image="/img/people1.png"
                    name="Иванов"
                    surname="Александр"
                    id={1}
                    isPro
                    size="medium"
                />

                <Rating rating="4.92" />
            </div>

            <Tabs
                tabs={[
                    { name: "Моя команда", href: "/profile/team" },
                    { name: "Рекомендую", href: "/profile/team/recommend" },
                    {
                        name: "Меня рекомендуют",
                        href: "/profile/team/recommended",
                    },
                ]}
                className={styles.placesTabs}
            />
        </div>
    );
};

export default ProfileTeamPage;
