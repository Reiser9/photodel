import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import styles from "./index.module.scss";

import { Bookmark2, Comment, Heart } from "@/shared/icons";
import { Tabs } from "@/shared/ui/Tabs";
import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";

const ProfilePhotosessionsPage = () => {
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
                tabs={[{ name: "Фотосессии" }]}
                className={styles.placesTabs}
            />

            <div className={styles.placesContent}>
                <p className={styles.placesCount}>
                    Всего: <span>3</span>
                </p>

                <div className={styles.placesItems}>
                    <Link
                        href="/profile/photosessions/1"
                        className={styles.placesItem}
                    >
                        <span className={styles.placesItemImage}>
                            <Image
                                src="/img/photo4.png"
                                alt="Фото фотосессии"
                                fill
                            />
                        </span>

                        <span className={styles.placesItemInfo}>
                            <span className={styles.placesItemLocation}>
                                <span>Москва</span>
                                <span>5 км</span>
                            </span>

                            <span className={styles.placesItemTitle}>
                                Свадебная фотосессия
                            </span>

                            <span className={styles.placesItemActions}>
                                <span
                                    className={cn(
                                        styles.placesItemAction,
                                        styles.like,
                                        styles.active,
                                    )}
                                >
                                    <Heart />
                                    675
                                </span>

                                <span
                                    className={cn(
                                        styles.placesItemAction,
                                        styles.comment,
                                    )}
                                >
                                    <Comment />
                                    345
                                </span>

                                <span
                                    className={cn(
                                        styles.placesItemAction,
                                        styles.active,
                                    )}
                                >
                                    <Bookmark2 />
                                    374
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePhotosessionsPage;
