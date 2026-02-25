import styles from "./index.module.scss";

import { Star } from "@/shared/icons";

type Props = {
    rating: 1 | 2 | 3 | 4 | 5;
};

const RatingReview: React.FC<Props> = ({ rating }) => {
    return (
        <div className={styles.ratingReview}>
            {Array.from({ length: 5 }, (_, index) => (
                <Star
                    key={index}
                    className={index < rating ? styles.active : ""}
                />
            ))}
        </div>
    );
};

export default RatingReview;
