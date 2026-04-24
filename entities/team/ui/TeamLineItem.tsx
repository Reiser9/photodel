import Image from "next/image";

import styles from "./index.module.scss";

import type { TempTeamItem } from "../model";
import { Remove } from "@/shared/icons";
import { Pro } from "@/shared/ui/Pro";

type Props = {
    data: TempTeamItem;
    callback?: () => void;
};

const TeamLineItem: React.FC<Props> = ({ data, callback = () => {} }) => {
    const { category, image, isPro, label, lastName } = data || {};
    return (
        <div className={styles.teamBlockItem}>
            <div className={styles.teamBlockItemInfoWrapper}>
                <div className={styles.teamBlockItemImage}>
                    <Image
                        src={image ?? "/img/placeholder.png"}
                        alt={`Аватар ${label} ${lastName}`}
                        fill
                    />
                </div>

                <div className={styles.teamBlockItemInfoInner}>
                    <div className={styles.teamBlockItemInfo}>
                        <p className={styles.teamBlockItemInfoName}>
                            {label} {lastName}
                        </p>
                        {isPro && <Pro />}
                    </div>

                    {category && (
                        <p className={styles.teamBlockItemCategory}>
                            {category}
                        </p>
                    )}
                </div>
            </div>

            <button className={styles.teamBlockItemRemove} onClick={callback}>
                <Remove />
            </button>
        </div>
    );
};

export default TeamLineItem;
