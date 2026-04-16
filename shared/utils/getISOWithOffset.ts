import dayjs, { Dayjs } from "dayjs";

export const getISOWithOffset = (
    date: Dayjs | Dayjs[] | null,
    time: Dayjs | null,
): string | null => {
    if (!date || !time) return null;
    const selectedDate = Array.isArray(date) ? date[0] : date;

    return dayjs(selectedDate)
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second() ?? 0)
        .millisecond(time.millisecond() ?? 0)
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
};
