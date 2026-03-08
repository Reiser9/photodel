"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./index.module.scss";

import type { RecoveryChangeData } from "@/entities/user";
import { useAuth } from "@/features/user";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    loginCallback?: () => void;
    registerCallback?: () => void;
};

const Recovery: React.FC<Props> = ({
    value,
    setValue,
    loginCallback,
    registerCallback,
}) => {
    const [step, setStep] = React.useState(1);
    const [verifyCode, setVefiryCode] = React.useState("");

    const [passwordAgain, setPasswordAgain] = React.useState("");
    const [passwordAgainError, setPasswordAgainError] = React.useState("");

    const {
        authIsLoading,
        sendRecoveryCode,
        verifyRecoveryCode,
        changePasswordRecovery,
    } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RecoveryChangeData>();

    const onSubmit: SubmitHandler<RecoveryChangeData> = async (data) => {
        const { email, code, password } = data || {};

        if (step === 1) {
            return sendRecoveryCode({ email }, () => setStep(2));
        }

        if (step === 2) {
            const verifyCode = await verifyRecoveryCode({ email, code }, () =>
                setStep(3),
            );
            if (!verifyCode) return;

            setVefiryCode(verifyCode);
            return;
        }

        if (password !== passwordAgain) {
            return setPasswordAgainError("Пароли должны совпадать");
        }

        setPasswordAgainError("");

        changePasswordRecovery({ email, password, code: verifyCode }, () =>
            setValue(false),
        );
    };

    return (
        <Modal
            value={value}
            setValue={setValue}
            title="Напомнить пароль"
            size="small"
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
                {step === 1 && (
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
                )}

                {step === 2 && (
                    <Input
                        title="Код подтверждения"
                        full
                        {...register("code", {
                            required: {
                                value: true,
                                message: "Обязательное поле",
                            },
                            minLength: {
                                value: 6,
                                message: "Код состоит из 6 символов",
                            },
                            maxLength: {
                                value: 6,
                                message: "Код состоит из 6 символов",
                            },
                        })}
                        error={!!errors.code}
                        errorMessage={errors.code?.message}
                        value={watch("code", "")}
                    />
                )}

                {step === 3 && (
                    <>
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
                                    message:
                                        "Пароль не может быть меньше 8 символов",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Максимальная длина пароля 32 символа",
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
                    </>
                )}

                <Button loading={authIsLoading}>Отправить</Button>

                <div className={styles.authLinks}>
                    <span className={styles.authLink} onClick={loginCallback}>
                        Я вспомнил пароль
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

export default Recovery;
