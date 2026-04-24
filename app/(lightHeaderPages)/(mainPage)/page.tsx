"use client";

import Image from "next/image";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { InfoBlock } from "./ui/InfoBlock";
import { PhotosBlock } from "./ui/PhotosBlock";
import { PlacesBlock } from "./ui/PlacesBlock";
import { ProfiesBlock } from "./ui/ProfiesBlock";
import { LastComments } from "./ui/LastComments";

import { Button } from "@/shared/ui/Button";
import { useAppSelector } from "@/shared/hooks/useRedux";
import { useAuthContext } from "@/shared/context/AuthProvider";
import { MainBlock } from "./ui/MainBlock";

const MainPage = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { setRegisterModal } = useAuthContext();

    return (
        <>
            <MainBlock />

            <ProfiesBlock />

            <PlacesBlock />

            <PhotosBlock />

            <LastComments />

            <InfoBlock />

            {!isAuth && (
                <section className={styles.banner}>
                    <div className={styles.bannerImg}>
                        <Image src="/img/banner.png" alt="Баннер" fill />
                    </div>

                    <div className={base.container}>
                        <div className={styles.bannerInner}>
                            <h2 className={styles.bannerTitle}>
                                Вы отличный фотограф или профессиональная
                                модель?
                            </h2>

                            <p className={styles.bannerText}>
                                Зарегистрируйтесь на Фотодел  и начните получать
                                заказы прямо сейчас!
                            </p>

                            <Button
                                auto
                                className={styles.bannerButton}
                                onClick={() => setRegisterModal(true)}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default MainPage;
