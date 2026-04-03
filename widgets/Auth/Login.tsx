"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import styles from "./index.module.scss";

import type { LoginData } from "@/entities/user";
import { Button } from "@/shared/ui/Button";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { useAuth } from "@/features/user";

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    recoveryCallback?: () => void;
    registerCallback?: () => void;
};

const Login: React.FC<Props> = ({
    value,
    setValue,
    recoveryCallback,
    registerCallback,
}) => {
    const { authIsLoading, login } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginData>();

    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        login(data, () => {
            setValue(false);
            queryClient.invalidateQueries({ queryKey: ["shortInfo"] });
        });
    };

    return (
        <Modal value={value} setValue={setValue} title="Вход" size="small">
            <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                <Input
                    title="E-mail"
                    full
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Обязательное поле",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Введите корректный e-mail адрес",
                        },
                    })}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    value={watch("email", "")}
                />

                <Input
                    title="Пароль"
                    full
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Обязательное поле",
                        },
                        minLength: {
                            value: 8,
                            message: "Пароль не может быть меньше 8 символов",
                        },
                    })}
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                    value={watch("password", "")}
                />

                {/* <Checkbox id="auth_remember" label="Запомнить меня" /> */}

                <Button loading={authIsLoading}>Войти</Button>

                <div className={styles.authLinks}>
                    <span
                        className={styles.authLink}
                        onClick={recoveryCallback}
                    >
                        Напомнить пароль
                    </span>
                    <span
                        className={styles.authLink}
                        onClick={registerCallback}
                    >
                        Зарегистрироваться
                    </span>
                </div>
            </form>
        </Modal>
    );
};

export default Login;
