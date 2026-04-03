"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { CheckCircle, CheckShield, Clock2, Mail, Trophy } from "@/shared/icons";
import { useUserInfo } from "@/features/user";
import { Pro } from "@/shared/ui/Pro";
import { Button } from "@/shared/ui/Button";
import { Rating } from "@/shared/ui/Rating";
import { formatDateToRussianMonthYear } from "@/shared/utils/formatDateToMothYear";
import { formatDate } from "@/shared/utils/formatDate";
import { Chapter } from "@/shared/ui/Chapter";

const ProfilePage = () => {
    const { getProfileInfo } = useUserInfo();

    const { data: profileData } = useQuery({
        queryKey: ["profileInfo"],
        queryFn: () => getProfileInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const {
        avatar,
        createdAt,
        isPro,
        firstName,
        lastName,
        price,
        conditions,
        equipment,
        geography,
        languages,
        proCategories,
        specializations,
        temporaryLocations,
        socials,
        about,
        status,
    } = profileData || {};

    return (
        <>
            <div className={styles.profileContent}>
                <div className={styles.profileInfoBlock}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImage}>
                            {avatar && (
                                <Image
                                    src={avatar}
                                    alt={`Аватар пользователя ${firstName} ${lastName}`}
                                    fill
                                />
                            )}
                        </div>

                        <div className={styles.profileInfoBox}>
                            <div className={styles.profileInfoNameInner}>
                                <p className={styles.profileInfoName}>
                                    {lastName} {firstName}
                                </p>

                                {isPro && <Pro />}
                            </div>

                            <div className={styles.profileInfoTags}>
                                <div className={styles.profileInfoTag}>
                                    <Clock2 />
                                    {formatDateToRussianMonthYear(createdAt)}
                                </div>

                                {/* <div className={styles.profileInfoTag}>
                                    <CheckShield />
                                    Подтвержден
                                </div> */}

                                {status && (
                                    <div className={styles.profileInfoTag}>
                                        <CheckCircle />
                                        {status}
                                    </div>
                                )}
                            </div>

                            <Button auto href="/profile/edit">
                                Редактировать
                            </Button>
                        </div>
                    </div>

                    <div className={styles.profileRating}>
                        <Rating rating="4.92" />
                    </div>
                </div>
            </div>

            <Chapter title="Общие данные">
                <div className={styles.profileBlockData}>
                    {!!proCategories?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p className={styles.profileBlockDataItemTitle}>
                                Категория:
                            </p>

                            <p className={styles.profileBlockDataItemText}>
                                {proCategories
                                    .map((data) => data.name)
                                    .join(", ")}
                            </p>
                        </div>
                    )}

                    {!!specializations?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p className={styles.profileBlockDataItemTitle}>
                                Специализация:
                            </p>

                            <p className={styles.profileBlockDataItemText}>
                                {specializations
                                    .map((data) => data.name)
                                    .join(", ")}
                            </p>
                        </div>
                    )}

                    {!!geography?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p className={styles.profileBlockDataItemTitle}>
                                География съемок:
                            </p>

                            <p className={styles.profileBlockDataItemText}>
                                {geography.join(", ")}
                            </p>
                        </div>
                    )}

                    <div className={styles.profileBlockDataItem}>
                        <p className={styles.profileBlockDataItemTitle}>
                            Стоимость услуг:
                        </p>

                        <p className={styles.profileBlockDataItemText}>
                            {price || "Не указана"}
                        </p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p className={styles.profileBlockDataItemTitle}>
                            Условия работы:
                        </p>

                        <p className={styles.profileBlockDataItemText}>
                            {conditions || "Не указаны"}
                        </p>
                    </div>

                    {equipment && (
                        <div className={styles.profileBlockDataItem}>
                            <p className={styles.profileBlockDataItemTitle}>
                                Фототехника:
                            </p>

                            <p className={styles.profileBlockDataItemText}>
                                {equipment}
                            </p>
                        </div>
                    )}

                    {!!languages?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p className={styles.profileBlockDataItemTitle}>
                                Владение языками:
                            </p>

                            <p className={styles.profileBlockDataItemText}>
                                {languages.join(", ")}
                            </p>
                        </div>
                    )}
                </div>
            </Chapter>

            {about && (
                <Chapter title="Обо мне">
                    <div className={styles.profileBlockAbout}>
                        {parse(about)}
                    </div>
                </Chapter>
            )}

            {!!socials?.length && (
                <Chapter title="Контакты">
                    <div className={styles.profileBlockPoints}>
                        {socials.map((data) => {
                            const { icon, name, value, id } = data || {};

                            if (!value) return false;

                            return (
                                <div
                                    key={id}
                                    className={styles.profileBlockPoint}
                                >
                                    <a
                                        href={value}
                                        target="_blank"
                                        className={styles.profileBlockLink}
                                    >
                                        {icon && <Mail />}
                                        {name}
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </Chapter>
            )}

            {!!temporaryLocations?.length && (
                <Chapter title="Временная геолокация">
                    {temporaryLocations.map((data) => {
                        const { startDate, endDate, comment, location } =
                            data || {};
                        const { address } = location || {};

                        return (
                            <div
                                key={data.id}
                                className={styles.profileBlockData}
                            >
                                <div className={styles.profileBlockDataItem}>
                                    <p
                                        className={
                                            styles.profileBlockDataItemTitle
                                        }
                                    >
                                        Местонахождение:
                                    </p>

                                    <p
                                        className={
                                            styles.profileBlockDataItemText
                                        }
                                    >
                                        {address}
                                    </p>
                                </div>

                                <div className={styles.profileBlockDataItem}>
                                    <p
                                        className={
                                            styles.profileBlockDataItemTitle
                                        }
                                    >
                                        Даты пребывания:
                                    </p>

                                    <p
                                        className={
                                            styles.profileBlockDataItemText
                                        }
                                    >
                                        {formatDate(startDate)} -{" "}
                                        {formatDate(endDate)}
                                    </p>
                                </div>

                                <div className={styles.profileBlockDataItem}>
                                    <p
                                        className={
                                            styles.profileBlockDataItemTitle
                                        }
                                    >
                                        Сообщение:
                                    </p>

                                    <div
                                        className={
                                            styles.profileBlockDataItemComment
                                        }
                                    >
                                        {parse(comment)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Chapter>
            )}

            <Chapter title="Статистика">
                <div className={styles.profileBlockPoints}>
                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Просмотры:</span> 1096
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Комментарии:</span> 138
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>В избранном:</span> 13
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Лайки:</span> 999
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Отзывы:</span> 807
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Избранные:</span> 1096
                        </p>
                    </div>
                </div>
            </Chapter>

            <Chapter title="Запросы">
                <div className={styles.profileBlockPoints}>
                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Запросы на съемку:</span> 1096
                        </p>
                    </div>

                    <div className={styles.profileBlockPoint}>
                        <p className={styles.profileBlockText}>
                            <span>Запросы на обучение:</span> 138
                        </p>
                    </div>
                </div>
            </Chapter>
        </>
    );
};

export default ProfilePage;
