"use client";

import { useParams } from "next/navigation";

import styles from "../index.module.scss";

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
} from "@/shared/ui/SinglePage";

const ProfilePhotosessionById = () => {
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

            <BackLink href="/profile/places" text="Все фотосессии" />

            <SinglePageWrapper
                content={
                    <>
                        {/* <Comments
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
                        </Comments> */}
                    </>
                }
                sidebar={
                    <>
                        <MapLocation
                            location="Москва, Хамовники"
                            distance="13  км от вас"
                        />

                        <TextPoint title="Дата проведения:" text="12.10.2020" />
                        <TextPoint title="Тип съемки:" text="Свадебная" />

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
                                image="/img/people1.png"
                                name="Вероника"
                                surname="Плетнева"
                                role="Визажист"
                                isPro
                            />
                        </Peoples>

                        <Button>Запрос на съемку</Button>
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
                        title="Предсвадебная фотосессия Овечкиных"
                        text="Вот и отгремела, пожалуй, самая ожидаемая и громкая свадьба этого года – капитана Washington Capitals Александра Овечкина и его любимой, Анастасии Шубской. Сердечно поздравляю эту красивую и яркую пару!"
                    />
                }
            />
        </div>
    );
};

export default ProfilePhotosessionById;
