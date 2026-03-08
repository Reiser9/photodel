"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./index.module.scss";

import type { VerifyCode } from "@/entities/user";
import { useAuth } from "@/features/user";
import { Modal } from "@/shared/ui/Modal";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyModal: React.FC<Props> = ({ value, setValue }) => {
    const { authIsLoading, verifyEmail, logout, sendVerifyCode } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<VerifyCode>();

    const onSubmit: SubmitHandler<VerifyCode> = (data) => {
        verifyEmail(data, () => setValue(false));
    };

    return (
        <Modal
            value={value}
            setValue={setValue}
            title="Подтверждение почты"
            size="small"
            isNotClosed
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
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

                <Button loading={authIsLoading}>Подтвердить</Button>

                <div className={styles.authLinks}>
                    <span
                        className={styles.authLink}
                        onClick={() => sendVerifyCode()}
                    >
                        Выслать код повторно
                    </span>
                    <span
                        className={styles.authLink}
                        onClick={() => logout()}
                    >
                        Выйти из аккаунта
                    </span>
                </div>
            </form>
        </Modal>
    );
};

export default VerifyModal;
