import Link from "next/link";
import { Metadata } from "next";

import styles from "./index.module.scss";
import base from "@/shared/styles/base.module.scss";

import { Notfound as NotfoundIcon } from "@/shared/icons";

export const metadata: Metadata = {
    title: "Photodel - Страница не найдена",
};

const NotFound = () => {
    return (
        <section className={styles.notfound}>
            <div className={base.container}>
                <div className={styles.notfoundInner}>
                    <div className={styles.notfoundImg}>
                        <NotfoundIcon />
                    </div>

                    <div className={styles.notfoundTextInner}>
                        <h1 className={styles.notfoundTitle}>
                            Что-то пошло не так.
                        </h1>

                        <p className={styles.notfoundText}>
                            Страница, которую Вы ищете, недоступна по одной из
                            следующих причин: был изменен URL, страница была
                            удалена или произошла ошибка в написании ссылки.
                        </p>

                        <p className={styles.notfoundText}>
                            Если Вы считаете, что это произошло по нашей
                            причине, напишите нам или попробуйте начать с{" "}
                            <Link href="/">Главной страницы</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
