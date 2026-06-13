"use client";

import React from "react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Dashboard, Profile } from "@/shared/icons";
import { PrivateWrapper } from "@/shared/wrappers/PrivateWrapper";

const sidebarLinks = [
    {
        paths: ["/admin"],
        name: "Админка",
        icon: <Dashboard />,
        exact: true,
    },
    {
        paths: ["/admin/users"],
        name: "Пользователи",
        icon: <Profile />,
    },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const checkPathExact = (pathname: string, paths: string[]) => {
        let pathIsActive = false;

        paths.forEach((path) => {
            if (path === pathname) {
                pathIsActive = true;
            }
        });

        return pathIsActive;
    };

    return (
        <PrivateWrapper haveRole="moderator">
            <div className={styles.admin}>
                <div className={base.container}>
                    <div className={styles.adminInner}>
                        <div className={styles.adminSidebar}>
                            {sidebarLinks.map((data, id) => (
                                <Link
                                    key={id}
                                    href={data.paths[0]}
                                    className={cn(styles.adminSidebarLink, {
                                        [styles.active]: data.exact
                                            ? checkPathExact(
                                                  pathname,
                                                  data.paths,
                                              )
                                            : pathname.includes(data.paths[0]),
                                    })}
                                >
                                    {data.icon}
                                    {data.name}
                                </Link>
                            ))}
                        </div>

                        <div className={styles.adminContent}>{children}</div>
                    </div>
                </div>
            </div>
        </PrivateWrapper>
    );
};

export default AdminLayout;
