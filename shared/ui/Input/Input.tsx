'use client';

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    type?: 'text' | 'password' | 'number';
    error?: boolean;
    errorMessage?: string;
    full?: boolean;
    disabled?: boolean;
    className?: string;
    component?: 'input' | 'textarea';
} & (InputHTMLAttributes<HTMLInputElement> | InputHTMLAttributes<HTMLTextAreaElement>);

const Input: React.FC<Props> = ({
    value,
    setValue,
    title,
    icon,
    placeholder,
    type = 'text',
    error = false,
    errorMessage,
    full = false,
    disabled = false,
    component = 'input',
    className,
    ...props
}) => {
    return (
        <div
            className={cn(styles.inputInner, {
                [styles.full]: full,
            })}
        >
            {title && <p className={styles.inputTitle}>{title}</p>}

            <div
                className={cn(styles.inputWrapper, className, {
                    [styles.disabled]: disabled,
                })}
            >
                {icon && icon}

                {component === 'input' ? (
                    <input
                        type={type}
                        className={cn(styles.input, { [styles.withIcon]: !!icon })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue && !disabled && setValue(e.target.value)}
                        {...(props as TextareaHTMLAttributes<HTMLInputElement>)}
                    />
                ) : (
                    <textarea
                        className={cn(styles.input, styles.textarea, {
                            [styles.withIcon]: !!icon,
                        })}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue && !disabled && setValue(e.target.value)}
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                )}
            </div>

            {error && errorMessage && (
                <p className={styles.inputMessage}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default Input;
