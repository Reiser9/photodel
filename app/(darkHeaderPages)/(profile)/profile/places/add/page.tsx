"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
import { usePlaces } from "@/features/places";

const AddProfilePlace = () => {
    const [photoIds, setPhotoIds] = React.useState<
        { id: number; key: string; url: string }[]
    >([]);
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [camera, setCamera] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [conditions, setConditions] = React.useState<string | null>(null);

    const [category, setCategory] = React.useState<number[]>([]);

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);

    const router = useRouter();

    const { getSpecializations } = useUserInfo();
    const { uploadFile } = useFile();
    const { createPlace } = usePlaces();
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

    const createPlaceHandler = async () => {
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

        let descriptionContent;
        if (descriptionRef.current) {
            const aboutData = await descriptionRef.current.save();

            if (aboutData) {
                descriptionContent = getHtmlInEditor(aboutData.blocks);
            }
        }

        createPlace(
            {
                photoIds: photoIds.map((data) => data.id),
                name,
                description: descriptionContent || "",
                camera,
                price,
                conditions: conditions || "",
                isPublished,
                specializationIds: category,
                location: coords && {
                    address,
                    latitude: coords[0],
                    longitude: coords[1],
                },
            },
            () => router.back(),
        );
    };

    return (
        <div className={styles.addPhotoWrapper}>
            <BackLink text="Все места для съемок" link="/profile/places" />

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
                            title="Стоимость"
                            placeholder="Введите стоимость"
                            full
                            value={price}
                            setValue={setPrice}
                        />

                        <Select
                            value={conditions}
                            setValue={setConditions}
                            placeholder="Выберите порядок оплаты"
                            full
                            title="Порядок оплаты"
                            options={[
                                {
                                    label: "По предоплате",
                                    value: "По предоплате",
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
                                loading={categoriesIsLoading}
                                value={category}
                                setValue={setCategory}
                                allowClear
                                mode="multiple"
                            />
                        )}
                    </div>

                    <div className={styles.addPhotoButtons}>
                        <Button color="grey" auto onClick={() => router.back()}>
                            Отменить
                        </Button>

                        <Button auto onClick={createPlaceHandler}>
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

export default AddProfilePlace;
