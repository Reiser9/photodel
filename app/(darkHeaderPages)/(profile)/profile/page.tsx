"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import parse from "html-react-parser";
import { Dayjs } from "dayjs";
import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { CheckCircle, CheckShield, Clock2, Mail, Trophy } from "@/shared/icons";
import { useUserInfo } from "@/features/user";
import { Pro } from "@/shared/ui/Pro";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { DatePicker } from "@/shared/ui/DatePicker";
import { TimePicker } from "@/shared/ui/TimePicker";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Button } from "@/shared/ui/Button";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { formatDateToRussianMonthYear } from "@/shared/utils/formatDateToMothYear";
import { formatDate } from "@/shared/utils/formatDate";
import { Chapter } from "@/shared/ui/Chapter";

const ProfilePage = () => {
    const [requestModal, setRequestModal] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(false);
    const [currentLocationModal, setCurrentLocationModal] =
        React.useState(false);
    const [tempLocationModal, setTempLocationModal] = React.useState(false);

    const [message, setMessage] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | Dayjs[] | null>(null);
    const [time, setTime] = React.useState<Dayjs | null>(null);
    const [duration, setDuration] = React.useState("");
    const [place, setPlace] = React.useState<string | null>(null);
    const [type, setType] = React.useState<string | null>(null);
    const [peoples, setPeoples] = React.useState("");
    const [budget, setBudget] = React.useState("");
    const [needMakeup, setNeedMakeup] = React.useState(false);
    const [note, setNote] = React.useState("");

    const { getProfileInfo } = useUserInfo();

    const resetRequestForm = () => {
        setDate(null);
        setTime(null);
        setDuration("");
        setPlace(null);
        setType(null);
        setPeoples("");
        setBudget("");
        setNeedMakeup(false);
        setNote("");
    };

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
        location,
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
                            <p>Категория:</p>

                            <p>
                                {proCategories
                                    .map((data) => data.name)
                                    .join(", ")}
                            </p>
                        </div>
                    )}

                    {!!specializations?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p>Специализация:</p>

                            <p>
                                {specializations
                                    .map((data) => data.name)
                                    .join(", ")}
                            </p>
                        </div>
                    )}

                    {!!geography?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p>География съемок:</p>

                            <p>{geography.join(", ")}</p>
                        </div>
                    )}

                    <div className={styles.profileBlockDataItem}>
                        <p>Стоимость услуг:</p>

                        <p>{price || "Не указана"}</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Условия работы:</p>

                        <p>{conditions || "Не указаны"}</p>
                    </div>

                    {equipment && (
                        <div className={styles.profileBlockDataItem}>
                            <p>Фототехника:</p>

                            <p>{equipment}</p>
                        </div>
                    )}

                    {!!languages?.length && (
                        <div className={styles.profileBlockDataItem}>
                            <p>Владение языками:</p>

                            <p>{languages.join(", ")}</p>
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
                        const { city, country } = location || {};

                        return (
                            <div
                                key={data.id}
                                className={styles.profileBlockData}
                            >
                                <div className={styles.profileBlockDataItem}>
                                    <p>Местонахождение:</p>

                                    <p>
                                        {country}, {city}
                                    </p>
                                </div>

                                <div className={styles.profileBlockDataItem}>
                                    <p>Даты пребывания:</p>

                                    <p>
                                        {formatDate(startDate)} -{" "}
                                        {formatDate(endDate)}
                                    </p>
                                </div>

                                <div className={styles.profileBlockDataItem}>
                                    <p>Сообщение:</p>

                                    <p>{parse(comment)}</p>
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

            <Modal
                value={requestModal}
                setValue={setRequestModal}
                title="Запрос на съемку"
            >
                <div className={styles.requestPeople}>
                    <UserInfoBlock
                        id={1}
                        image="/img/people2.png"
                        name="Харитонова"
                        surname="Елизавета"
                        isPro
                        status="Был (а) в сети 10 минут назад"
                    />
                </div>

                <div className={styles.requestForm}>
                    <div className={styles.requestFormItem}>
                        <DatePicker
                            value={date}
                            setValue={setDate}
                            title="Дата съемки"
                            disablePrevDate
                            placeholder="Выберите дату"
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <TimePicker
                            value={time}
                            setValue={setTime}
                            title="Время съемки"
                            placeholder="Выберите время"
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Input
                            title="Длительность, часов"
                            value={duration}
                            setValue={setDuration}
                            placeholder="Введите длительность"
                            full
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Select
                            value={place}
                            setValue={setPlace}
                            title="Место проведения"
                            options={[
                                { value: "0", label: "Москва" },
                                { value: "1", label: "Тюмень" },
                            ]}
                            placeholder="Выберите место"
                            full
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Select
                            value={type}
                            setValue={setType}
                            title="Тип съемки"
                            options={[
                                { value: "0", label: "Макро" },
                                { value: "1", label: "Телефонная" },
                            ]}
                            placeholder="Выберите тип"
                            full
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Input
                            title="Количество человек"
                            value={peoples}
                            setValue={setPeoples}
                            placeholder="Введите количество"
                            full
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Input
                            title="Бюджет съемки"
                            value={budget}
                            setValue={setBudget}
                            placeholder="Введите бюджет"
                            full
                        />
                    </div>

                    <div className={cn(styles.requestFormItem, styles.full)}>
                        <Checkbox
                            value={needMakeup}
                            setValue={setNeedMakeup}
                            label="Потребуется визажист"
                            id="needmakeup"
                        />
                    </div>

                    <div className={cn(styles.requestFormItem, styles.full)}>
                        <Input
                            title="Примечание"
                            value={note}
                            setValue={setNote}
                            placeholder="Введите любые дополнительные данные"
                            component="textarea"
                            full
                        />
                    </div>
                </div>

                <div className={styles.requestFormButtons}>
                    <Button
                        variant="outline"
                        auto
                        disabled={
                            !(
                                date ||
                                time ||
                                duration ||
                                place ||
                                type ||
                                peoples ||
                                budget ||
                                needMakeup ||
                                note
                            )
                        }
                        wrapperClass={styles.requestFormButton}
                        onClick={resetRequestForm}
                    >
                        Сбросить
                    </Button>

                    <Button auto wrapperClass={styles.requestFormButton}>
                        Отправить
                    </Button>
                </div>
            </Modal>

            <Modal
                value={messageModal}
                setValue={setMessageModal}
                title="Написать сообщение"
            >
                <div className={styles.messagePeople}>
                    <UserInfoBlock
                        id={1}
                        image="/img/people2.png"
                        name="Харитонова"
                        surname="Елизавета"
                        isPro
                        status="Был (а) в сети 10 минут назад"
                    />
                </div>

                <div className={styles.messageForm}>
                    <Input
                        component="textarea"
                        value={message}
                        setValue={setMessage}
                        full
                        title="Сообщение"
                    />
                </div>

                <div className={styles.messageButtons}>
                    <Button
                        href="/profile"
                        auto
                        variant="outline"
                        wrapperClass={styles.messageButton}
                    >
                        Перейти к диалогу
                    </Button>

                    <Button auto wrapperClass={styles.messageButton}>
                        Отправить
                    </Button>
                </div>
            </Modal>

            <Modal
                value={currentLocationModal}
                setValue={setCurrentLocationModal}
                title="Местонахождение"
            >
                <div className={styles.locationPeople}>
                    <UserInfoBlock
                        id={1}
                        image="/img/people2.png"
                        name="Харитонова"
                        surname="Елизавета"
                        isPro
                        status="Был (а) в сети 10 минут назад"
                    />
                </div>

                <div className={styles.locationMapInner}>
                    <Map
                        defaultState={{
                            center: [55.751574, 37.573856],
                            zoom: 5,
                        }}
                        width="100%"
                        height="100%"
                    >
                        <Placemark geometry={[55.684751, 37.738521]} />
                    </Map>
                </div>
            </Modal>

            <Modal
                value={tempLocationModal}
                setValue={setTempLocationModal}
                title="Временная геолокация"
            >
                <div className={styles.locationPeople}>
                    <UserInfoBlock
                        id={1}
                        image="/img/people2.png"
                        name="Харитонова"
                        surname="Елизавета"
                        isPro
                        status="Был (а) в сети 10 минут назад"
                    />
                </div>

                <div className={styles.locationMapInner}>
                    <Map
                        defaultState={{
                            center: [55.751574, 37.573856],
                            zoom: 5,
                        }}
                        width="100%"
                        height="100%"
                    >
                        <Placemark geometry={[55.684751, 37.738521]} />
                    </Map>
                </div>

                <div className={styles.locationInfo}>
                    <div className={styles.locationInfoPoints}>
                        <div className={styles.locationInfoPoint}>
                            <p>Нахожусь сейчас:</p>

                            <p>Коломбо, Шри-Ланка</p>
                        </div>

                        <div className={styles.locationInfoPoint}>
                            <p>Дата пребывания:</p>

                            <p>01.12.2020 - 30.12.2020</p>
                        </div>
                    </div>

                    <p className={styles.locationInfoText}>
                        Всем привет! Практически весь декабрь провожу на
                        Шри-Ланке. Готов поснимать на всем восточном побережье.
                        Пишите в запросы и смотрите места для съемок. Недорого!
                        Сделаю хорошую скидку!
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default ProfilePage;
