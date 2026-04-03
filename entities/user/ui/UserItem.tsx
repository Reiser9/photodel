import React from "react";
import Image from "next/image";
import cn from "classnames";
import Link from "next/link";

import styles from "./index.module.scss";

import type { UserByIdShortInfo } from "../user/model";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Pro } from "@/shared/ui/Pro";
import { StatsBlock } from "@/shared/ui/StatsBlock";

type Props = {
    data: UserByIdShortInfo;
    clickOnUser?: () => void;
    checkboxValue?: boolean;
    mode?: "default" | "edit" | "select";
    className?: string;
};

const UserItem: React.FC<Props> = ({
    data,
    clickOnUser,
    checkboxValue,
    mode = "default",
    className,
}) => {
    const {
        avatarUrl,
        distance,
        favorites,
        firstName,
        lastName,
        isPro,
        id,
        location,
        proCategories,
        specializations,
    } = data || {};

    const { address } = location || {};
    const { count, isFavorite } = favorites || {};

    const content = () => {
        return (
            <>
                {avatarUrl && (
                    <Image
                        src={avatarUrl}
                        alt={`Аватар пользователя ${firstName} ${lastName}`}
                        fill
                    />
                )}

                {(mode === "edit" || mode === "select") && (
                    <Checkbox
                        id={`user_checkbox_${id}`}
                        wrapperClass={styles.userItemCheckbox}
                        value={checkboxValue}
                    />
                )}
            </>
        );
    };

    return (
        <div className={cn(styles.userItem, className)}>
            {mode === "edit" || mode === "select" ? (
                <div
                    className={styles.userItemImage}
                    onClick={() => {
                        if (!clickOnUser) return;

                        clickOnUser();
                    }}
                >
                    {content()}
                </div>
            ) : (
                <Link href={`/user/${id}`} className={styles.userItemImage}>
                    {content()}
                </Link>
            )}

            <div className={styles.userItemInfo}>
                <div className={styles.userItemNameInner}>
                    <Link href={`/user/${id}`} className={styles.userItemName}>
                        {lastName} {firstName}
                    </Link>

                    {isPro && <Pro />}
                </div>

                <StatsBlock
                    rate={4.92}
                    favorites={count}
                    isFavorites={isFavorite}
                />

                {!!proCategories?.length && (
                    <div className={styles.userItemSpecificationInner}>
                        <p className={styles.userItemCategory}>
                            {proCategories[0]?.name}
                        </p>

                        {!!specializations?.length && (
                            <p className={styles.userItemSpecification}>
                                {specializations
                                    .map((data) => data.name)
                                    .join(", ")}
                            </p>
                        )}
                    </div>
                )}

                {address && (
                    <p className={styles.userItemAddress}>
                        {address} {distance && `| ${distance} км`}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserItem;
