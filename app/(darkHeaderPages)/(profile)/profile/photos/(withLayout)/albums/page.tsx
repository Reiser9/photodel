import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "../index.module.scss";

const ProfileAlbumsPage = () => {
    return (
        <>
            <div className={styles.albumsTop}>
                <p className={styles.albumsTopCount}>
                    Всего: <span>2</span>
                </p>
            </div>

            <div className={styles.albumItems}>
                <Link href="/profile/albums/1" className={styles.albumItem}>
                    <span className={styles.albumItemImage}>
                        <Image src="/img/photo5.png" alt="Фото альбома" fill />
                    </span>

                    <span className={styles.albumItemInfo}>
                        <span className={styles.albumItemInfoTitle}>
                            Название альбома
                        </span>

                        <span className={styles.albumItemInfoCount}>
                            5 фото
                        </span>
                    </span>
                </Link>

                <Link href="/profile/albums/1" className={styles.albumItem}>
                    <span className={styles.albumItemImage}>
                        <Image src="/img/photo5.png" alt="Фото альбома" fill />
                    </span>

                    <span className={styles.albumItemInfo}>
                        <span className={styles.albumItemInfoTitle}>
                            Название альбома
                        </span>

                        <span className={styles.albumItemInfoCount}>
                            5 фото
                        </span>
                    </span>
                </Link>

                <Link href="/profile/albums/1" className={styles.albumItem}>
                    <span className={styles.albumItemImage}>
                        <Image src="/img/photo5.png" alt="Фото альбома" fill />
                    </span>

                    <span className={styles.albumItemInfo}>
                        <span className={styles.albumItemInfoTitle}>
                            Название альбома
                        </span>

                        <span className={styles.albumItemInfoCount}>
                            5 фото
                        </span>
                    </span>
                </Link>
            </div>
        </>
    );
};

export default ProfileAlbumsPage;
