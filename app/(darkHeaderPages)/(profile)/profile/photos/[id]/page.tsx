"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import styles from "./index.module.scss";

import { Aperture, FocalLength, Iso, Photo, Timer } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Rating } from "@/shared/ui/Rating";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Comments } from "@/widgets/Comments";
import { SinglePageWrapper } from "@/shared/wrappers/SinglePageWrapper";
import { TextPoint } from "@/shared/ui/TextPoint";
import { BackLink, MapLocation, PhotoInfoBlock, Point, Points } from "@/shared/ui/SinglePage";

const ProfilePhotoById = () => {
    const { id } = useParams();

    const [buyPhotoModal, setBuyPhotoModal] = React.useState(false);

    return (
        <>
            <div className={styles.photoById}>
                <div className={styles.photoByIdTop}>
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

                <BackLink href="/profile/photos" text="Все фотографии" />

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
                                location="Чемал"
                                distance="1813 км от вас"
                            />

                            <Points>
                                <Point full>
                                    <Photo />
                                    Canon EOS 5D Mark IV
                                </Point>

                                <Point>
                                    <Aperture />
                                    f/6.3
                                </Point>

                                <Point>
                                    <FocalLength />
                                    50 мм
                                </Point>

                                <Point>
                                    <Timer />
                                    1/200
                                </Point>

                                <Point>
                                    <Iso />
                                    200
                                </Point>
                            </Points>

                            <TextPoint
                                title="Категории:"
                                text="Парк, прогулки, Love story"
                            />

                            <TextPoint title="Фото в 2 альбомах:">
                                <div className={styles.photoByIdAlbumsItems}>
                                    <Link
                                        href="/profile/albums/1"
                                        className={styles.photoByIdAlbumsItem}
                                    >
                                        <span
                                            className={
                                                styles.photoByIdAlbumsItemImage
                                            }
                                        >
                                            <Image
                                                src="/img/photo1.png"
                                                alt="Фото альбома"
                                                fill
                                            />
                                        </span>

                                        <span
                                            className={
                                                styles.photoByIdAlbumsItemInfo
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.photoByIdAlbumsItemTitle
                                                }
                                            >
                                                Алтайский край
                                            </span>
                                            <span
                                                className={
                                                    styles.photoByIdAlbumsItemCount
                                                }
                                            >
                                                180 фото
                                            </span>
                                        </span>
                                    </Link>

                                    <Link
                                        href="profile/albums/1"
                                        className={styles.photoByIdAlbumsItem}
                                    >
                                        <span
                                            className={
                                                styles.photoByIdAlbumsItemImage
                                            }
                                        >
                                            <Image
                                                src="/img/photo2.png"
                                                alt="Фото альбома"
                                                fill
                                            />
                                        </span>

                                        <span
                                            className={
                                                styles.photoByIdAlbumsItemInfo
                                            }
                                        >
                                            <span
                                                className={
                                                    styles.photoByIdAlbumsItemTitle
                                                }
                                            >
                                                Алтайский край
                                            </span>
                                            <span
                                                className={
                                                    styles.photoByIdAlbumsItemCount
                                                }
                                            >
                                                180 фото
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            </TextPoint>

                            <TextPoint
                                title="Фото дня:"
                                text="Становилось 3 раза"
                            />

                            <Button onClick={() => setBuyPhotoModal(true)}>
                                Купить фотографию
                            </Button>
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
                            title="Московская ВДНХ"
                            text="В вечернее время тут прекрасный свет. Не ограничивайтесь только центральной аллеей, в Альпах много красивых мест стоит только прогуляться."
                        />
                    }
                />
            </div>

            <Modal
                value={buyPhotoModal}
                setValue={setBuyPhotoModal}
                title="Купить фотографию"
                size="small"
            >
                <div className={styles.buyPhotoModalForm}>
                    <Input title="Имя" full />

                    <Input title="Телефон" full />

                    <Input title="E-mail" full />

                    <Input title="Сообщение" full component="textarea" />

                    <Button>Купить</Button>
                </div>
            </Modal>
        </>
    );
};

export default ProfilePhotoById;
