import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Profile, Search } from "@/shared/icons";
import { usePhotos } from "@/features/photos";
import { useQuery } from "@tanstack/react-query";
import { Preloader } from "@/shared/ui/Preloader";

const MainBlock = () => {
    const [search, setSearch] = React.useState("");

    const router = useRouter();

    const searchProfi = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.replace(`/profies?search=${search}`);
    };

    const { getTopPhoto } = usePhotos();

    const { data, isLoading } = useQuery({
        queryKey: ["topPhoto"],
        queryFn: () => getTopPhoto(),
    });

    const { imageUrl, name, user } = data || {};
    const { firstName, lastName, id } = user || {};

    return (
        <section className={styles.main}>
            {isLoading && <Preloader small fill />}

            {imageUrl && (
                <div className={styles.mainImg}>
                    <Image src={imageUrl} fill alt={`Фото дня - ${name}`} />
                </div>
            )}

            <div className={base.container}>
                <div className={styles.mainInner}>
                    <h1 className={styles.mainTitle}>
                        Поиск фотопрофессионалов рядом с Вами
                    </h1>

                    <p className={styles.mainText}>
                        Найдите фотографа, модель или студию для съемок
                    </p>

                    <form
                        onSubmit={searchProfi}
                        className={styles.mainSearchInner}
                    >
                        <input
                            className={styles.mainSearch}
                            placeholder="Начать поиск"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <Search />
                    </form>
                </div>
            </div>

            {user && (
                <div className={styles.mainAuthorInner}>
                    <p className={styles.mainImageTitle}>Фото дня</p>

                    <p className={styles.mainImgName}>{name}</p>

                    <Link href={`/user/${id}`} className={styles.mainAuthor}>
                        <Profile />
                        {lastName} {firstName}
                    </Link>
                </div>
            )}
        </section>
    );
};

export default MainBlock;
