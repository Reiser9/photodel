import React from "react";

import styles from "./index.module.scss";

type Props = {
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children }) => {
    return <div>{children}</div>;
};

export default Modal;
