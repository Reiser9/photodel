"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import { Dayjs } from "dayjs";
import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";

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
    Star,
    Trophy,
} from "@/shared/icons";
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

    return (
        <>
            <div className={styles.profileContent}>
                <div className={styles.profileInfoBlock}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImage}>
                            <Image src="/img/people2.png" alt="Аватар" fill />
                        </div>

                        <div className={styles.profileInfoBox}>
                            <div className={styles.profileInfoNameInner}>
                                <p className={styles.profileInfoName}>
                                    Иванов Александр
                                </p>

                                <Pro />
                            </div>

                            <p className={styles.profileInfoOnline}>
                                Заходил(а) 15 минут назад
                            </p>

                            <div className={styles.profileInfoTags}>
                                <div className={styles.profileInfoTag}>
                                    <Clock2 />С декабря 2020
                                </div>

                                <div className={styles.profileInfoTag}>
                                    <CheckShield />
                                    Подтвержден
                                </div>

                                <div className={styles.profileInfoTag}>
                                    <CheckCircle />
                                    Свободен
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.profileRating}>
                        <Rating rating="4.92" />

                        <p className={styles.profileRatingTop}>
                            <Trophy />
                            10-й в Москве
                        </p>
                    </div>
                </div>

                <div className={styles.profileLocationInner}>
                    <button
                        className={styles.profileLocationBlock}
                        onClick={() => setCurrentLocationModal(true)}
                    >
                        <Pin2 />

                        <span className={styles.profileLocationValue}>
                            Москва, Хамовники
                        </span>

                        <span className={styles.profileLocationDistance}>
                            7 км от Вас
                        </span>
                    </button>

                    <button
                        className={styles.profileLocationCurrent}
                        onClick={() => setTempLocationModal(true)}
                    >
                        <Location />
                        Сейчас в Коломбо, Шри-Ланка
                    </button>
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

                    <button className={styles.profileButton}>
                        <Bookmark2 />
                        Добавить в избранное
                    </button>
                </div>
            </div>

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Общие данные</p>

                <div className={styles.profileBlockData}>
                    <div className={styles.profileBlockDataItem}>
                        <p>Категория:</p>

                        <p>Фотограф</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Специализация:</p>

                        <p>Природа, Репортаж, Предметная</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>География съемок:</p>

                        <p>Россия, Колумбия, Словакия</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Стоимость услуг:</p>

                        <p>от 5 000 руб./ час, 30 000 руб./ день</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Условия работы:</p>

                        <p>По предоплате, TFP - нет</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Фототехника:</p>

                        <p>Canon EOS 5D Mark IV, Pentax Optio X</p>
                    </div>

                    <div className={styles.profileBlockDataItem}>
                        <p>Владение языками:</p>

                        <p>Русский, Английский</p>
                    </div>
                </div>
            </div>

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Обо мне</p>

                <div className={styles.profileBlockAbout}>
                    <p>
                        Здравствуйте! Меня зовут Иванов Александр - я
                        профессиональный фотограф.
                    </p>

                    <p>
                        Вхожу в 10-ку Лучших свадебных фотографов Москвы за
                        2017-2018 год по версии свадебного портала
                        &ldquo;Свадебный эксперт&ldquo;.
                    </p>

                    <p>
                        Профессиональная фотосъемка любых торжеств: свадьбы,
                        юбилеи, корпоративы, утренники, выпускные, портфолио,
                        репортаж, студийная съемка и др. Выбирая меня, Вы
                        инвестируете в потрясающие эмоции на долгие-долгие годы!
                    </p>

                    <p>
                        Если вам понравились мои фотографии, и вы хотели бы
                        видеть меня фотографом на вашей свадьбе, свяжитесь со
                        мной любым удобным способом, мы обязательно встретимся и
                        обсудим детали.
                    </p>
                </div>
            </div>

            <div className={styles.profileBlock}>
                <p className={styles.profileBlockTitle}>Контакты</p>

                <div className={styles.profileBlockPoints}>
                    <div className={styles.profileBlockPoint}>
                        <a href="#" className={styles.profileBlockLink}>
                            <Mail />
                            info@ivanov-alex.ru
                        </a>
                    </div>
                </div>
            </div>

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
                    <YMaps>
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
                    </YMaps>
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
                    <YMaps>
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
                    </YMaps>
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
                        Всем привет! Практически весь декабрь провожу на Шри-Ланке. Готов поснимать на всем восточном побережье. Пишите в запросы и смотрите места для съемок. Недорого! Сделаю хорошую скидку!
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default ProfilePage;
