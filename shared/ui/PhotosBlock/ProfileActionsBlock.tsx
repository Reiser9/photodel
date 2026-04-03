import React from "react";
import Link from "next/link";

import styles from "./index.module.scss";

import { Checkbox } from "../Checkbox";
import { CirclePlus } from "@/shared/icons";
import { Select } from "../Select";

type Props = {
    count?: number | string;
    elems: { id: number }[];
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
    action?: string | null;
    setAction?: React.Dispatch<React.SetStateAction<string | null>>;
    actionOptions?: {
        label: string;
        value: string;
    }[];
    linkText?: string;
    linkValue?: string;
    checkboxId?: string;
    checkboxContent?: React.ReactNode;
    buttonContent?: React.ReactNode;
    children: React.ReactNode;
};

const ProfileActionsBlock: React.FC<Props> = ({
    count,
    elems,
    selectedIds,
    setSelectedIds,
    checkboxId,
    action,
    setAction,
    actionOptions,
    linkText,
    linkValue,
    checkboxContent,
    buttonContent,
    children,
}) => {
    const isAllSelected = React.useMemo(() => {
        if (elems.length === 0) return false;

        return elems.every((item) => selectedIds.includes(item.id));
    }, [elems, selectedIds]);

    const selectAllEntities = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = elems.map((item) => item.id);
            setSelectedIds(allIds);
        }
    };

    return (
        <>
            <div className={styles.actionTop}>
                <div className={styles.actionTopWrap}>
                    <p className={styles.actionTopCount}>
                        Всего: <span>{count || 0}</span>
                    </p>

                    {!!count &&
                        (checkboxContent
                            ? checkboxContent
                            : checkboxId && (
                                  <Checkbox
                                      label="Выбрать все"
                                      id={checkboxId}
                                      auto
                                      value={isAllSelected}
                                      onChangeHandler={selectAllEntities}
                                  />
                              ))}
                </div>

                <div className={styles.actionTopWrap}>
                    {buttonContent && buttonContent}

                    {linkText && linkValue && (
                        <Link href={linkValue || ""} className={styles.addLink}>
                            <CirclePlus />
                            {linkText}
                        </Link>
                    )}

                    {!!actionOptions?.length && !!count && (
                        <Select
                            wrapperClass={styles.actionSelect}
                            placeholder="Выберите действие"
                            value={action}
                            setValue={setAction}
                            options={actionOptions}
                        />
                    )}
                </div>
            </div>

            {children}
        </>
    );
};

export default ProfileActionsBlock;
