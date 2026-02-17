"use client";

import { useParams } from "next/navigation";

import styles from "../index.module.scss";

import { Case, Date, Format, Money, Photo } from "@/shared/icons";
import { Rating } from "@/shared/ui/Rating";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { SinglePageWrapper } from "@/shared/wrappers/SinglePageWrapper";
import { Comments } from "@/widgets/Comments";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { TextPoint } from "@/shared/ui/TextPoint";
import {
    BackLink,
    MapLocation,
    PeopleItem,
    Peoples,
    PhotoInfoBlock,
    Point,
    Points,
} from "@/shared/ui/SinglePage";

const ProfileTrainingById = () => {
    const { id } = useParams();

    return (
        <div className={styles.placeById}>
            <div className={styles.placeByIdTop}>
                <UserInfoBlock
                    image="/img/people1.png"
                    name="Иванов"
                    surname="Александр"
                    id={1}
                    isPro
                    size="medium"
                />

                <Rating rating="4.92" />
            </div>

            <BackLink href="/profile/trainings" text="Все обучения" />

            <SinglePageWrapper
                content={
                    <>
                        <Comments
                            comments={[
                                {
                                    comment: "Тест",
                                    id: 1,
                                    image: "/img/people2.png",
                                    name: "Сара",
                                    surname: "Балтимор",
                                    status: "Сегодня 20:10",
                                    isPro: true,
                                },
                            ]}
                        >
                            <Input
                                placeholder="Ваш комментарий"
                                component="textarea"
                                full
                            />

                            <Button auto disabled>
                                Комментарировать
                            </Button>
                        </Comments>
                    </>
                }
                sidebar={
                    <>
                        <MapLocation
                            location="Москва, ВДНХ"
                            distance="12  км от вас"
                        />

                        <Points>
                            <Point full>
                                <Format />
                                Оффлайн
                            </Point>

                            <Point full>
                                <Date />3 дня, 22 янв - 24 янв
                            </Point>

                            <Point full>
                                <Money />
                                12 000 руб.
                            </Point>
                        </Points>

                        <TextPoint title="Предоплата:" text="3 000 руб." />

                        <p className={styles.trainingPlacesLeft}>
                            6 из 10 мест свободно
                        </p>

                        <Button>Записаться</Button>

                        <Peoples title="Организаторы">
                            <PeopleItem
                                id="1"
                                image="/img/people3.png"
                                name="Альберт"
                                surname="Кокшаров"
                                role="Фотограф"
                                isPro
                            />
                        </Peoples>

                        <Peoples title="Команда">
                            <PeopleItem
                                id="1"
                                image="/img/people3.png"
                                name="Альберт"
                                surname="Кокшаров"
                                role="Фотограф"
                                isPro
                            />

                            <PeopleItem
                                id="1"
                                image="/img/people3.png"
                                name="Альберт"
                                surname="Кокшаров"
                                role="Фотограф"
                                isPro
                            />
                        </Peoples>

                        <Peoples title="Участники">
                            <PeopleItem
                                id="1"
                                image="/img/people3.png"
                                name="Альберт"
                                surname="Кокшаров"
                                isPro
                            />
                        </Peoples>
                    </>
                }
                infoBlock={
                    <PhotoInfoBlock
                        date="12 янв 2026"
                        comments={23}
                        favorites={51}
                        likes={141}
                        views={23}
                        image="/img/photo5.png"
                        title="Большой мастер-класс по свадебной фотографии"
                        text="9 часов обучения — 3 продуктивных дня."
                    />
                }
            />
        </div>
    );
};

export default ProfileTrainingById;
