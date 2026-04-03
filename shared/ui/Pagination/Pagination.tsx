import React, { SetStateAction } from "react";
import cn from "classnames";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./index.module.scss";

type Props = {
    totalPages: number;
    page: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    isLoading?: boolean;
    className?: string;
    withoutPageParam?: boolean;
};

const Pagination: React.FC<Props> = ({
    totalPages,
    page,
    setPage,
    isLoading = false,
    className,
    withoutPageParam = false,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page");

    React.useEffect(() => {
        if (pageParam && +pageParam >= 1) {
            setPage(+pageParam);
        } else {
            setPage(1);
        }
    }, [pageParam]);

    React.useEffect(() => {
        if (totalPages) {
            if (page > totalPages) {
                setPage(1);
            }
        }
    }, [totalPages, page]);

    React.useEffect(() => {
        if (page && !withoutPageParam) {
            router.replace(`?page=${page}`);
        }
    }, [page, withoutPageParam]);

    return (
        <>
            {!isLoading &&
                !!totalPages &&
                totalPages > 1 &&
                page <= totalPages && (
                    <div className={cn(styles.pagination, className)}>
                        {[...Array(totalPages)].map((_, id) => (
                            <button
                                key={id}
                                className={cn(styles.paginationButton, {
                                    [styles.active]: id + 1 === page,
                                })}
                                onClick={() => setPage(id + 1)}
                            >
                                {id + 1}
                            </button>
                        ))}
                    </div>
                )}
        </>
    );
};

export default Pagination;
