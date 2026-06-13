"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "../../add/index.module.scss";

import useAlert from "@/shared/hooks/useAlert";
import { BackLink } from "@/shared/ui/BackLink";
import { File } from "@/shared/ui/File";
import { CirclePlus, Lock, Remove, Unlock } from "@/shared/icons";
import { useFile } from "@/features/file";
import { Input } from "@/shared/ui/Input";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { Button } from "@/shared/ui/Button";
import {
    convertHtmlToEditorBlocks,
    getHtmlInEditor,
} from "@/shared/utils/getHtmlInEditor";
import { useAlbums, usePhotos } from "@/features/photos";
import { ConfirmModal, Modal } from "@/shared/ui/Modal";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { PhotoItem } from "@/entities/photos/photo/ui";
import { ProfileActionsBlock } from "@/shared/ui/PhotosBlock";
import { Pagination } from "@/shared/ui/Pagination";

const ProfileAlbumEdit = () => {
    const { id } = useParams();
    const [page, setPage] = React.useState(1);
    const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
    const [action, setAction] = React.useState<string | null>(null);

    const [pageAdd, setPageAdd] = React.useState(1);
    const [selectedAddIds, setSelectedAddIds] = React.useState<number[]>([]);

    const [tab, setTab] = React.useState<"content" | "photos">("content");
    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);
    const [confirmDeletePhotosModal, setConfirmDeletePhotosModal] =
        React.useState(false);

    const [image, setImage] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [title, setTitle] = React.useState("");

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);
    const [descriptionEditorIsReady, setDescriptionEditorIsReady] =
        React.useState(false);

    const [photosAddModal, setPhotosAddModal] = React.useState(false);

    const { uploadFile } = useFile();
    const { alertNotify } = useAlert();
    const {
        updateAlbum,
        getAlbumById,
        deleteAlbum,
        deletePhotosInAlbum,
        addPhotosToAlbum,
    } = useAlbums();
    const { getPhotos } = usePhotos();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["albumById", String(id)],
        queryFn: () => getAlbumById(String(id)),
        enabled: !!id,
    });

    const {
        data: photosData,
        isLoading: photosIsLoading,
        isError: photosIsError,
    } = useQuery({
        queryKey: ["photos", page, String(id)],
        queryFn: () =>
            getPhotos({
                page,
                album_id: String(id),
                my: true,
            }),
        enabled: !!id,
    });

    const {
        data: myPhotosData,
        isLoading: myPhotosIsLoading,
        isError: myPhotosIsError,
    } = useQuery({
        queryKey: ["photos", page, 6],
        queryFn: () =>
            getPhotos({
                page,
                limit: 6,
                excluded_album_id: String(id),
                my: true,
            }),
        enabled: !!photosAddModal,
    });

    const { totalPages, data: photos, total } = photosData || {};
    const {
        totalPages: myPhotoTotalPages,
        data: myPhotos,
        total: myPhotosTotal,
    } = myPhotosData || {};

    const selectPhoto = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedIds((prev) => [...prev, id]);
        }
    };

    const selectAddPhoto = (id: number) => {
        if (selectedAddIds.includes(id)) {
            setSelectedAddIds((prev) => prev.filter((item) => item != id));
        } else {
            setSelectedAddIds((prev) => [...prev, id]);
        }
    };

    const deletePhotos = () => {
        deletePhotosInAlbum(
            String(id),
            {
                ids: selectedIds,
            },
            () => {
                setAction(null);
                setSelectedIds([]);
                queryClient.invalidateQueries({
                    queryKey: ["photos"],
                });
                alertNotify("Успешно", "Фотографии удалены из альбома");
            },
        );
    };

    const addPhotos = () => {
        addPhotosToAlbum(String(id), { ids: selectedAddIds }, () => {
            setSelectedAddIds([]);
            queryClient.invalidateQueries({
                queryKey: ["photos"],
            });
            alertNotify("Успешно", "Фотографии добавлены");
            setPhotosAddModal(false);
        });
    };

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

    const updateAlbumHandler = async () => {
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

        updateAlbum(
            String(id),
            {
                image,
                title,
                description: descriptionContent || "",
                isPublished,
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
            const { title, isPublished, imageKey, imageUrl } = data || {};

            setTitle(title);
            setIsPublished(isPublished);
            setImage(imageKey);
            setImageUrl(imageUrl);
        }
    }, [data]);

    React.useEffect(() => {
        if (action) {
            if (!selectedIds.length) {
                alert(
                    "Для применения действия требуется выбрать хотя бы 1 элемент",
                );
                return setAction(null);
            }

            if (action === "delete") {
                setConfirmDeletePhotosModal(true);
            }
        }
    }, [action]);

    return (
        <>
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

                {isLoading ? (
                    <Preloader page small />
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке данных" danger />
                ) : (
                    <div
                        className={cn(styles.addPhoto, {
                            [styles.hide]: tab !== "content",
                        })}
                    >
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
                                    onReady={() =>
                                        setDescriptionEditorIsReady(true)
                                    }
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

                            <button
                                className={styles.addPhotoButton}
                                onClick={() => setConfirmDeleteModal(true)}
                            >
                                <Remove />
                                Удалить фото
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
                            action={action}
                            setAction={setAction}
                            checkboxId="photos_checkbox"
                            buttonContent={
                                <button
                                    className={styles.albumPhotoAdd}
                                    onClick={() => setPhotosAddModal(true)}
                                >
                                    <CirclePlus />
                                    Добавить фото
                                </button>
                            }
                            actionOptions={[
                                {
                                    label: "Удалить из альбома",
                                    value: "delete",
                                },
                            ]}
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

                    <Button auto onClick={updateAlbumHandler}>
                        Сохранить
                    </Button>
                </div>
            </div>

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите безвозвратно удалить альбом ${title}?`}
                callback={() => deleteAlbum(String(id), () => router.back())}
            />

            <ConfirmModal
                value={confirmDeletePhotosModal}
                setValue={setConfirmDeletePhotosModal}
                title="Вы действительно хотите удалить изображения из альбома?"
                callback={deletePhotos}
                rejectCallback={() => setAction(null)}
            />

            <Modal
                title="Добавить фото в альбом"
                value={photosAddModal}
                setValue={setPhotosAddModal}
                size="big"
            >
                <div className={styles.albumPhotoAddContent}>
                    <ProfileActionsBlock
                        count={myPhotosTotal}
                        elems={myPhotos || []}
                        selectedIds={selectedAddIds}
                        setSelectedIds={setSelectedAddIds}
                        checkboxId="photos_add_checkbox"
                    >
                        {myPhotosIsLoading ? (
                            <Preloader page small />
                        ) : myPhotosIsError ? (
                            <NotContent
                                text="Произошла ошибка при загрузке данных"
                                danger
                            />
                        ) : !!myPhotos?.length ? (
                            <div className={styles.albumPhotoItems}>
                                {myPhotos.map((data) => (
                                    <PhotoItem
                                        key={data.id}
                                        data={data}
                                        mode="edit"
                                        checkboxValue={selectedAddIds.includes(
                                            data.id,
                                        )}
                                        clickOnPhoto={() =>
                                            selectAddPhoto(data.id)
                                        }
                                    />
                                ))}
                            </div>
                        ) : photos?.length ? (
                            <NotContent text="Все ваши фотографии уже добавлены в альбом" />
                        ) : (
                            <NotContent text="Вы не загрузили еще ни одного фото" />
                        )}
                    </ProfileActionsBlock>

                    <Pagination
                        page={pageAdd}
                        setPage={setPageAdd}
                        totalPages={myPhotoTotalPages || 0}
                        isLoading={myPhotosIsLoading}
                    />
                </div>

                <Button
                    auto
                    wrapperClass={styles.photosAddModalButton}
                    onClick={addPhotos}
                    disabled={!selectedAddIds?.length}
                >
                    Добавить
                </Button>
            </Modal>
        </>
    );
};

export default ProfileAlbumEdit;
