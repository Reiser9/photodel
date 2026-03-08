"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { Button } from "@/shared/ui/Button";
import { ArrowLeft, CirclePlus, Lock, Remove, Unlock } from "@/shared/icons";
import { Input } from "@/shared/ui/Input";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { GetLocation } from "@/shared/ui/GetLocation";
import { Select } from "@/shared/ui/Select";
import { useUserInfo } from "@/features/user";
import { Checkbox } from "@/shared/ui/Checkbox";
import { File } from "@/shared/ui/File";
import { useFile } from "@/features/file";
import useAlert from "@/shared/hooks/useAlert";
import { usePhotos } from "@/features/photos";
import { getHtmlInEditor } from "@/shared/utils/getHtmlInEditor";

const ProfileAddPhotoPage = () => {
    const [image, setImage] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [camera, setCamera] = React.useState("");
    const [aperture, setAperture] = React.useState("");
    const [focalLength, setFocalLength] = React.useState("");
    const [shutterSpeed, setShutterSpeed] = React.useState("");
    const [iso, setIso] = React.useState("");
    const [flash, setFlash] = React.useState<string | null>(null);

    const [category, setCategory] = React.useState<number[]>([]);
    const [albums, setAlbums] = React.useState<number[]>([]);

    const [isForSale, setIsForSale] = React.useState(false);
    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);

    const router = useRouter();

    const { getCategories } = useUserInfo();
    const { uploadFile } = useFile();
    const { alertNotify } = useAlert();
    const { createPhoto } = usePhotos();

    const {
        data: categories,
        isFetching: categoriesIsFetching,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const uploadImage = async (image: File) => {
        const formData = new FormData();
        formData.append("files", image);

        const files = await uploadFile(formData);

        if (!files || !files.length)
            return alertNotify(
                "Ошибка",
                "Изображение не загружено, попробуйте позже",
            );

        setImageUrl(files[0].url);
        setImage(files[0].key);
    };

    const createPhotoHandler = async () => {
        let descriptionContent;
        if (descriptionRef.current) {
            const aboutData = await descriptionRef.current.save();

            if (aboutData) {
                descriptionContent = getHtmlInEditor(aboutData.blocks);
            }
        }

        createPhoto(
            {
                image,
                name,
                camera,
                aperture,
                focalLength,
                shutterSpeed,
                iso: +iso,
                flash: flash || "",
                albumIds: [],
                isForSale,
                isPublished,
                specializationIds: category,
                description: descriptionContent || "",
                location: coords && {
                    country: address,
                    latitude: coords[0],
                    longitude: coords[1],
                    houseNumber: "",
                    city: "",
                    street: "",
                },
            },
            () => router.back(),
        );
    };

    return (
        <div className={styles.addPhotoWrapper}>
            <div className={styles.createTop}>
                <Link href="/profile/photos" className={styles.createBackLink}>
                    <ArrowLeft />
                    Все фотографии
                </Link>
            </div>

            <div className={styles.addPhoto}>
                <div className={styles.addPhotoContent}>
                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>Фотография</p>

                        <File id="photo_add" onChange={uploadImage} />

                        <label
                            htmlFor="photo_add"
                            className={styles.addPhotoLabel}
                        >
                            <CirclePlus />
                            <span>Загрузить фотографию</span>

                            {imageUrl && (
                                <Image
                                    src={imageUrl}
                                    alt="Загруженное фото"
                                    fill
                                />
                            )}
                        </label>
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
                            Данные о снимке
                        </p>

                        <Input
                            title="Фотоаппарат"
                            placeholder="Введите данные"
                            full
                            value={camera}
                            setValue={setCamera}
                        />

                        <Input
                            title="Диафрагма"
                            placeholder="Введите данные"
                            full
                            value={aperture}
                            setValue={setAperture}
                        />

                        <Input
                            title="Фокусное расстояние"
                            placeholder="Введите данные"
                            full
                            value={focalLength}
                            setValue={setFocalLength}
                        />

                        <Input
                            title="Выдержка"
                            placeholder="Введите данные"
                            full
                            value={shutterSpeed}
                            setValue={setShutterSpeed}
                        />

                        <Input
                            title="ISO"
                            placeholder="Введите данные"
                            full
                            value={iso}
                            setValue={setIso}
                            type="number"
                            inputMode="decimal"
                        />

                        <Select
                            value={flash}
                            setValue={setFlash}
                            placeholder="Выберите"
                            full
                            title="Вспышка"
                            options={[
                                {
                                    label: "Не использовалась",
                                    value: "Off",
                                },
                                {
                                    label: "Использовалась",
                                    value: "On",
                                },
                            ]}
                        />
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>Категории</p>

                        {categories && (
                            <Select
                                title="Категории"
                                placeholder="Выберите категории"
                                full
                                options={categories?.map((data) => ({
                                    label: data.name,
                                    value: data.id,
                                }))}
                                error={categoriesIsError}
                                loading={categoriesIsFetching}
                                value={category}
                                setValue={setCategory}
                                allowClear
                                mode="multiple"
                            />
                        )}
                    </div>

                    <div className={styles.addPhotoBlock}>
                        <p className={styles.addPhotoBlockTitle}>
                            Фото в альбомах
                        </p>
                    </div>

                    <div className={styles.addPhotoButtons}>
                        <Button color="grey" auto onClick={() => router.back()}>
                            Отменить
                        </Button>

                        <Button auto onClick={createPhotoHandler}>
                            Сохранить
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
                                Скрыть фото
                            </>
                        ) : (
                            <>
                                <Unlock />
                                Опубликовать фото
                            </>
                        )}
                    </button>

                    <Checkbox
                        label="Можно купить"
                        id="isForSale"
                        value={isForSale}
                        setValue={setIsForSale}
                    />

                    <button className={styles.addPhotoButton}>
                        <Remove />
                        Удалить фото
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileAddPhotoPage;
