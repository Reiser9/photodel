import Link from "next/link";
import Image from "next/image";

import styles from "./index.module.scss";
import base from '@/shared/styles/base.module.scss';

import { Pro } from "@/shared/ui/Pro";
import { UserInfoBlock } from "@/shared/ui/UserInfoBlock";

const LastComments = () => {
    return <section className={styles.lastcomments}>
        <div className={base.container}>
            <div className={styles.lastcommentsInner}>
                <h2 className={styles.lastcommentsTitle}>Последние комментарии</h2>

                <div className={styles.lastcommentsItems}>
                    <div className={styles.lastcommentsItem}>
                        <Link href="/photos" className={styles.lastcommentsItemTitle}>
                            На священной горе
                        </Link>

                        <p className={styles.lastcommentsItemText}>
                            Восхитительное по красоте место, очень удачное для съемок в ночное время! Советую всем влюбленным для романтической съемки!
                        </p>

                        <div className={styles.lastcommentsItemInfo}>
                            <UserInfoBlock id={1} image="/img/people1.png" name="Родионова" surname="Марианна" isPro status="Сегодня 20:20" />
                        </div>
                    </div>

                    <div className={styles.lastcommentsItem}>
                        <Link href="/photos" className={styles.lastcommentsItemTitle}>
                            Аполлон
                        </Link>

                        <p className={styles.lastcommentsItemText}>
                            Очень качественные и красивые фото, видно, что настоящий профессионал своего дела, все четко и по делу, никаких соплей и непонятных моментов!
                        </p>

                        <div className={styles.lastcommentsItemInfo}>
                            <UserInfoBlock id={1} image="/img/people1.png" name="Родионова" surname="Марианна" isPro status="Сегодня 20:20" />
                        </div>
                    </div>

                    <div className={styles.lastcommentsItem}>
                        <Link href="/photos" className={styles.lastcommentsItemTitle}>
                            На берегу озера
                        </Link>

                        <p className={styles.lastcommentsItemText}>
                            Байкал великолепен! Очень удачно подобранное место для съемок на фоне замечательного озера совсем недалеко от населенного пункта!
                        </p>

                        <div className={styles.lastcommentsItemInfo}>
                            <UserInfoBlock id={1} image="/img/people1.png" name="Родионова" surname="Марианна" isPro status="Сегодня 20:20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>;
};

export default LastComments;
