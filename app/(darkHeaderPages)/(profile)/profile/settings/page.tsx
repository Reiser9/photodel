"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./index.module.scss";

import type { ChangePasswordData } from "@/entities/user";
import { Tabs } from "@/shared/ui/Tabs";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/features/user";

const SettingsPage = () => {
    const [passwordAgain, setPasswordAgain] = React.useState("");
    const [passwordAgainError, setPasswordAgainError] = React.useState("");

    const { authIsLoading, changePassword } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<ChangePasswordData>();

    const onSubmit: SubmitHandler<ChangePasswordData> = (data) => {
        const { newPassword } = data || {};

        if (newPassword !== passwordAgain) {
            return setPasswordAgainError("Пароли должны совпадать");
        }

        setPasswordAgainError("");

        changePassword(data, () => {
            reset();
            setPasswordAgain("");
        });
    };

    return (
        <>
            <div className={styles.profileSettingsChange}>
                <Tabs tabs={[{ name: "Сменить пароль" }]} />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.profileSettingsChangeContent}
                >
                    <div className={styles.profileSettingsChangeItem}>
                        <Input
                            placeholder="Старый пароль"
                            full
                            type="password"
                            {...register("oldPassword", {
                                required: {
                                    value: true,
                                    message: "Обязательное поле",
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                        "Пароль не может быть меньше 8 символов",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Максимальная длина пароля 32 символа",
                                },
                            })}
                            error={!!errors.oldPassword}
                            errorMessage={errors.oldPassword?.message}
                            value={watch("oldPassword", "")}
                        />
                    </div>

                    <div className={styles.profileSettingsChangeItem}>
                        <Input
                            placeholder="Новый пароль"
                            full
                            type="password"
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "Обязательное поле",
                                },
                                minLength: {
                                    value: 8,
                                    message:
                                        "Пароль не может быть меньше 8 символов",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Максимальная длина пароля 32 символа",
                                },
                            })}
                            error={!!errors.newPassword}
                            errorMessage={errors.newPassword?.message}
                            value={watch("newPassword", "")}
                        />
                    </div>

                    <div className={styles.profileSettingsChangeItem}>
                        <Input
                            placeholder="Повторите новый пароль"
                            value={passwordAgain}
                            setValue={setPasswordAgain}
                            full
                            type="password"
                            error={!!passwordAgainError}
                            errorMessage={passwordAgainError}
                        />
                    </div>

                    <div className={styles.profileSettingsChangeItem}>
                        <Button disabled={authIsLoading}>
                            Изменить пароль
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SettingsPage;
