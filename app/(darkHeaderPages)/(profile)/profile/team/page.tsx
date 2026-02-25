import React from "react";

import styles from "./index.module.scss";

import { Rating } from "@/shared/ui/Rating";
import { Tabs } from "@/shared/ui/Tabs";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import Image from "next/image";
import Link from "next/link";
import { Pro } from "@/shared/ui/Pro";
import { StatsBlock } from "@/shared/ui/StatsBlock";

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

            <div className={styles.teamItems}>
                <div className={styles.teamItem}>
                    <Link href="/" className={styles.teamItemImg}>
                        <Image src="/img/people1.png" alt="Аватар" fill />
                    </Link>

                    <div className={styles.teamItemInfo}>
                        <div className={styles.teamItemNameInner}>
                            <Link href="/" className={styles.teamItemName}>
                                Христорождественская Галина
                            </Link>

                            <Pro />
                        </div>

                        <StatsBlock rate="4.91" favorites="567" likes="567" isFavorites isLiked className={styles.teamItemActions} />
                        
                        <div className={styles.teamItemCategories}>
                            <p className={styles.teamItemCategoryMain}>Фотограф</p>
                            <p className={styles.teamItemCategoryOther}>Свадьбы, Природа и еще 2</p>
                        </div>

                        <div className={styles.teamItemLocation}>
                            <p className={styles.teamItemLocationValue}>Москва</p>
                            <p className={styles.teamItemLocationDistance}>3 км</p>
                        </div>
                    </div>
                </div>

                <div className={styles.teamItem}>
                    <Link href="/" className={styles.teamItemImg}>
                        <Image src="/img/people1.png" alt="Аватар" fill />
                    </Link>

                    <div className={styles.teamItemInfo}>
                        <div className={styles.teamItemNameInner}>
                            <Link href="/" className={styles.teamItemName}>
                                Христорождественская Галина
                            </Link>

                            <Pro />
                        </div>

                        <StatsBlock rate="4.91" favorites="567" likes="567" isFavorites isLiked className={styles.teamItemActions} />
                        
                        <div className={styles.teamItemCategories}>
                            <p className={styles.teamItemCategoryMain}>Фотограф</p>
                            <p className={styles.teamItemCategoryOther}>Свадьбы, Природа и еще 2</p>
                        </div>

                        <div className={styles.teamItemLocation}>
                            <p className={styles.teamItemLocationValue}>Москва</p>
                            <p className={styles.teamItemLocationDistance}>3 км</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTeamPage;
