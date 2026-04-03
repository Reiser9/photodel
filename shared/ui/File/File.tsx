"use client";

import React, { ChangeEvent } from "react";

import styles from "./index.module.scss";

type Props = {
    id: string;
    accept?: string;
    setFile?: (value: FileList) => void;
    setImgPreview?: (value: string | ArrayBuffer | null) => void;
    onChange?: (file: FileList) => void;
    multiple?: boolean;
};

const File: React.FC<Props> = ({
    id,
    accept,
    setFile,
    setImgPreview,
    onChange,
    multiple = false,
}) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) {
            return;
        }

        const file = e.target.files;
        setFile && setFile(file);
        onChange && onChange(file);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file[0]);

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
            multiple={multiple}
        />
    );
};

export default File;
