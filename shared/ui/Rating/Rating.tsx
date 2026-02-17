import React from "react";
import cn from "classnames";

import styles from "./index.module.scss";

import { Star } from "@/shared/icons";

type Props = {
    rating: number | string;
    className?: string;
};

const Rating: React.FC<Props> = ({ rating, className }) => {
    return (
        <p className={cn(styles.ratingValue, className)}>
            <Star />
            {rating}
        </p>
    );
};

export default Rating;
