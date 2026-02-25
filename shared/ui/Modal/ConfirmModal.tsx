"use client";

import React from "react";

import styles from "./index.module.scss";

import { Button } from "../Button";
import Modal from "./Modal";

type Props = {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    callback: () => void;
};

const ConfirmModal: React.FC<Props> = ({
    value,
    setValue,
    title,
    callback = () => {},
}) => {
    return (
        <Modal value={value} setValue={setValue} title={title}>
            <div className={styles.confirmModalButtons}>
                <Button
                    onClick={() => {
                        callback();
                        setValue(false);
                    }}
                    color="danger"
                >
                    Да
                </Button>

                <Button onClick={() => setValue(false)}>Нет</Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
