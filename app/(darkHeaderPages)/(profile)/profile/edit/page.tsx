"use client";

import React from "react";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

import { Edit2, Photo } from "@/shared/icons";
import { useUserInfo } from "@/features/user";
import { Button } from "@/shared/ui/Button";
import { Chapter } from "@/shared/ui/Chapter";
import { Editor } from "@/shared/ui/Editor";
import { EditorCore } from "@/shared/ui/Editor/Editor";
import { Select } from "@/shared/ui/Select";
import { Input } from "@/shared/ui/Input";
import {
    convertHtmlToEditorBlocks,
    getHtmlInEditor,
} from "@/shared/utils/getHtmlInEditor";
import { Preloader } from "@/shared/ui/Preloader";
import { SocialUser } from "@/entities/user";
import { File } from "@/shared/ui/File";
import { useFile } from "@/features/file";
import useAlert from "@/shared/hooks/useAlert";
import { GetLocation } from "@/shared/ui/GetLocation";

const ProfileEditPage = () => {
    // Профиль информация
    const [avatar, setAvatar] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [status, setStatus] = React.useState("");

    const [nameIsEdit, setNameIsEdit] = React.useState(false);

    // Общие данные
    const [category, setCategory] = React.useState<number | null>(null);
    const [specialization, setSpecialization] = React.useState<number | null>(
        null,
    );
    const [geography, setGeography] = React.useState<string[]>([]);
    const [price, setPrice] = React.useState("");
    const [conditions, setConditions] = React.useState("");
    const [equipment, setEquipment] = React.useState("");
    const [languages, setLanguages] = React.useState<string[]>([]);

    // Контакты
    const [socialBlocks, setSocialBlocks] = React.useState<SocialUser[]>([]);

    // Геолокация
    const [address, setAddress] = React.useState("");
    const [coords, setCoords] = React.useState<[number, number] | null>(null);

    const aboutRef = React.useRef<EditorCore | null>(null);
    const [aboutEditorIsReady, setAboutEditorIsReady] = React.useState(false);

    const {
        getCategories,
        getSpecializations,
        getSocials,
        updateProfile,
        getProfileInfo,
        updateUserAvatar,
        updateUserName,
    } = useUserInfo();
    const { uploadFile } = useFile();
    const { alertNotify } = useAlert();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data, isLoading: profileIsLoading } = useQuery({
        queryKey: ["profileInfo"],
        queryFn: () => getProfileInfo(),
        gcTime: 0,
        refetchOnMount: true,
    });

    const { isPro } = data || {};

    const {
        data: categories,
        isFetching: categoriesIsFetching,
        isError: categoriesIsError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });

    const {
        data: specializations,
        isFetching: specializationsIsFetching,
        isError: specializationsIsError,
    } = useQuery({
        queryKey: ["specializations", category],
        queryFn: () => getSpecializations([category || 0]),
        enabled: !!category,
    });

    const { data: socials } = useQuery({
        queryKey: ["socials"],
        queryFn: () => getSocials(),
    });

    const revalidatePreofileInfo = () => {
        queryClient.invalidateQueries({ queryKey: ["profileInfo"] });
        queryClient.invalidateQueries({ queryKey: ["shortInfo"] });
    };

    const saveProfileData = async () => {
        let aboutContent;
        if (aboutRef.current) {
            const aboutData = await aboutRef.current.save();

            if (aboutData) {
                aboutContent = getHtmlInEditor(aboutData.blocks);
            }
        }

        updateProfile(
            {
                conditions,
                equipment,
                geography,
                languages,
                price,
                about: aboutContent || "",
                proCategoryIds: category ? [category] : [],
                specializationIds: specialization ? [specialization] : [],
                status,
                socials: socialBlocks.filter((data) => !!data.value),
                temporaryLocations: [],
                location: coords && {
                    country: address,
                    latitude: coords[0],
                    longitude: coords[1],
                    city: "",
                    houseNumber: "",
                    street: "",
                },
            },
            () => router.back(),
        );
    };

    const changeUserAvatar = async (avatar: File) => {
        const formData = new FormData();
        formData.append("files", avatar);

        const files = await uploadFile(formData);

        if (!files || !files.length)
            return alertNotify(
                "Ошибка",
                "Изображение не загружено, попробуйте позже",
            );

        updateUserAvatar(files[0].key, revalidatePreofileInfo);
    };

    const changeUserName = () => {
        updateUserName(firstName, lastName, () => {
            setNameIsEdit(false);
            revalidatePreofileInfo();
        });
    };

    const changeSocial = (value: string, index: number) => {
        setSocialBlocks((prev) =>
            prev.map((item) => (item.id === index ? { ...item, value } : item)),
        );
    };

    React.useEffect(() => {
        if (data && aboutEditorIsReady && aboutRef.current) {
            const { about } = data;

            aboutRef.current?.render({
                blocks: convertHtmlToEditorBlocks(about),
            });
        }
    }, [data, aboutEditorIsReady]);

    React.useEffect(() => {
        if (data) {
            const {
                conditions,
                equipment,
                price,
                languages,
                proCategories,
                specializations,
                avatar,
                firstName,
                lastName,
                status,
                location
            } = data || {};

            setAvatar(avatar);
            setFirstName(firstName || "");
            setLastName(lastName || "");
            setStatus(status || "");

            setConditions(conditions || "");
            setEquipment(equipment || "");
            setPrice(price || "");
            setLanguages(languages || []);
            setCategory(!!proCategories.length ? proCategories[0].id : null);
            setSpecialization(
                !!specializations.length ? specializations[0].id : null,
            );
            setAddress(location.country);
            setCoords([location.latitude, location.longitude]);
        }
    }, [data]);

    React.useEffect(() => {
        if (!socials || !data) return;

        const userSocials = data?.socials || [];

        const socialsMap: Record<string | number, string> = userSocials.reduce(
            (acc, item) => {
                acc[item.id] = item.value;
                return acc;
            },
            {} as Record<string | number, string>,
        );

        const socialsFormated = socials.map((item) => ({
            ...item,
            value: socialsMap[item.id] ?? "",
        }));

        setSocialBlocks(socialsFormated);
    }, [socials, data]);

    if (profileIsLoading) {
        return <Preloader page />;
    }

    return (
        <div className={styles.profileEdit}>
            <div className={styles.profileEditInfo}>
                <div className={styles.profileEditImg}>
                    {avatar && (
                        <Image
                            src={avatar}
                            alt={`Аватар пользователя ${firstName} ${lastName}`}
                            fill
                        />
                    )}

                    <File id="profile_avatar" onChange={changeUserAvatar} />

                    <label
                        htmlFor="profile_avatar"
                        className={styles.profileEditImgLabel}
                    >
                        <Photo />
                    </label>
                </div>

                <div className={styles.profileEditInfoWrapper}>
                    <div className={styles.profileEditNameWrapper}>
                        {!nameIsEdit && (
                            <>
                                <p className={styles.profileEditName}>
                                    {lastName} {firstName}
                                    <span onClick={() => setNameIsEdit(true)}>
                                        <Edit2 />
                                    </span>
                                </p>

                                {!isPro && (
                                    <button
                                        className={styles.profileEditProBuy}
                                    >
                                        Купить PRO
                                    </button>
                                )}
                            </>
                        )}

                        {nameIsEdit && (
                            <div className={styles.profileEditNameForm}>
                                <Input
                                    value={firstName}
                                    setValue={setFirstName}
                                    placeholder="Введите имя"
                                    fieldRequired
                                    title="Имя"
                                />

                                <Input
                                    value={lastName}
                                    setValue={setLastName}
                                    placeholder="Введите фамилию"
                                    fieldRequired
                                    title="Фамилия"
                                />

                                <Button
                                    auto
                                    onClick={() => setNameIsEdit(false)}
                                    color="grey"
                                >
                                    Отмена
                                </Button>

                                <Button auto onClick={changeUserName}>
                                    Сохранить
                                </Button>
                            </div>
                        )}
                    </div>

                    <Input
                        value={status}
                        setValue={setStatus}
                        placeholder="Укажите статус"
                        title="Статус"
                        wrapperClass={styles.profileEditInfoStatus}
                    />
                </div>
            </div>

            <Chapter title="Общие данные">
                <div className={styles.profileEditData}>
                    {categories && (
                        <Select
                            title="Категория"
                            placeholder="Выберите категорию"
                            fieldRequired
                            wrapperClass={styles.profileEditDataItem}
                            options={categories?.map((data) => ({
                                label: data.name,
                                value: data.id,
                            }))}
                            error={categoriesIsError}
                            loading={categoriesIsFetching}
                            value={category}
                            setValue={setCategory}
                            allowClear
                            onChange={(value) => {
                                setSpecialization(null);
                                setCategory(value);
                            }}
                        />
                    )}

                    <Select
                        title="Специализация"
                        placeholder="Выберите специализацию"
                        fieldRequired
                        wrapperClass={styles.profileEditDataItem}
                        options={
                            specializations
                                ? specializations?.map((data) => ({
                                      label: data.name,
                                      value: data.id,
                                  }))
                                : []
                        }
                        error={specializationsIsError}
                        loading={specializationsIsFetching}
                        value={specialization}
                        setValue={setSpecialization}
                        allowClear
                    />

                    <Select
                        title="География съемок"
                        placeholder="Только для PRO"
                        wrapperClass={styles.profileEditDataItem}
                        disabled
                        value={geography}
                        setValue={setGeography}
                    />

                    <Input
                        title="Стоимость услуг"
                        placeholder="Введите стоимость услуг"
                        fieldRequired
                        wrapperClass={styles.profileEditDataItem}
                        value={price}
                        setValue={setPrice}
                    />

                    <Input
                        title="Условия работы"
                        placeholder="Введите условия работы"
                        wrapperClass={styles.profileEditDataItem}
                        value={conditions}
                        setValue={setConditions}
                    />

                    <Input
                        title="Фототехника"
                        placeholder="Введите фототехнику"
                        wrapperClass={styles.profileEditDataItem}
                        value={equipment}
                        setValue={setEquipment}
                    />

                    <Select
                        title="Владение языками"
                        placeholder="Выберите языки, которыми владеете"
                        wrapperClass={styles.profileEditDataItem}
                        options={[
                            {
                                label: "Русский",
                                value: "Русский",
                            },
                            {
                                label: "Английский",
                                value: "Английский",
                            },
                        ]}
                        mode="multiple"
                        maxTagCount="responsive"
                        value={languages}
                        setValue={setLanguages}
                    />
                </div>
            </Chapter>

            <Chapter title="Обо мне">
                <Editor
                    title="Введите информацию о Вас (+0,001 к рейтингу)"
                    editorRef={aboutRef}
                    id="aboutEditor"
                    onReady={() => setAboutEditorIsReady(true)}
                />
            </Chapter>

            <Chapter title="Контакты">
                <div className={styles.profileEditData}>
                    {socialBlocks.map((data) => (
                        <Input
                            key={data.id}
                            title={data.name}
                            placeholder={`Введите ${data.name}`}
                            wrapperClass={styles.profileEditDataItem}
                            value={data.value}
                            onInputChange={(value) =>
                                changeSocial(value, data.id)
                            }
                        />
                    ))}
                </div>
            </Chapter>

            <Chapter title="Геолокация">
                <GetLocation
                    address={address}
                    setAddress={setAddress}
                    coords={coords}
                    setCoords={setCoords}
                />
            </Chapter>

            <Chapter title="Временная геолокация">
                <div></div>
            </Chapter>

            <div className={styles.profileEditButtons}>
                <Button color="grey" auto onClick={() => router.back()}>
                    Отменить
                </Button>
                <Button auto onClick={() => saveProfileData()}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default ProfileEditPage;
