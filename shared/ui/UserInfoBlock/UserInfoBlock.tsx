import React from "react";
import Link from "next/link";
import Image from "next/image";
import cn from "classnames";

import styles from "./index.module.scss";

import { Pro } from "../Pro";

type Props = {
    id?: number | string;
    image?: string;
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
    const content = () => {
        return (
            <>
                <span className={styles.userInfoBlockImg}>
                    {image && (
                        <Image
                            src={image}
                            alt={`Аватар пользователя ${name} ${surname}`}
                            fill
                        />
                    )}
                </span>

                <span className={styles.userInfoBlockName}>
                    {surname} {name}
                </span>

                {isPro && <Pro />}
            </>
        );
    };

    return (
        <div
            className={cn(styles.userInfoBlock, styles[size], {
                [styles.full]: full,
            })}
        >
            {id ? (
                <Link href={`/user/${id}`} className={styles.userInfoBlockInfo}>
                    {content()}
                </Link>
            ) : (
                <div className={styles.userInfoBlockInfo}>{content()}</div>
            )}

            {status && <p className={styles.userInfoBlockStatus}>{status}</p>}
        </div>
    );
};

export default UserInfoBlock;
