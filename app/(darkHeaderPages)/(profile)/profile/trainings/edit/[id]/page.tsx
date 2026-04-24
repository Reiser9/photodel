"use client";

import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";

import styles from "../../add/index.module.scss";

import type { PhotoShort } from "@/entities/photos/photo";
import { Button } from "@/shared/ui/Button";
import { CirclePlus, Lock, Remove, Unlock } from "@/shared/icons";
import { Input } from "@/shared/ui/Input";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { GetLocation } from "@/shared/ui/GetLocation";
import { Select } from "@/shared/ui/Select";
import { File } from "@/shared/ui/File";
import { useFile } from "@/features/file";
import useAlert from "@/shared/hooks/useAlert";
import {
    convertHtmlToEditorBlocks,
    getHtmlInEditor,
} from "@/shared/utils/getHtmlInEditor";
import { BackLink } from "@/shared/ui/BackLink";
import { useTeam } from "@/features/team";
import { useTrainings } from "@/features/trainings";
import { RangePickerProps } from "antd/es/date-picker";
import { TempTeamItem } from "@/entities/team";
import { TeamLineItem, TeamOption } from "@/entities/team/ui";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import { ConfirmModal } from "@/shared/ui/Modal";

const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
};

const EditTrainingPage = () => {
    const { id } = useParams();
    const [confirmDeleteModal, setConfirmDeleteModal] = React.useState(false);

    const [photoIds, setPhotoIds] = React.useState<PhotoShort[]>([]);
    const [name, setName] = React.useState("");

    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const [format, setFormat] = React.useState("");
    const [type, setType] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [prepayment, setPrepayment] = React.useState("");
    const [peoplesCount, setPeoplesCount] = React.useState("");

    const [teamAdded, setTeamAdded] = React.useState<TempTeamItem | null>(null);
    const [team, setTeam] = React.useState<TempTeamItem[]>([]);
    const [orgAdded, setOrgAdded] = React.useState<TempTeamItem | null>(null);
    const [orgs, setOrgs] = React.useState<TempTeamItem[]>([]);

    const [isPublished, setIsPublished] = React.useState(false);

    const descriptionRef = React.useRef<EditorCore | null>(null);
    const [descriptionEditorIsReady, setDescriptionEditorIsReady] =
        React.useState(false);

    const router = useRouter();

    const { uploadFile } = useFile();
    const { updateTraining, getTrainingById, deleteTraining } = useTrainings();
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
        data: trainingById,
        isLoading: trainingByIdIsLoading,
        isError: trainingByIdIsError,
    } = useQuery({
        queryKey: ["trainingById", id],
        queryFn: () => getTrainingById(String(id)),
    });

    const removePhoto = (id: number) => {
        setPhotoIds((prev) => prev.filter((data) => data.id !== id));
    };

    const removeTeamHandler = (id: number) => {
        setTeam((prev) => prev.filter((elem) => elem.value !== id));
    };

    const removeOrgHandler = (id: number) => {
        setOrgs((prev) => prev.filter((elem) => elem.value !== id));
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

    const updateTrainingHandler = async () => {
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

        updateTraining(
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
                startDate: startDate,
                endDate: endDate,
                team: team.map((elem) => elem.value),
                organizers: orgs.map((elem) => elem.value),
                format,
                maxParticipants: +peoplesCount,
                price,
                type,
                prepayment,
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

    React.useEffect(() => {
        if (orgAdded) {
            setOrgs((prev) => [...prev, orgAdded]);
            setOrgAdded(null);
        }
    }, [orgAdded]);

    React.useEffect(() => {
        if (
            trainingById &&
            descriptionEditorIsReady &&
            descriptionRef.current
        ) {
            const { description } = trainingById;

            descriptionRef.current?.render({
                blocks: convertHtmlToEditorBlocks(description),
            });
        }
    }, [trainingById, descriptionEditorIsReady]);

    React.useEffect(() => {
        if (trainingById) {
            const {
                name,
                format,
                prepayment,
                photos,
                startDate,
                endDate,
                price,
                maxParticipants,
                isPublished,
                type,
                location,
                organizers,
                team,
            } = trainingById || {};

            setName(name);
            setFormat(format);
            setPrepayment(prepayment);
            setPrice(price);
            setStartDate(startDate);
            setEndDate(endDate);
            setPeoplesCount(`${maxParticipants}`);
            setPhotoIds(photos);
            setIsPublished(isPublished);
            setType(type);
            setAddress(location?.address || "");
            setCoords(
                location ? [location?.latitude, location?.longitude] : null,
            );
            setOrgs(
                organizers.map((data) => ({
                    value: data.id,
                    lastName: data.lastName,
                    isPro: data.isPro,
                    label: data.firstName,
                    image: data.avatarUrl,
                    category: "",
                })),
            );
            setTeam(
                team.map((data) => {
                    const { avatarUrl, firstName, id, isPro, lastName } =
                        data || {};
                    return {
                        value: id,
                        label: firstName,
                        lastName,
                        isPro,
                        image: avatarUrl,
                        category: "",
                    };
                }),
            );
        }
    }, [trainingById]);

    if (trainingByIdIsLoading) {
        return <Preloader page />;
    }

    if (trainingByIdIsError) {
        return (
            <NotContent danger text="Произошла ошибка при загрузке данных" />
        );
    }

    return (
        <>
            <div className={styles.addPhotoWrapper}>
                <BackLink text="Все обучения" link="/profile/trainings" />

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
                                Данные о мероприятии
                            </p>

                            <Select
                                value={type}
                                setValue={setType}
                                title="Тип мероприятия"
                                placeholder="Выберите тип мероприятия"
                                full
                                options={[
                                    {
                                        label: "Мастер-класс",
                                        value: "Мастер-класс",
                                    },
                                ]}
                            />

                            <Select
                                value={format}
                                setValue={setFormat}
                                title="Локация"
                                placeholder="Выберите локацию"
                                full
                                options={[
                                    {
                                        label: "Оффлайн",
                                        value: "Оффлайн",
                                    },
                                    {
                                        label: "Онлайн",
                                        value: "Онлайн",
                                    },
                                ]}
                            />

                            <div className={styles.trainingDates}>
                                <p className={styles.trainingDatesTitle}>
                                    Дата проведения
                                </p>

                                <RangePicker
                                    className={styles.trainingDatesRange}
                                    value={[
                                        startDate ? dayjs(startDate) : null,
                                        endDate ? dayjs(endDate) : null,
                                    ]}
                                    onChange={(dates) => {
                                        if (!dates || !dates[0] || !dates[1]) {
                                            setStartDate("");
                                            setEndDate("");
                                            return;
                                        }

                                        setStartDate(
                                            dates[0].format("YYYY-MM-DD"),
                                        );
                                        setEndDate(
                                            dates[1].format("YYYY-MM-DD"),
                                        );
                                    }}
                                    format="DD.MM.YYYY"
                                    disabledDate={disabledDate}
                                />
                            </div>

                            <Input
                                placeholder="Введите стоимость"
                                full
                                title="Стоимость"
                                value={price}
                                setValue={setPrice}
                            />

                            <Input
                                placeholder="Введите предоплату"
                                full
                                title="Предоплата"
                                value={prepayment}
                                setValue={setPrepayment}
                            />

                            <Input
                                placeholder="Введите количество участников"
                                type="number"
                                inputMode="decimal"
                                full
                                title="Количество участников"
                                value={peoplesCount}
                                setValue={setPeoplesCount}
                            />
                        </div>

                        <div className={styles.addPhotoBlock}>
                            <p className={styles.addPhotoBlockTitle}>
                                Организаторы
                            </p>

                            {!!orgs.length && (
                                <div className={styles.teamBlockItems}>
                                    {orgs.map((data) => (
                                        <TeamLineItem
                                            key={data.value}
                                            data={data}
                                            callback={() =>
                                                removeOrgHandler(data.value)
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            <Select
                                placeholder="Добавить организатора"
                                full
                                value={orgAdded}
                                onChange={(_, option) => {
                                    setOrgAdded(option as TempTeamItem);
                                }}
                                loading={teamDataIsLoading}
                                error={teamDataIsError}
                                options={
                                    !!teamData
                                        ? teamData
                                              ?.filter((elem) => {
                                                  const orgsIds = orgs.map(
                                                      (elem) => elem.value,
                                                  );
                                                  return !orgsIds.includes(
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
                                optionRender={({ data }) => (
                                    <TeamOption data={data as TempTeamItem} />
                                )}
                            />
                        </div>

                        <div className={styles.addPhotoBlock}>
                            <p className={styles.addPhotoBlockTitle}>Команда</p>

                            {!!team.length && (
                                <div className={styles.teamBlockItems}>
                                    {team.map((data) => (
                                        <TeamLineItem
                                            key={data.value}
                                            data={data}
                                            callback={() =>
                                                removeTeamHandler(data.value)
                                            }
                                        />
                                    ))}
                                </div>
                            )}

                            <Select
                                placeholder="Добавить в команду"
                                full
                                value={teamAdded}
                                onChange={(_, option) => {
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
                                optionRender={({ data }) => (
                                    <TeamOption data={data as TempTeamItem} />
                                )}
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

                            <Button auto onClick={updateTrainingHandler}>
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
                            Удалить обучение
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmDeleteModal}
                setValue={setConfirmDeleteModal}
                title={`Вы действительно хотите безвозвратно удалить обучение ${name}?`}
                callback={() => deleteTraining(String(id), () => router.back())}
            />
        </>
    );
};

export default EditTrainingPage;
