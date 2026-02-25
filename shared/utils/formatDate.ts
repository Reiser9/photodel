export const formatDate = (date: Date, format: string = "DD.MM.YYYY") => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error("Некорректный объект Date");
    }

    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() возвращает 0-11
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Вспомогательная функция для добавления ведущего нуля
    const padZero = (num: number): string => num.toString().padStart(2, "0");

    // Карта токенов для замены
    const tokens: Record<string, string> = {
        DD: padZero(day),
        D: day.toString(),
        MM: padZero(month),
        M: month.toString(),
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
