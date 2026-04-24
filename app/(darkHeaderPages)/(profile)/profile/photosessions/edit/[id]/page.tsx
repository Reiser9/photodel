"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";

import styles from "../../add/index.module.scss";

import type { TempTeamItem } from "../../add/page";
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
import {
    convertHtmlToEditorBlocks,
    getHtmlInEditor,
} from "@/shared/utils/getHtmlInEditor";
import { BackLink } from "@/shared/ui/BackLink";
import { ConfirmModal } from "@/shared/ui/Modal";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { usePhotosessions } from "@/features/photosessions";
import { DatePicker } from "@/shared/ui/DatePicker";
import { Pro } from "@/shared/ui/Pro";
import { useTeam } from "@/features/team";

const EditPhotosessionPage = () => {
    const { id } = useParams();
    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const [photoIds, setPhotoIds] = React.useState<PhotoShort[]>([]);
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [camera, setCamera] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [conditions, setConditions] = React.useState<string | null>(null);

    const [date, setDate] = React.useState<Dayjs | Dayjs[] | null>(null);
    const [category, setCategory] = React.useState<number | null>(null);

    const [teamAdded, setTeamAdded] = React.useState<TempTeamItem | null>(null);
    const [team, setTeam] = React.useState<TempTeamItem[]>([]);

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);
    const [descriptionEditorIsReady, setDescriptionEditorIsReady] =
        React.useState(false);

    const router = useRouter();

    const { getSpecializations } = useUserInfo();
    const { uploadFile } = useFile();
    const { deletePhotosession, updatePhotosession, getPhotosessionById } =
        usePhotosessions();
    const { alertNotify } = useAlert();

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getSpecializations(),
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ["photosessionById", String(id)],
        queryFn: () => getPhotosessionById(String(id)),
    });

    const { getTeam } = useTeam();

    const {
        data: teamData,
        isLoading: teamDataIsLoading,
        isError: teamDataIsError,
    } = useQuery({
        queryKey: ["team"],
        queryFn: () => getTeam({ status: "accepted" }),
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

    const updatePlaceHandler = async () => {
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

        updatePhotosession(
            String(id),
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
                location,
                isPublished,
                photos,
                specialization,
                startDate,
            } = data || {};

            setName(name);
            setPhotoIds(photos);

            setCamera(camera);
            setConditions(conditions);
            setPrice(price);

            setDate(dayjs(startDate));
            setCategory(specialization?.id);
            setAddress(location?.address || "");
            setCoords(
                location ? [location?.latitude, location?.longitude] : null,
            );

            setIsPublished(isPublished);
        }
    }, [data]);

    React.useEffect(() => {
        if (teamAdded) {
            setTeam((prev) => [...prev, teamAdded]);
            setTeamAdded(null);
        }
    }, [teamAdded]);

    if (isLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Ошибка при загрузке данных" danger />;
    }

    return (
        <>
            <div className={styles.addPhotoWrapper}>
                <BackLink text="Все фотосессии" link="/profile/photosessions" />

                <div className={styles.addPhoto}>
                    <div className={styles.addPhotoContent}>
                        <div className={styles.addPhotoBlock}>
                            <p className={styles.addPhotoBlockTitle}>
                                Фотографии
                            </p>

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
                                Данные о фотосесии
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
                                                                {label}{" "}
                                                                {lastName}
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
                                            <div
                                                className={
                                                    styles.teamOptionImage
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
                            <Button
                                color="grey"
                                auto
                                onClick={() => router.back()}
                            >
                                Отменить
                            </Button>

                            <Button auto onClick={updatePlaceHandler}>
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
                                    Скрыть
                                </>
                            ) : (
                                <>
                                    <Unlock />
                                    Опубликовать
                                </>
                            )}
                        </button>

                        <button
                            className={styles.addPhotoButton}
                            onClick={() => setConfirmDeleteModal(true)}
                        >
                            <Remove />
                            Удалить место
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите безвозвратно удалить фотосессию ${name}?`}
                callback={() =>
                    deletePhotosession(String(id), () => router.back())
                }
            />
        </>
    );
};

export default EditPhotosessionPage;
