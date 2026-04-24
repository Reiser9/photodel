import React from "react";

type UseLocalStorageReturn<T> = [T, React.Dispatch<React.SetStateAction<T>>];

function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T),
): UseLocalStorageReturn<T> {
    const [storedValue, setStoredValue] = React.useState<T>(() => {
        if (typeof window === "undefined") {
            return typeof initialValue === "function"
                ? (initialValue as () => T)()
                : initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item !== null
                ? (JSON.parse(item) as T)
                : typeof initialValue === "function"
                  ? (initialValue as () => T)()
                  : initialValue;
        } catch (error) {
            console.warn(
                `[useLocalStorage] Ошибка чтения ключа "${key}":`,
                error,
            );
            return typeof initialValue === "function"
                ? (initialValue as () => T)()
                : initialValue;
        }
    });

    React.useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            if (storedValue === undefined || storedValue === null) {
                window.localStorage.removeItem(key);
            } else {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            }
        } catch (error) {
            console.warn(
                `[useLocalStorage] Ошибка записи ключа "${key}":`,
                error,
            );
        }
    }, [key, storedValue]);

    React.useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key !== key) return;

            if (e.newValue === null) {
                setStoredValue(
                    typeof initialValue === "function"
                        ? (initialValue as () => T)()
                        : initialValue,
                );
            } else {
                try {
                    setStoredValue(JSON.parse(e.newValue) as T);
                } catch {
                    console.warn(
                        `[useLocalStorage] Невалидный JSON в localStorage для ключа "${key}"`,
                    );
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key, initialValue]);

    React.useEffect(() => {
        const handleDirectUpdate = (e: Event) => {
            const customEvent = e as CustomEvent<{ key: string; value: T }>;
            if (customEvent.detail?.key === key) {
                setStoredValue(customEvent.detail.value);
            }
        };

        window.addEventListener("localstorage-sync", handleDirectUpdate);
        return () =>
            window.removeEventListener("localstorage-sync", handleDirectUpdate);
    }, [key]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
