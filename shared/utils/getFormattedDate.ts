export const getFormattedDate = (
    date: Date,
    format: "short" | "long" = "long",
): string => {
    const newDate = new Date(date);

    const now = new Date();
    const yesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1,
    );

    const isToday = newDate.toDateString() === now.toDateString();

    const isYesterday = newDate.toDateString() === yesterday.toDateString();
    const isThisYear = newDate.getFullYear() === now.getFullYear();

    if (isToday) {
        return format === "short"
            ? formatTime(newDate)
            : `сегодня в ${formatTime(newDate)}`;
    } else if (isYesterday) {
        return format === "short" ? "вчера" : `вчера в ${formatTime(newDate)}`;
    } else if (isThisYear) {
        return format === "short"
            ? `${newDate.getDate()} ${getShortMonthName(newDate.getMonth())}`
            : `${newDate.getDate()} ${getMonthName(newDate.getMonth())} в ${formatTime(newDate)}`;
    } else {
        return format === "short"
            ? `${newDate.getDate()} ${getShortMonthName(newDate.getMonth())} ${newDate.getFullYear()}`
            : `${newDate.getDate()} ${getMonthName(newDate.getMonth())} ${newDate.getFullYear()}`;
    }
};

const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

const getMonthName = (month: number): string => {
    const monthNames = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];

    return monthNames[month];
};

const getShortMonthName = (month: number): string => {
    const monthNames = [
        "янв",
        "фев",
        "мар",
        "апр",
        "мая",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];

    return monthNames[month];
};
