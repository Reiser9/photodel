import React from "react";
import Image from "next/image";

import styles from "./index.module.scss";

import type { TempTeamItem } from "../model";
import { Pro } from "@/shared/ui/Pro";

type Props = {
    data: TempTeamItem;
};

const TeamOption: React.FC<Props> = ({ data }) => {
    const { label, lastName, image, isPro, category } = data || {};

    return (
        <div className={styles.teamOption}>
            <div className={styles.teamOptionImage}>
                <Image
                    src={image ?? "/img/placeholder.png"}
                    alt={`Аватар ${label} ${lastName}`}
                    fill
                />
            </div>

            <div className={styles.teamOptionInfoInner}>
                <div className={styles.teamOptionInfo}>
                    <p className={styles.teamOptionInfoName}>
                        {label} {lastName}
                    </p>
                    {isPro && <Pro />}
                </div>

                {category && (
                    <p className={styles.teamOptionCategory}>{category}</p>
                )}
            </div>
        </div>
    );
};

export default TeamOption;
