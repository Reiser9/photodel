import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import { Pro } from "../Pro";

type Props = {
    id: number | string;
    image: string;
    name: string;
    surname: string;
    status?: string;
    isPro?: boolean;
    size?: "small" | "medium";
    full?: boolean;
};

const UserInfoBlock: React.FC<Props> = ({
    image,
    name,
    id,
    status,
    surname,
    isPro = false,
    size = "small",
    full = false,
}) => {
    return (
        <div
            className={cn(styles.userInfoBlock, styles[size], {
                [styles.full]: full,
            })}
        >
            <Link href={`/user/${id}`} className={styles.userInfoBlockInfo}>
                <span className={styles.userInfoBlockImg}>
                    <Image
                        src={image}
                        alt={`Аватар пользователя ${name} ${surname}`}
                        fill
                    />
                </span>

                <span className={styles.userInfoBlockName}>
                    {surname} {name}
                </span>

                {isPro && <Pro />}
            </Link>

            {status && <p className={styles.userInfoBlockStatus}>{status}</p>}
        </div>
    );
};

export default UserInfoBlock;
