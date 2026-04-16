"use client";

import React from "react";
import Image from "next/image";
import cn from "classnames";
import { Rate } from "antd";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import { useReviews } from "@/features/reviews";
import { CirclePlus, Remove } from "@/shared/icons";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";
import { Checkbox } from "@/shared/ui/Checkbox";
import { ReviewItem } from "@/entities/review/ui";
import UserTopInfo from "@/app/(darkHeaderPages)/ui/UserTopInfo";
import { Tabs } from "@/shared/ui/Tabs";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { Pagination } from "@/shared/ui/Pagination";
import { Button } from "@/shared/ui/Button";
import { ConfirmModal, Modal } from "@/shared/ui/Modal";
import { useUserInfo } from "@/features/user";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { getHtmlInEditor } from "@/shared/utils/getHtmlInEditor";
import useAlert from "@/shared/hooks/useAlert";
import { File } from "@/shared/ui/File";
import { useFile } from "@/features/file";
import type { PhotoShort } from "@/entities/photos/photo";

const UserReviewsPage = () => {
    const { id } = useParams();
    const [page, setPage] = React.useState(1);

    const [createReviewModal, setCreateReviewModal] = React.useState(false);
    const [thanksModal, setThanksModal] = React.useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);
    const [entityDeleteId, setEntityIdDelete] = React.useState(0);
    const [photoIds, setPhotoIds] = React.useState<PhotoShort[]>([]);

    const [rate, setRate] = React.useState<number>();
    const reviewEditorRef = React.useRef<EditorCore | null>(null);

    const queryClient = useQueryClient();

    const revalidateQueries = () => {
        queryClient.invalidateQueries({ queryKey: ["usersReviewsById", id] });
    };

    const { getReviews, createReview, deleteReview } = useReviews();
    const { alertNotify } = useAlert();

    const { getUserProfileById, getShortInfo } = useUserInfo();
    const { uploadFile } = useFile();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["usersReviewsById", id],
        queryFn: () => getReviews({ type: "user", entity_id: +(id || 0) }),
        enabled: !!id,
    });

    const { data: userShortInfo } = useQuery({
        queryKey: ["userProfileInfo", id],
        queryFn: () => getUserProfileById(String(id)),
        gcTime: 0,
        refetchOnMount: true,
        enabled: !!id,
    });

    const { data: myData } = useQuery({
        queryKey: ["shortInfo"],
        queryFn: () => getShortInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { data: reviews, total, totalPages } = data || {};
    const {
        avatar,
        firstName,
        lastName,
        isPro,
        id: userId,
    } = userShortInfo || {};
    const { id: myId } = myData || {};

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

    const createReviewHandler = async () => {
        if (!rate) {
            return alertNotify(
                "Ошибка",
                "Оценка обязательна к заполнению",
                "warn",
            );
        }

        let reviewContent;
        if (reviewEditorRef.current) {
            const reviewData = await reviewEditorRef.current.save();

            if (reviewData) {
                reviewContent = getHtmlInEditor(reviewData.blocks);
            }
        }

        if (!reviewContent) {
            return alertNotify("Ошибка", "Введите текст отзыва", "warn");
        }

        createReview(
            {
                rating: rate,
                content: reviewContent,
                entityId: +(id || 0),
                entityType: "user",
                photoIds: photoIds.map((data) => data.id),
            },
            () => {
                setCreateReviewModal(false);
                setThanksModal(true);
                revalidateQueries();
            },
        );
    };

    return (
        <>
            <UserTopInfo />

            <Tabs tabs={[{ name: "Отзывы" }]} />

            <div className={styles.reviewsTitleInner}>
                <div className={styles.reviewsTop}>
                    <p className={styles.reviewsCount}>
                        Всего: <span>{total}</span>
                    </p>

                    {/* <Checkbox label="Только с фото" id="with_photo" auto /> */}
                </div>

                <Button auto onClick={() => setCreateReviewModal(true)}>
                    Оставить отзыв
                </Button>
            </div>

            {isLoading ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent
                    text="Произошла ошибка при загрузке данных"
                    danger
                />
            ) : !!reviews?.length ? (
                <div className={styles.reviewsItems}>
                    {reviews.map((data) => (
                        <ReviewItem
                            key={data.id}
                            data={data}
                            actions={
                                <>
                                    {data.user.id === myId && (
                                        <div
                                            className={
                                                styles.reviewsItemButtons
                                            }
                                        >
                                            <button
                                                className={cn(
                                                    styles.reviewsItemButton,
                                                    styles.danger,
                                                )}
                                                onClick={() => {
                                                    setConfirmDeleteModal(true);
                                                    setEntityIdDelete(data.id);
                                                }}
                                            >
                                                <Remove />
                                                Удалить
                                            </button>
                                        </div>
                                    )}
                                </>
                            }
                        />
                    ))}
                </div>
            ) : (
                <NotContent text="У пользователя еще нет отзывов" />
            )}

            <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages || 0}
                isLoading={isLoading}
            />

            <Modal
                value={createReviewModal}
                setValue={setCreateReviewModal}
                title="Оставить отзыв"
            >
                <div className={styles.createReviewTop}>
                    <UserInfoBlock
                        image={avatar}
                        name={firstName || ""}
                        surname={lastName || ""}
                        isPro={isPro}
                        id={userId}
                    />

                    <Rate value={rate} onChange={(value) => setRate(value)} />
                </div>

                <div className={styles.reviewModal}>
                    <Editor
                        id="review_user_editor"
                        editorRef={reviewEditorRef}
                        title="Отзыв"
                    />

                    <div className={styles.reviewModalPhotos}>
                        {photoIds.map((data) => (
                            <div
                                key={data.id}
                                className={styles.reviewModalPhoto}
                            >
                                <Image src={data.url} alt="Изображение" fill />

                                <button
                                    className={styles.reviewAddPhotoItemRemove}
                                    onClick={() => removePhoto(data.id)}
                                >
                                    <Remove />
                                </button>
                            </div>
                        ))}

                        <div className={styles.reviewAddPhotoItemUpload}>
                            <File
                                id="reviews_add"
                                onChange={uploadImage}
                                multiple
                            />

                            <label
                                htmlFor="reviews_add"
                                className={styles.addReviewLabel}
                            >
                                <CirclePlus />
                                <span>Загрузить фотографию</span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.reviewModalButtons}>
                        <Button auto onClick={createReviewHandler}>
                            Отправить
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                value={thanksModal}
                setValue={setThanksModal}
                size="small"
                title="Спасибо!"
            >
                <div className={styles.thanksModal}>
                    <p className={styles.thanksModalText}>
                        Ваш отзыв отправлен и будет опубликован после проверки.
                    </p>

                    <Button onClick={() => setThanksModal(false)}>Ок</Button>
                </div>
            </Modal>

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title="Вы действительно хотите удалить отзыв?"
                callback={() => {
                    deleteReview(entityDeleteId, () => {
                        setEntityIdDelete(0);
                        setConfirmDeleteModal(false);
                        revalidateQueries();
                    });
                }}
            />
        </>
    );
};

export default UserReviewsPage;
