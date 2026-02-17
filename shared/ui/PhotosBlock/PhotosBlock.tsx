import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";

type Props = {
    count?: number | string;
    photos: { id: string | number; src: string }[];
};

const PhotosBlock: React.FC<Props> = ({ count, photos }) => {
    return (
        <>
            {count && (
                <div className={styles.photoTop}>
                    <p className={styles.photoTopCount}>
                        Всего: <span>{count}</span>
                    </p>
                </div>
            )}

            <div className={styles.photoItems}>
                {photos.map((data, id) => (
                    <Link
                        key={id}
                        href={`/profile/photos/${data.id}`}
                        className={styles.photoItem}
                    >
                        <Image src={data.src} alt="Фото" fill />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default PhotosBlock;
