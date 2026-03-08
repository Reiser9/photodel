"use client";

import React, { ChangeEvent } from "react";

import styles from "./index.module.scss";

type Props = {
    id: string;
    accept?: string;
    setFile?: (value: File) => void;
    setImgPreview?: (value: string | ArrayBuffer | null) => void;
    onChange?: (file: File) => void;
};

const File: React.FC<Props> = ({
    id,
    accept,
    setFile,
    setImgPreview,
    onChange,
}) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        const file = e.target.files[0];
        setFile && setFile(file);
        onChange && onChange(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = () => {
            setImgPreview && setImgPreview(fileReader.result);

            const img = new Image();
            img.src = fileReader.result as string;

            e.target.value = "";
        };
    };

    return (
        <input
            id={id}
            type="file"
            className={styles.file}
            accept={accept || "image/png, image/jpeg, image/svg+xml"}
            onChange={onInputChange}
        />
    );
};

export default File;
