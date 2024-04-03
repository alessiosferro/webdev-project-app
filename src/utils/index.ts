import dayjs from "dayjs";

export function getFormattedDate(date: string) {
    return dayjs(date).format('DD MMM YYYY HH:mm:ss');
}