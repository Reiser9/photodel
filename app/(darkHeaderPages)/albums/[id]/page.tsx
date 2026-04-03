"use client";

import React from "react";
import { useParams } from "next/navigation";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { BackLink } from "@/shared/ui/BackLink";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";

const AlbumById = () => {
    const { id } = useParams();

    return (
        <div className={styles.albumById}>
            <div className={base.container}>
                <div className={styles.albumByIdInner}>
                    {/* {user && (
                        <div className={styles.photoByIdTop}>
                            <UserInfoBlock
                                image={avatarUrl}
                                name={firstName || ""}
                                surname={lastName || ""}
                                id={userId}
                                isPro={isPro}
                                size="medium"
                            />

                            <Rating rating="4.92" />
                        </div>
                    )}

                    <BackLink
                        href={`/user/${userId}/albums`}
                        text="Все альбомы"
                    /> */}

                    <div className={styles.albumByIdInfo}>
                        <p className={styles.albumByIdInfoTitle}>Гекон</p>

                        <div className={styles.albumByIdInfoText}>
                            <p>Альбом с разными фотографиями, которые не вошли в другие альбомы</p>
                        </div>
                    </div>

                    <div className={styles.albumByIdContent}>
                        <p className={styles.albumByIdContentCount}>Всего: <span>2</span></p>

                        <div className={styles.albumByIdItems}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlbumById;
