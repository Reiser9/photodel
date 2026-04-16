"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import styles from "./index.module.scss";

import { ArrowLeft } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
// import { PhotosBlock } from "@/shared/ui/PhotosBlock";

const ProfileAlbumById = () => {
    const { id } = useParams();

    return (
        <div className={styles.albumById}>
            <div className={styles.albumByIdTop}>
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

            <div className={styles.albumByIdBackInner}>
                <Link
                    href="/profile/photos/albums"
                    className={styles.albumByIdBack}
                >
                    <ArrowLeft />
                    Все альбомы
                </Link>
            </div>

            <div className={styles.albumByIdInfo}>
                <p className={styles.albumByIdTitle}>Название альбома</p>

                <p className={styles.albumByIdDescription}>Описание альбома</p>
            </div>

            <div className={styles.albumByIdPhotos}>
                {/* <PhotosBlock
                    count="12"
                    photos={[
                        { id: 1, src: "/img/photo1.png" },
                        { id: 2, src: "/img/photo2.png" },
                        { id: 3, src: "/img/photo3.png" },
                        { id: 4, src: "/img/photo4.png" },
                        { id: 5, src: "/img/photo5.png" },
                        { id: 6, src: "/img/photo6.png" },
                        { id: 7, src: "/img/photo7.png" },
                        { id: 8, src: "/img/photo1.png" },
                        { id: 9, src: "/img/photo2.png" },
                    ]}
                /> */}
            </div>
        </div>
    );
};

export default ProfileAlbumById;
