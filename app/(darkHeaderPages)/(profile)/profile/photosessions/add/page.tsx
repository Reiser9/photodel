"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

import styles from "./index.module.scss";

import type { PhotoShort } from "@/entities/photos/photo";
import { Button } from "@/shared/ui/Button";
import { CirclePlus, Lock, Remove, Unlock } from "@/shared/icons";
import { Input } from "@/shared/ui/Input";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { GetLocation } from "@/shared/ui/GetLocation";
import { Select } from "@/shared/ui/Select";
import { useUserInfo } from "@/features/user";
import { File } from "@/shared/ui/File";
import { useFile } from "@/features/file";
import useAlert from "@/shared/hooks/useAlert";
import { getHtmlInEditor } from "@/shared/utils/getHtmlInEditor";
import { BackLink } from "@/shared/ui/BackLink";
import { usePhotosessions } from "@/features/photosessions";
import { DatePicker } from "@/shared/ui/DatePicker";
import { useTeam } from "@/features/team";
import { Pro } from "@/shared/ui/Pro";

export type TempTeamItem = {
    label: string;
    value: number;
    lastName: string;
    image: string;
    isPro: boolean;
    category: string;
};

const AddPhotosessionPage = () => {
    const [photoIds, setPhotoIds] = React.useState<PhotoShort[]>([]);
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [date, setDate] = React.useState<Dayjs | Dayjs[] | null>(null);
    const [category, setCategory] = React.useState<number | null>(null);

    const [teamAdded, setTeamAdded] = React.useState<TempTeamItem | null>(null);
    const [team, setTeam] = React.useState<TempTeamItem[]>([]);

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);

    const router = useRouter();

    const { getSpecializations } = useUserInfo();
    const { uploadFile } = useFile();
    const { createPhotosession } = usePhotosessions();
    const { alertNotify } = useAlert();
    const { getTeam } = useTeam();

    const {
        data: teamData,
        isLoading: teamDataIsLoading,
        isError: teamDataIsError,
    } = useQuery({
        queryKey: ["team"],
        queryFn: () => getTeam({ status: "accepted" }),
    });

    const {
        data: specializations,
        isLoading: specializationsIsLoading,
        isError: specializationsIsError,
    } = useQuery({
        queryKey: ["specializations"],
        queryFn: () => getSpecializations(),
    });

    const removePhoto = (id: number) => {
        setPhotoIds((prev) => prev.filter((data) => data.id !== id));
    };

    const removeTeamHandler = (id: number) => {
        setTeam((prev) => prev.filter((elem) => elem.value !== id));
    };

    const uploadImage = async (image: FileList) => {
        const formData = new FormData();
        for (let i = 0; i < image.length; i++) {
            formData.append("files", image[i]);
        }

        const files = await uploadFile(formData);

        if (!files || !files.length)
            return alertNotify(
                "Ошибка",
                "Изображение не загружено, попробуйте позже",
                "warn",
            );

        setPhotoIds((prev) => [
            ...prev,
            ...files.map((data) => ({
                id: data.id,
                key: data.key,
                url: data.url,
            })),
        ]);
    };

    const createPhotosessionHandler = async () => {
        if (!photoIds.length) {
            return alertNotify(
                "Ошибка",
                "Хотя бы 1 изображение должно быть загружено",
                "warn",
            );
        }

        if (!name) {
            return alertNotify(
                "Ошибка",
                "Название обязательно должно быть заполнено",
                "warn",
            );
        }

        if (!category) {
            return alertNotify(
                "Ошибка",
                "Тип фотосессии обязательно должен быть заполнен",
                "warn",
            );
        }

        let descriptionContent;
        if (descriptionRef.current) {
            const aboutData = await descriptionRef.current.save();

            if (aboutData) {
                descriptionContent = getHtmlInEditor(aboutData.blocks);
            }
        }

        createPhotosession(
            {
                photoIds: photoIds.map((data) => data.id),
                name,
                description: descriptionContent || "",
                isPublished,
                location: coords && {
                    address,
                    latitude: coords[0],
                    longitude: coords[1],
                },
                startDate: dayjs(date?.toString()).toDate(),
                endDate: dayjs(date?.toString()).toDate(),
                team: team.map((elem) => elem.value),
                specializationId: category,
            },
            () => router.back(),
        );
    };

    React.useEffect(() => {
        if (teamAdded) {
            setTeam((prev) => [...prev, teamAdded]);
            setTeamAdded(null);
        }
    }, [teamAdded]);

    return (
        <div className={styles.addPhotoWrapper}>
            <BackLink text="Все фотосессии" link="/profile/photosessions" />

            <div className={styles.addPhoto}>
                <div className={styles.addPhotoContent}>
                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>Фотографии</p>

                        <div className={styles.placeAddPhotoItems}>
                            {photoIds.map((data) => (
                                <div
                                    key={data.id}
                                    className={styles.placeAddPhotoItem}
                                >
                                    <Image
                                        src={data.url}
                                        alt="Изображение"
                                        fill
                                    />

                                    <button
                                        className={
                                            styles.placeAddPhotoItemRemove
                                        }
                                        onClick={() => removePhoto(data.id)}
                                    >
                                        <Remove />
                                    </button>
                                </div>
                            ))}

                            <div className={styles.placeAddPhotoItemUpload}>
                                <File
                                    id="place_add"
                                    onChange={uploadImage}
                                    multiple
                                />

                                <label
                                    htmlFor="place_add"
                                    className={styles.addPhotoLabel}
                                >
                                    <CirclePlus />
                                    <span>Загрузить фотографию</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>
                            Название и описание
                        </p>

                        <Input
                            title="Название"
                            placeholder="Введите название"
                            full
                            value={name}
                            setValue={setName}
                        />

                        <Editor
                            id="photo_description"
                            editorRef={descriptionRef}
                            title="Описание"
                            placeholder="Введите описание (+0,001 к рейтингу)"
                        />
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>
                            Место съемки
                        </p>

                        <GetLocation
                            address={address}
                            setAddress={setAddress}
                            coords={coords}
                            setCoords={setCoords}
                            title="Выберите местоположение на карте"
                        />
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>
                            Данные о фотосессии
                        </p>

                        <DatePicker
                            value={date}
                            setValue={setDate}
                            title="Дата проведения"
                            disablePrevDate
                            placeholder="Выберите дату"
                        />

                        {specializations && (
                            <Select
                                title="Тип фотосессии"
                                placeholder="Выберите тип"
                                full
                                options={specializations?.map((data) => ({
                                    label: data.name,
                                    value: data.id,
                                }))}
                                error={specializationsIsError}
                                loading={specializationsIsLoading}
                                value={category}
                                setValue={setCategory}
                                allowClear
                            />
                        )}
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>Команда</p>

                        {!!team.length && (
                            <div className={styles.teamBlockItems}>
                                {team.map((data) => {
                                    const {
                                        category,
                                        image,
                                        isPro,
                                        label,
                                        lastName,
                                        value,
                                    } = data || {};

                                    return (
                                        <div
                                            key={value}
                                            className={styles.teamBlockItem}
                                        >
                                            <div
                                                className={
                                                    styles.teamBlockItemInfoWrapper
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.teamBlockItemImage
                                                    }
                                                >
                                                    <Image
                                                        src={
                                                            image ??
                                                            "/img/placeholder.png"
                                                        }
                                                        alt={`Аватар ${label} ${lastName}`}
                                                        fill
                                                    />
                                                </div>

                                                <div
                                                    className={
                                                        styles.teamBlockItemInfoInner
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.teamBlockItemInfo
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                styles.teamBlockItemInfoName
                                                            }
                                                        >
                                                            {label} {lastName}
                                                        </p>
                                                        {isPro && <Pro />}
                                                    </div>

                                                    {category && (
                                                        <p
                                                            className={
                                                                styles.teamBlockItemCategory
                                                            }
                                                        >
                                                            {category}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                className={
                                                    styles.teamBlockItemRemove
                                                }
                                                onClick={() =>
                                                    removeTeamHandler(value)
                                                }
                                            >
                                                <Remove />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <Select
                            placeholder="Добавить в команду"
                            full
                            value={teamAdded}
                            onChange={(_, option) => {
                                console.log(option);
                                setTeamAdded(option as TempTeamItem);
                            }}
                            loading={teamDataIsLoading}
                            error={teamDataIsError}
                            options={
                                !!teamData
                                    ? teamData
                                          ?.filter((elem) => {
                                              const teamIds = team.map(
                                                  (elem) => elem.value,
                                              );
                                              return !teamIds.includes(
                                                  elem.user.id,
                                              );
                                          })
                                          .map((data) => ({
                                              label: data.user.firstName,
                                              value: data.user.id,
                                              lastName: data.user.lastName,
                                              image: data.user.avatarUrl,
                                              isPro: data.user.isPro,
                                              category:
                                                  data.user.proCategories[0]
                                                      .name,
                                          }))
                                    : []
                            }
                            optionRender={({ data }) => {
                                const {
                                    label,
                                    lastName,
                                    image,
                                    isPro,
                                    category,
                                } = data || {};

                                return (
                                    <div className={styles.teamOption}>
                                        <div className={styles.teamOptionImage}>
                                            <Image
                                                src={
                                                    image ??
                                                    "/img/placeholder.png"
                                                }
                                                alt={`Аватар ${label} ${lastName}`}
                                                fill
                                            />
                                        </div>

                                        <div
                                            className={
                                                styles.teamOptionInfoInner
                                            }
                                        >
                                            <div
                                                className={
                                                    styles.teamOptionInfo
                                                }
                                            >
                                                <p
                                                    className={
                                                        styles.teamOptionInfoName
                                                    }
                                                >
                                                    {label} {lastName}
                                                </p>
                                                {isPro && <Pro />}
                                            </div>

                                            {category && (
                                                <p
                                                    className={
                                                        styles.teamOptionCategory
                                                    }
                                                >
                                                    {category}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                    </div>

                    <div className={styles.addPhotoButtons}>
                        <Button color="grey" auto onClick={() => router.back()}>
                            Отменить
                        </Button>

                        <Button auto onClick={createPhotosessionHandler}>
                            Создать
                        </Button>
                    </div>
                </div>

                <div className={styles.addPhotoSidebar}>
                    <button
                        className={styles.addPhotoButton}
                        onClick={() => setIsPublished((prev) => !prev)}
                    >
                        {isPublished ? (
                            <>
                                <Lock />
                                Скрыть
                            </>
                        ) : (
                            <>
                                <Unlock />
                                Опубликовать
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPhotosessionPage;
