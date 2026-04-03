export const formatDate = (
    date: string = "",
    format: string = "DD.MM.YYYY",
) => {
    const newDate = new Date(date);

    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
        throw new Error("Некорректный объект Date");
    }

    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // getMonth() возвращает 0-11
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();

    const nameMonths = [
        "янв",
        "фер",
        "мар",
        "апр",
        "май",
        "июн",
        "июл",
        "авг",
        "сен",
        "окт",
        "ноя",
        "дек",
    ];

    // Вспомогательная функция для добавления ведущего нуля
    const padZero = (num: number): string => num.toString().padStart(2, "0");

    // Карта токенов для замены
    const tokens: Record<string, string> = {
        DD: padZero(day),
        D: day.toString(),
        MM: padZero(month),
        M: month.toString(),
        MMMM: nameMonths[month - 1],
        YYYY: year.toString(),
        YY: year.toString().slice(-2),
        HH: padZero(hours),
        H: hours.toString(),
        mm: padZero(minutes),
        m: minutes.toString(),
        ss: padZero(seconds),
        s: seconds.toString(),
    };

    // Сортируем ключи по длине (убывание), чтобы сначала заменять длинные токены
    // Например, чтобы 'YYYY' заменился раньше, чем 'YY'
    const sortedTokens = Object.keys(tokens).sort(
        (a, b) => b.length - a.length,
    );

    let result = format;
    for (const token of sortedTokens) {
        result = result.replace(new RegExp(token, "g"), tokens[token]);
    }

    return result;
};
