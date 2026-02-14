import React from "react";

import styles from "./index.module.scss";
import base from '@/shared/styles/base.module.scss';
import { App, Camera, Photosession, SearchBase } from "@/shared/icons";

const InfoBlock = () => {
    return <div className={styles.infoBlock}>
        <div className={base.container}>
            <div className={styles.infoBlockInner}>
                <div className={styles.infoBlockInfo}>
                    <p className={styles.infoBlockInfoTitle}>
                        <Camera />

                        Фотодел
                    </p>

                    <p className={styles.infoBlockInfoSubtitle}>
                        Cервис удобного и быстрого поиска профессионалов и удачных мест для съемок!
                    </p>

                    <p className={styles.infoBlockInfoText}>
                        Вам потребуется совершить ВСЕГО три простых шага!
                    </p>
                </div>

                <div className={styles.infoBlockPoints}>
                    <div className={styles.infoBlockPoint}>
                        <div className={styles.infoBlockPointImg}>
                            <SearchBase />
                        </div>

                        <p className={styles.infoBlockPointText}>
                            Задать необходимые параметры поиска в нашей базе
                        </p>
                    </div>

                    <div className={styles.infoBlockPoint}>
                        <div className={styles.infoBlockPointImg}>
                            <App />
                        </div>

                        <p className={styles.infoBlockPointText}>
                            Выбрать специалиста или место даже без регистрации
                        </p>
                    </div>

                    <div className={styles.infoBlockPoint}>
                        <div className={styles.infoBlockPointImg}>
                            <Photosession />
                        </div>

                        <p className={styles.infoBlockPointText}>
                            Связаться и заказать съемку или фотосессию
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default InfoBlock;
