"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

import styles from "./index.module.scss";

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
import type { PhotoShort } from "@/entities/photos/photo";
import { usePhotosessions } from "@/features/photosessions";
import { DatePicker } from "@/shared/ui/DatePicker";

const AddPhotosessionPage = () => {
    const [photoIds, setPhotoIds] = React.useState<PhotoShort[]>([]);
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [date, setDate] = React.useState<Dayjs | Dayjs[] | null>(null);
    const [category, setCategory] = React.useState<number | null>(null);

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);

    const router = useRouter();

    const { getSpecializations } = useUserInfo();
    const { uploadFile } = useFile();
    const { createPhotosession } = usePhotosessions();
    const { alertNotify } = useAlert();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getSpecializations(),
    });

    const removePhoto = (id: number) => {
        setPhotoIds((prev) => prev.filter((data) => data.id !== id));
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
                team: [],
                specializationId: category,
            },
            () => router.back(),
        );
    };

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

                        {categories && (
                            <Select
                                title="Тип фотосессии"
                                placeholder="Выберите тип"
                                full
                                options={categories?.map((data) => ({
                                    label: data.name,
                                    value: data.id,
                                }))}
                                error={categoriesIsError}
                                loading={categoriesIsLoading}
                                value={category}
                                setValue={setCategory}
                                allowClear
                            />
                        )}
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
