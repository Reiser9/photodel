"use client";

import React from "react";

import styles from "./index.module.scss";

import type { Social } from "@/entities/user";
import { Remove } from "@/shared/icons";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "@/features/user";
import { Preloader } from "@/shared/ui/Preloader";
import { NotContent } from "@/shared/ui/NotContent";
import useAlert from "@/shared/hooks/useAlert";

const AdminPage = () => {
    const [socials, setSocials] = React.useState<Social[]>([]);

    const [icon, setIcon] = React.useState("");
    const [name, setName] = React.useState("");

    const { getSocials, removeSocialById, createSocial } = useUserInfo();
    const { alertNotify } = useAlert();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["socials"],
        queryFn: getSocials,
    });

    const invalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ["socials"] });
    };

    const addSocial = () => {
        if (!icon || icon[0] !== "<") {
            return alertNotify(
                "Внимание",
                "Поле иконки обязательно должно быть заполнено",
                "warn",
            );
        }

        if (!name) {
            return alertNotify(
                "Внимание",
                "Поле названия обязательно должно быть заполнено",
                "warn",
            );
        }

        createSocial(name, icon, icon, () => {
            invalidateRequest();
            setName("");
            setIcon("");
        });
    };

    React.useEffect(() => {
        if (data) {
            setSocials(data);
        }
    }, [data]);

    return (
        <div className={styles.adminPanel}>
            <div className={styles.contactBlock}>
                <div className={styles.contactSocials}>
                    <p className={styles.contactSocialsTitle}>
                        Социальные сети ({socials.length})
                    </p>

                    {isLoading ? (
                        <Preloader page small />
                    ) : isError ? (
                        <NotContent
                            text="Произошла ошибка при загрузке данных"
                            danger
                        />
                    ) : (
                        <>
                            {socials.map((data) => (
                                <div
                                    key={data.id}
                                    className={styles.contactSocialItem}
                                >
                                    <Input
                                        component="textarea"
                                        placeholder="Иконка svg"
                                        value={data.siteIcon || ""}
                                        disabled
                                        full
                                    />

                                    <Input
                                        full
                                        value={data.name || ""}
                                        placeholder="Название"
                                        disabled
                                    />

                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => {
                                            removeSocialById(
                                                data.id,
                                                invalidateRequest,
                                            );
                                        }}
                                    >
                                        <Remove />
                                    </button>
                                </div>
                            ))}

                            <div className={styles.contactSocialItem}>
                                <Input
                                    component="textarea"
                                    placeholder="Иконка svg"
                                    value={icon}
                                    setValue={setIcon}
                                    full
                                />

                                <Input
                                    full
                                    value={name}
                                    placeholder="Название"
                                    setValue={setName}
                                />
                            </div>

                            <Button small auto onClick={addSocial}>
                                Добавить соц. сеть
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
