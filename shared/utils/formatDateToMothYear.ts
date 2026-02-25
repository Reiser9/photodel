export const formatDateToRussianMonthYear = (isoDate?: Date) => {
    if (!isoDate) return;

    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        throw new Error("Некорректный формат даты");
    }

    const year = date.getFullYear();
    const monthIndex = date.getMonth();

    const monthsInGenitive = [
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

    const monthName = monthsInGenitive[monthIndex];

    return `С ${monthName} ${year}`;
};
