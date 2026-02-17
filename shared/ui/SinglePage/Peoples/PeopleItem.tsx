import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";

import { Pro } from "../../Pro";

type Props = {
    id: string | number;
    image: string;
    name: string;
    surname: string;
    isPro?: boolean;
    role?: string;
};

const PeopleItem: React.FC<Props> = ({
    id,
    image,
    name,
    surname,
    isPro = false,
    role,
}) => {
    return (
        <Link href={`/profile/${id}`} className={styles.peopleItem}>
            <span className={styles.peopleItemImage}>
                <Image src={image} alt="Фото пользователя" fill />
            </span>

            <span className={styles.peopleItemInfo}>
                <span className={styles.peopleItemInfoWrapper}>
                    <span className={styles.peopleItemInfoName}>
                        {surname} {name}
                    </span>

                    {isPro && <Pro />}
                </span>

                {role && <span className={styles.peopleItemRole}>{role}</span>}
            </span>
        </Link>
    );
};

export default PeopleItem;
