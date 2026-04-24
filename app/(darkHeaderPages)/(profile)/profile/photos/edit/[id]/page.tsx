"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "../../add/index.module.scss";

import { Button } from "@/shared/ui/Button";
import { CirclePlus, Lock, Remove, Unlock } from "@/shared/icons";
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
import { useAlbums, usePhotos } from "@/features/photos";
import {
    convertHtmlToEditorBlocks,
    getHtmlInEditor,
} from "@/shared/utils/getHtmlInEditor";
import { BackLink } from "@/shared/ui/BackLink";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ConfirmModal } from "@/shared/ui/Modal";

const ProfilePhotoEdit = () => {
    const { id } = useParams();
    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

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
    const [descriptionEditorIsReady, setDescriptionEditorIsReady] =
        React.useState(false);

    const router = useRouter();

    const { getSpecializations } = useUserInfo();
    const { uploadFile } = useFile();
    const { alertNotify } = useAlert();
    const { updatePhoto, getPhotoById, deletePhoto } = usePhotos();
    const { getMyAlbums } = useAlbums();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["specializations"],
        queryFn: () => getSpecializations(),
    });

    const {
        data: usersAlbums,
        isLoading: albumsIsLoading,
        isError: albumsIsError,
    } = useQuery({
        queryKey: ["myAlbums"],
        queryFn: () => getMyAlbums(),
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photoById", String(id)],
        queryFn: () => getPhotoById(String(id)),
    });

    const uploadImage = async (images: FileList) => {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("files", images[i]);
        }

        const files = await uploadFile(formData);

        if (!files || !files.length)
            return alertNotify(
                "Ошибка",
                "Изображение не загружено, попробуйте позже",
                "warn",
            );

        setImageUrl(files[0].url);
        setImage(files[0].key);
    };

    const updatePhotoHandler = async () => {
        let descriptionContent;
        if (descriptionRef.current) {
            const aboutData = await descriptionRef.current.save();

            if (aboutData) {
                descriptionContent = getHtmlInEditor(aboutData.blocks);
            }
        }

        updatePhoto(
            String(id),
            {
                image,
                name,
                camera,
                aperture,
                focalLength,
                shutterSpeed,
                iso: +iso || null,
                flash: flash || "",
                albumIds: albums,
                isForSale,
                isPublished,
                specializationIds: category,
                description: descriptionContent || "",
                location: coords && {
                    address,
                    latitude: coords[0],
                    longitude: coords[1],
                },
            },
            () => router.back(),
        );
    };

    React.useEffect(() => {
        if (data && descriptionEditorIsReady && descriptionRef.current) {
            const { description } = data;

            descriptionRef.current?.render({
                blocks: convertHtmlToEditorBlocks(description),
            });
        }
    }, [data, descriptionEditorIsReady]);

    React.useEffect(() => {
        if (data) {
            const {
                name,
                imageKey,
                imageUrl,
                location,
                camera,
                aperture,
                focalLength,
                shutterSpeed,
                flash,
                iso,
                isForSale,
                isPublished,
                specializations,
                albums,
            } = data || {};

            setName(name);
            setImage(imageKey);
            setImageUrl(imageUrl);

            setCamera(camera);
            setAperture(aperture);
            setFocalLength(focalLength);
            setShutterSpeed(shutterSpeed);
            setIso(`${iso}`);
            setFlash(flash || null);

            setCategory(specializations.map((data) => data.id));
            setAlbums(albums.map((data) => data.id));
            setAddress(location?.address || "");
            setCoords(
                location ? [location?.latitude, location?.longitude] : null,
            );

            setIsForSale(isForSale);
            setIsPublished(isPublished);
        }
    }, [data]);

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Ошибка при загрузке данных" danger />;
    }

    return (
        <>
            <div className={styles.addPhotoWrapper}>
                <BackLink text="Все фотографии" link="/profile/photos" />

                <div className={styles.addPhoto}>
                    <div className={styles.addPhotoContent}>
                        <div className={styles.addPhotoBlock}>
                            <p className={styles.addPhotoBlockTitle}>
                                Фотография
                            </p>

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
                                onReady={() =>
                                    setDescriptionEditorIsReady(true)
                                }
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
                            <p className={styles.addPhotoBlockTitle}>
                                Категории
                            </p>

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
                                    loading={categoriesIsLoading}
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

                            {usersAlbums && (
                                <Select
                                    title="Альбомы"
                                    placeholder="Выберите альбомы"
                                    full
                                    options={usersAlbums.data?.map((data) => ({
                                        label: data.title,
                                        value: data.id,
                                    }))}
                                    error={albumsIsError}
                                    loading={albumsIsLoading}
                                    value={albums}
                                    setValue={setAlbums}
                                    allowClear
                                    mode="multiple"
                                />
                            )}
                        </div>

                        <div className={styles.addPhotoButtons}>
                            <Button
                                color="grey"
                                auto
                                onClick={() => router.back()}
                            >
                                Отменить
                            </Button>

                            <Button auto onClick={updatePhotoHandler}>
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

                        <button
                            className={styles.addPhotoButton}
                            onClick={() => setConfirmDeleteModal(true)}
                        >
                            <Remove />
                            Удалить фото
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите безвозвратно удалить фото ${name}?`}
                callback={() => deletePhoto(String(id), () => router.back())}
            />
        </>
    );
};

export default ProfilePhotoEdit;
