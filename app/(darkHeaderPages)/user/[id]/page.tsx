"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import parse from "html-react-parser";
import dayjs, { Dayjs } from "dayjs";
import { Map, Placemark } from "@iminside/react-yandex-maps";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import styles from "./index.module.scss";

import {
    Bookmark2,
    CheckCircle,
    CheckShield,
    Clock2,
    Edit,
    Location,
    Mail,
    Pin2,
    Trophy,
} from "@/shared/icons";
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
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { useFavorite } from "@/features/favorite";
import { usePlaces } from "@/features/places";
import useAlert from "@/shared/hooks/useAlert";
import { GetLocation } from "@/shared/ui/GetLocation";
import { getISOWithOffset } from "@/shared/utils/getISOWithOffset";
import { useMessanger } from "@/features/messanger";

const ProfileUserPage = () => {
    const { id } = useParams();

    const [requestModal, setRequestModal] = React.useState(false);
    const [messageModal, setMessageModal] = React.useState(false);
    const [currentLocationModal, setCurrentLocationModal] =
        React.useState(false);
    const [tempLocationModal, setTempLocationModal] = React.useState(false);

    const [message, setMessage] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | Dayjs[] | null>(null);
    const [time, setTime] = React.useState<Dayjs | null>(null);
    const [duration, setDuration] = React.useState("");
    const [type, setType] = React.useState<string | null>(null);
    const [peoples, setPeoples] = React.useState("");
    const [budget, setBudget] = React.useState("");
    const [needMakeup, setNeedMakeup] = React.useState(false);
    const [note, setNote] = React.useState("");
    const [placeAddress, setPlaceAddress] = React.useState("");
    const [placeCoords, setPlaceCoords] = React.useState<
        [number, number] | null
    >(null);

    const { getUserProfileById } = useUserInfo();
    const { addFavorite, removeFavorite } = useFavorite();
    const { createPlacesRequest } = usePlaces();
    const { alertNotify } = useAlert();
    const { sendMessage } = useMessanger();

    const queryClient = useQueryClient();

    const resetRequestForm = () => {
        setDate(null);
        setTime(null);
        setDuration("");
        setType(null);
        setPeoples("");
        setBudget("");
        setNeedMakeup(false);
        setNote("");
        setPlaceCoords(null);
        setPlaceAddress("");
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["userProfileInfo", id],
        queryFn: () => getUserProfileById(String(id)),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!id,
    });

    const {
        id: userId,
        avatar,
        createdAt,
        firstName,
        isPro,
        lastName,
        price,
        about,
        conditions,
        equipment,
        geography,
        languages,
        location,
        proCategories,
        socials,
        specializations,
        status,
        activeTemporaryLocation,
        favorites,
        reviews,
    } = data || {};

    const { isFavorite, favoriteId } = favorites || {};
    const { rating } = reviews || {};

    const {
        startDate,
        endDate,
        comment,
        location: tempLocation,
    } = activeTemporaryLocation || {};

    const { address, latitude, longitude } = tempLocation || {};
    const {
        address: currentAddress,
        latitude: currentLatitude,
        longitude: currentLongitude,
    } = location || {};

    const invalidateUserProfile = () => {
        queryClient.invalidateQueries({ queryKey: ["userProfileInfo", id] });
    };

    const addFavoriteHandler = () => {
        if (!userId) return;

        addFavorite(
            {
                entityType: "user",
                entityId: userId,
            },
            invalidateUserProfile,
        );
    };

    const removeFavoriteHandler = () => {
        if (!favoriteId) return;

        removeFavorite(favoriteId, invalidateUserProfile);
    };

    const sendMessageHandler = () => {
        sendMessage(String(id), message, "user", () => {
            setMessageModal(false);
            setMessage("");
            alertNotify("Успешно", "Сообщение отправлено");
        });
    };

    const createPlacesRequestHandler = () => {
        if (!userId) return;

        if (!date || !time) {
            return alertNotify(
                "Внимание",
                "Дата и время должны быть заполнены",
                "warn",
            );
        }
        if (!duration) {
            return alertNotify(
                "Внимание",
                "Длительность должно быть заполнено",
                "warn",
            );
        }
        if (!placeAddress) {
            return alertNotify(
                "Внимание",
                "Место проведения должно быть заполнено",
                "warn",
            );
        }
        if (!type) {
            return alertNotify(
                "Внимание",
                "Тип съемки должен быть заполнен",
                "warn",
            );
        }
        if (!peoples) {
            return alertNotify(
                "Внимание",
                "Количество человек должно быть заполнено",
                "warn",
            );
        }
        if (!budget) {
            return alertNotify(
                "Внимание",
                "Бюджет должен быть заполнен",
                "warn",
            );
        }

        createPlacesRequest(
            {
                userId,
                date: getISOWithOffset(date, time) || "",
                budget,
                comment: note,
                durationHours: +duration,
                needsMakeupArtist: needMakeup,
                peoplesCount: +peoples,
                type,
                location: placeCoords && {
                    address: placeAddress,
                    latitude: placeCoords[0],
                    longitude: placeCoords[1],
                },
            },
            () => {
                alertNotify("Успешно", "Запрос на съемку отправлен");
                setRequestModal(false);
                resetRequestForm();
            },
        );
    };

    return (
        <>
            <div className={styles.profileContent}>
                <div className={styles.profileInfoBlock}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImage}>
                            <Image
                                src={avatar ?? "/img/placeholder.png"}
                                alt={`Аватар пользователя ${firstName} ${lastName}`}
                                fill
                            />
                        </div>

                        <div className={styles.profileInfoBox}>
                            <div className={styles.profileInfoNameInner}>
                                <p className={styles.profileInfoName}>
                                    {firstName} {lastName}
                                </p>

                                {isPro && <Pro />}
                            </div>

                            <p className={styles.profileInfoOnline}>
                                Заходил(а) 15 минут назад
                            </p>

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
                        </div>
                    </div>

                    <div className={styles.profileRating}>
                        <Rating rating={rating || 0} />

                        {/* <p className={styles.profileRatingTop}>
                            <Trophy />
                            10-й в Москве
                        </p> */}
                    </div>
                </div>

                <div className={styles.profileLocationInner}>
                    {location && (
                        <button
                            className={styles.profileLocationBlock}
                            onClick={() => setCurrentLocationModal(true)}
                        >
                            <Pin2 />

                            <span className={styles.profileLocationValue}>
                                {location.address}
                            </span>

                            {/* <span className={styles.profileLocationDistance}>
                                7 км от Вас
                            </span> */}
                        </button>
                    )}

                    {activeTemporaryLocation && (
                        <button
                            className={styles.profileLocationCurrent}
                            onClick={() => setTempLocationModal(true)}
                        >
                            <Location />
                            Сейчас в {tempLocation?.address}
                        </button>
                    )}
                </div>

                <div className={styles.profileButtons}>
                    <button
                        className={cn(styles.profileButton, styles.outline)}
                        onClick={() => setMessageModal(true)}
                    >
                        <Mail />
                        Написать сообщение
                    </button>

                    <button
                        className={styles.profileButton}
                        onClick={() => setRequestModal(true)}
                    >
                        <Edit />
                        Запрос на съемку
                    </button>

                    {isFavorite ? (
                        <button
                            className={styles.profileButton}
                            onClick={removeFavoriteHandler}
                        >
                            <Bookmark2 />
                            Удалить из избранного
                        </button>
                    ) : (
                        <button
                            className={styles.profileButton}
                            onClick={addFavoriteHandler}
                        >
                            <Bookmark2 />
                            Добавить в избранное
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Общие данные</p>

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
            </div>

            {about && (
                <div className={styles.profileBlock}>
                    <p className={styles.profileBlockTitle}>Обо мне</p>

                    <div className={styles.profileBlockAbout}>
                        {parse(about)}
                    </div>
                </div>
            )}

            {!!socials?.length && (
                <div className={styles.profileBlock}>
                    <p className={styles.profileBlockTitle}>Контакты</p>

                    <div className={styles.profileBlockPoints}>
                        {socials.map((data) => {
                            const { id, name, profileIcon, value } = data || {};

                            return (
                                <div
                                    key={id}
                                    className={styles.profileBlockPoint}
                                >
                                    <p
                                        className={styles.profileBlockLink}
                                        title={name}
                                    >
                                        {profileIcon && parse(profileIcon)}
                                        {value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Статистика</p>

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
            </div>

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Запросы</p>

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
            </div>

            <Modal
                value={requestModal}
                setValue={setRequestModal}
                title="Запрос на съемку"
            >
                <div className={styles.requestPeople}>
                    <UserInfoBlock
                        id={String(id)}
                        image={avatar}
                        name={firstName || ""}
                        surname={lastName || ""}
                        isPro={isPro}
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
                            type="number"
                            inputMode="decimal"
                        />
                    </div>

                    <div className={styles.requestFormItem}>
                        <Select
                            value={type}
                            setValue={setType}
                            title="Тип съемки"
                            options={[
                                { value: "Архитектура", label: "Архитектура" },
                                { value: "Город", label: "Город" },
                                { value: "Горы", label: "Горы" },
                                { value: "Детский мир", label: "Детский мир" },
                                { value: "Интерьер", label: "Интерьер" },
                                { value: "Лес", label: "Лес" },
                                { value: "Море", label: "Море" },
                                { value: "Общепит", label: "Общепит" },
                                { value: "Парк", label: "Парк" },
                                { value: "Пейзаж", label: "Пейзаж" },
                                { value: "Природа", label: "Природа" },
                                { value: "Путешествия", label: "Путешествия" },
                                { value: "Город", label: "Город" },
                                { value: "Спорт", label: "Спорт" },
                                { value: "Улицы", label: "Улицы" },
                                { value: "Фотостудия", label: "Фотостудия" },
                                { value: "Церковь", label: "Церковь" },
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
                            type="number"
                            inputMode="decimal"
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

                    <GetLocation
                        address={placeAddress}
                        setAddress={setPlaceAddress}
                        coords={placeCoords}
                        setCoords={setPlaceCoords}
                        title="Место проведения"
                    />

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
                                placeAddress ||
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

                    <Button
                        auto
                        wrapperClass={styles.requestFormButton}
                        onClick={createPlacesRequestHandler}
                    >
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
                        id={String(id)}
                        image={avatar}
                        name={firstName || ""}
                        surname={lastName || ""}
                        isPro={isPro}
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
                        href={`/profile/messanger`}
                        auto
                        variant="outline"
                        wrapperClass={styles.messageButton}
                    >
                        Перейти к диалогу
                    </Button>

                    <Button
                        auto
                        wrapperClass={styles.messageButton}
                        onClick={sendMessageHandler}
                    >
                        Отправить
                    </Button>
                </div>
            </Modal>

            {location && (
                <Modal
                    value={currentLocationModal}
                    setValue={setCurrentLocationModal}
                    title="Местонахождение"
                >
                    <div className={styles.locationPeople}>
                        <UserInfoBlock
                            id={String(id)}
                            image={avatar}
                            name={firstName || ""}
                            surname={lastName || ""}
                            isPro={isPro}
                            status="Был (а) в сети 10 минут назад"
                        />
                    </div>

                    <div className={styles.locationMapInner}>
                        <Map
                            defaultState={{
                                center: [
                                    currentLatitude || 0,
                                    currentLongitude || 0,
                                ],
                                zoom: 9,
                            }}
                            width="100%"
                            height="100%"
                        >
                            <Placemark
                                geometry={[currentLatitude, currentLongitude]}
                                options={{ iconColor: "#50a398" }}
                            />
                        </Map>
                    </div>

                    <div className={styles.locationInfo}>
                        <div className={styles.locationInfoPoints}>
                            <div className={styles.locationInfoPoint}>
                                <p>Местонахождения:</p>

                                <p>{currentAddress}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}

            {activeTemporaryLocation && (
                <Modal
                    value={tempLocationModal}
                    setValue={setTempLocationModal}
                    title="Временная геолокация"
                >
                    <div className={styles.locationPeople}>
                        <UserInfoBlock
                            id={String(id)}
                            image={avatar}
                            name={firstName || ""}
                            surname={lastName || ""}
                            isPro={isPro}
                            status="Был (а) в сети 10 минут назад"
                        />
                    </div>

                    <div className={styles.locationMapInner}>
                        <Map
                            defaultState={{
                                center: [latitude || 0, longitude || 0],
                                zoom: 9,
                            }}
                            width="100%"
                            height="100%"
                        >
                            <Placemark
                                geometry={[latitude, longitude]}
                                options={{ iconColor: "#50a398" }}
                            />
                        </Map>
                    </div>

                    <div className={styles.locationInfo}>
                        <div className={styles.locationInfoPoints}>
                            <div className={styles.locationInfoPoint}>
                                <p>Нахожусь сейчас:</p>

                                <p>{address}</p>
                            </div>

                            <div className={styles.locationInfoPoint}>
                                <p>Дата пребывания:</p>

                                <p>
                                    {formatDate(startDate)} -{" "}
                                    {formatDate(endDate)}
                                </p>
                            </div>
                        </div>

                        <div className={styles.locationInfoText}>
                            {parse(comment || "")}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ProfileUserPage;
