import React from "react";
import Link from "next/link";

import styles from "./index.module.scss";

import { ArrowLeft } from "@/shared/icons";

type Props = {
    href: string;
    text?: string;
};

const BackLink: React.FC<Props> = ({ href, text = "Назад" }) => {
    return (
        <div className={styles.backLinkInner}>
            <Link href={href} className={styles.backLink}>
                <ArrowLeft />
                {text}
            </Link>
        </div>
    );
};

export default BackLink;
