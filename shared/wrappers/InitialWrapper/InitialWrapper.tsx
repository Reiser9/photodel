'use client';

import React from 'react';
import ruRU from 'antd/locale/ru_RU';
import { ConfigProvider } from 'antd';

import styles from './index.module.scss';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: "#50A398",
                    fontFamily: 'Montserrat, sans-serif',
                },
            }}
        >
            <div className={styles.mainRoot}>{children}</div>
        </ConfigProvider>
    );
};

export default InitialWrapper;
