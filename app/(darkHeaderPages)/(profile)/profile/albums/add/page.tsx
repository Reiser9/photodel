"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import styles from "./index.module.scss";

import useAlert from "@/shared/hooks/useAlert";
import { BackLink } from "@/shared/ui/BackLink";
import { File } from "@/shared/ui/File";
import { CirclePlus, Lock, Unlock } from "@/shared/icons";
import { useFile } from "@/features/file";
import { Input } from "@/shared/ui/Input";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { Button } from "@/shared/ui/Button";
import { getHtmlInEditor } from "@/shared/utils/getHtmlInEditor";
import { useAlbums, usePhotos } from "@/features/photos";
import { Pagination } from "@/shared/ui/Pagination";
import { NotContent } from "@/shared/ui/NotContent";
import { PhotoItem } from "@/entities/photos/photo/ui";
import { Preloader } from "@/shared/ui/Preloader";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";

const ProfileAlbumAdd = () => {
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

    const [image, setImage] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [title, setTitle] = React.useState("");

    const [isPublished, setIsPublished] = React.useState(false);

    const [photoIds, setPhotoIds] = React.useState<number[]>([]);

    const [tab, setTab] = React.useState<"content" | "photos">("content");

    const descriptionRef = React.useRef<EditorCore | null>(null);

    const { uploadFile } = useFile();
    const { alertNotify } = useAlert();
    const { createAlbum } = useAlbums();
    const { getPhotos } = usePhotos();
    const router = useRouter();

    const {
        data: photosData,
        isLoading: photosIsLoading,
        isError: photosIsError,
    } = useQuery({
        queryKey: ["photos", page],
        queryFn: () =>
            getPhotos({
                page,
                limit: 6,
                my: true
            }),
    });

    const { totalPages, data: photos, total } = photosData || {};

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const uploadImage = async (images: FileList) => {
        const formData = new FormData();
        for(let i = 0; i < images.length; i++){
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

    const createAlbumHandler = async () => {
        if (!image || !imageUrl) {
            return alertNotify(
                "Ошибка",
                "Изображение обязательно должно быть заполнено",
                "warn",
            );
        }

        if (!title) {
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

        createAlbum(
            {
                image,
                title,
                description: descriptionContent || "",
                isPublished,
                photoIds: selectedIds,
            },
            () => router.back(),
        );
    };

    return (
        <div className={styles.addPhotoWrapper}>
            <BackLink text="Все альбомы" link="/profile/photos/albums" />

            <div className={styles.addPhotoTabs}>
                <button
                    className={cn(styles.addPhotoTab, {
                        [styles.active]: tab === "content",
                    })}
                    onClick={() => setTab("content")}
                >
                    Контент
                </button>

                <button
                    className={cn(styles.addPhotoTab, {
                        [styles.active]: tab === "photos",
                    })}
                    onClick={() => setTab("photos")}
                >
                    Фотографии
                </button>
            </div>

            {tab === "content" && (
                <div className={styles.addPhoto}>
                    <div className={styles.addPhotoContent}>
                        <div className={styles.addPhotoBlock}>
                            <p className={styles.addPhotoBlockTitle}>
                                Фотография
                            </p>

                            <File id="album_add" onChange={uploadImage} />

                            <label
                                htmlFor="album_add"
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
                                value={title}
                                setValue={setTitle}
                            />

                            <Editor
                                id="photo_description"
                                editorRef={descriptionRef}
                                title="Описание"
                                placeholder="Введите описание (+0,001 к рейтингу)"
                            />
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
                                    Скрыть альбом
                                </>
                            ) : (
                                <>
                                    <Unlock />
                                    Опубликовать альбом
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {tab === "photos" && (
                <div className={styles.albumPhotoContent}>
                    <ProfileActionsBlock
                        count={total}
                        elems={photos || []}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        checkboxId="photos_checkbox"
                    >
                        {photosIsLoading ? (
                            <Preloader page small />
                        ) : photosIsError ? (
                            <NotContent
                                text="Произошла ошибка при загрузке данных"
                                danger
                            />
                        ) : !!photos?.length ? (
                            <div className={styles.albumPhotoItems}>
                                {photos.map((data) => (
                                    <PhotoItem
                                        key={data.id}
                                        data={data}
                                        mode="edit"
                                        checkboxValue={selectedIds.includes(
                                            data.id,
                                        )}
                                        clickOnPhoto={() =>
                                            selectPhoto(data.id)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotContent text="В альбоме еще не добавлены фото" />
                        )}
                    </ProfileActionsBlock>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages || 0}
                        isLoading={photosIsLoading}
                    />
                </div>
            )}

            <div className={styles.addPhotoButtons}>
                <Button color="grey" auto onClick={() => router.back()}>
                    Отменить
                </Button>

                <Button auto onClick={createAlbumHandler}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default ProfileAlbumAdd;
