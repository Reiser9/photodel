"use client";

import React from "react";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

type Props = {
    tabs: { href?: string; name: string }[];
    className?: string;
};

const Tabs: React.FC<Props> = ({ tabs, className }) => {
    const pathname = usePathname();

    return (
        <div className={cn(styles.tabs, className)}>
            {tabs.length > 1 ? (
                tabs.map((data, id) => (
                    <Link
                        key={id}
                        href={data.href || "/"}
                        className={cn(styles.tab, {
                            [styles.active]: pathname === data.href,
                        })}
                    >
                        {data.name}
                    </Link>
                ))
            ) : (
                <p className={styles.tab}>{tabs[0].name}</p>
            )}
        </div>
    );
};

export default Tabs;
