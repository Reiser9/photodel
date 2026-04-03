"use client";

import { useParams } from "next/navigation";

import styles from "./index.module.scss";

import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "@/features/user";
import { NotContent } from "@/shared/ui/NotContent";

const UserTopInfo = () => {
    const { id } = useParams();

    const { getUserProfileById } = useUserInfo();

    const { data, isError } = useQuery({
        queryKey: ["userProfileInfo", id],
        queryFn: () => getUserProfileById(String(id)),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!id,
    });

    const { avatar, firstName, lastName, isPro, id: userId } = data || {};

    return (
        <>
            {isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : (
                <div className={styles.placesTop}>
                    <UserInfoBlock
                        image={avatar}
                        name={firstName || ""}
                        surname={lastName || ""}
                        id={userId}
                        isPro={isPro}
                        size="medium"
                    />

                    <Rating rating="4.92" />
                </div>
            )}
        </>
    );
};

export default UserTopInfo;
