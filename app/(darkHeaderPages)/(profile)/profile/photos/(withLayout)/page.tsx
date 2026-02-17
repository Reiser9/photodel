import React from "react";

import styles from "./index.module.scss";
import { PhotosBlock } from "@/shared/ui/PhotosBlock";

const ProfilePhotoPage = () => {
    return (
        <PhotosBlock
            count="12"
            photos={[
                { id: 1, src: "/img/photo1.png" },
                { id: 2, src: "/img/photo2.png" },
                { id: 3, src: "/img/photo3.png" },
                { id: 4, src: "/img/photo4.png" },
                { id: 5, src: "/img/photo5.png" },
                { id: 6, src: "/img/photo6.png" },
                { id: 7, src: "/img/photo7.png" },
                { id: 8, src: "/img/photo1.png" },
                { id: 9, src: "/img/photo2.png" },
            ]}
        />
    );
};

export default ProfilePhotoPage;
