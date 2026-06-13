"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./index.module.scss";

import type { RegisterData } from "@/entities/user";
import { Modal } from "@/shared/ui/Modal";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/features/user";

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
};

const Register: React.FC<Props> = ({ value, setValue, loginCallback }) => {
    const [passwordAgain, setPasswordAgain] = React.useState("");
    const [passwordAgainError, setPasswordAgainError] = React.useState("");

    const [isAdult, setIsAdult] = React.useState(false);
    const [isProfessional, setIsProfessional] = React.useState(false);

    const { authIsLoading, register: registerRequest } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterData>();

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        const { password } = data;

        if (password !== passwordAgain) {
            return setPasswordAgainError("Пароли должны совпадать");
        }

        setPasswordAgainError("");

        registerRequest({ ...data, isAdult, isProfessional }, () =>
            setValue(false),
        );
    };

    return (
        <Modal
            value={value}
            setValue={setValue}
            title="Регистрация"
            size="small"
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                <Input
                    title="Имя"
                    full
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: "Обязательное поле",
                        },
                        minLength: {
                            value: 2,
                            message: "Имя должен быть больше 2 символов",
                        },
                        maxLength: {
                            value: 20,
                            message: "Максимальная длина имени 20 символов",
                        },
                        pattern: {
                            value: /^[а-яА-ЯёЁ]+$/,
                            message: "Имя может содержать только кирилицу",
                        },
                    })}
                    error={!!errors.firstName}
                    errorMessage={errors.firstName?.message}
                    value={watch("firstName", "")}
                />

                <Input
                    title="Фамилия"
                    full
                    {...register("lastName", {
                        required: {
                            value: true,
                            message: "Обязательное поле",
                        },
                        minLength: {
                            value: 2,
                            message: "Фамилия должна быть больше 2 символов",
                        },
                        maxLength: {
                            value: 30,
                            message: "Максимальная длина фамилии 30 символов",
                        },
                        pattern: {
                            value: /^[а-яА-ЯёЁ]+$/,
                            message: "Фамилия может содержать только кирилицу",
                        },
                    })}
                    error={!!errors.lastName}
                    errorMessage={errors.lastName?.message}
                    value={watch("lastName", "")}
                />

                <Input
                    title="E-mail"
                    full
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Обязательное поле",
                        },
                        minLength: {
                            value: 5,
                            message: "E-mail должен быть не менее 5 символов",
                        },
                        maxLength: {
                            value: 50,
                            message: "Максимальная длина e-mail — 50 символов",
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
                        maxLength: {
                            value: 32,
                            message: "Максимальная длина пароля 32 символа",
                        },
                    })}
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                    value={watch("password", "")}
                />

                <Input
                    title="Повторите пароль"
                    full
                    type="password"
                    value={passwordAgain}
                    setValue={setPasswordAgain}
                    error={!!passwordAgainError}
                    errorMessage={passwordAgainError}
                />

                <Checkbox
                    id="is_adult"
                    label="Мне есть 18 лет"
                    value={isAdult}
                    setValue={setIsAdult}
                />

                <Checkbox
                    id="register_profi"
                    label="Я регистрируюсь как Профи"
                    value={isProfessional}
                    setValue={setIsProfessional}
                />

                <Button loading={authIsLoading}>Зарегистрироваться</Button>

                <div className={styles.authLinks}>
                    <span className={styles.authLink} onClick={loginCallback}>
                        У меня уже есть аккаунт
                    </span>
                </div>
            </form>
        </Modal>
    );
};

export default Register;
