import React from "react";
import Link from "next/link";

import styles from "./index.module.scss";

import { ArrowLeft } from "@/shared/icons";

type Props = {
    text: string;
    link: string;
};

const BackLink: React.FC<Props> = ({ text, link }) => {
    return (
        <div className={styles.backLinkInner}>
            <Link href={link} className={styles.backLink}>
                <ArrowLeft />
                {text}
            </Link>
        </div>
    );
};

export default BackLink;
