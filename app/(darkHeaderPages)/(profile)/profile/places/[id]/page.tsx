"use client";

import { useParams } from "next/navigation";

import styles from "../index.module.scss";

import { Case, Money, Photo } from "@/shared/icons";
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
    PhotoInfoBlock,
    Point,
    Points,
} from "@/shared/ui/SinglePage";

const ProfilePlaceById = () => {
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

            <BackLink href="/profile/places" text="Все места для съемок" />

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
                            location="Москва, ВДНХ"
                            distance="12  км от вас"
                        />

                        <Points>
                            <Point full>
                                <Photo />
                                Canon EOS 5D Mark IV
                            </Point>

                            <Point full>
                                <Money />5 000 руб./час
                            </Point>

                            <Point full>
                                <Case />
                                По предоплате
                            </Point>
                        </Points>

                        <TextPoint
                            title="Категории:"
                            text="Парк, прогулки, Love story"
                        />

                        <Button>Запрос на съемку</Button>
                    </>
                }
                infoBlock={
                    <PhotoInfoBlock
                        date="12 янв 2026"
                        comments={23}
                        favorites={51}
                        likes={141}
                        image="/img/photo5.png"
                        title="Московская ВДНХ"
                        text="В вечернее время тут прекрасный свет. Не ограничивайтесь только центральной аллеей, в Альпах много красивых мест стоит только прогуляться."
                    />
                }
            />
        </div>
    );
};

export default ProfilePlaceById;
