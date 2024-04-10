import dayjs from "dayjs";
import {defaultLocale, locales} from "@/navigation";

export function getFormattedDate(date: string) {
    return dayjs(date).format('DD MMM YYYY HH:mm:ss');
}

export function getLocalizedPath({locale, path}: { locale: string, path: string }) {
    const pathWithoutLocale = path
        .replace(new RegExp(`^\/(${locales.join('|')})\/`), '/');

    if (locale === defaultLocale) {
        return pathWithoutLocale;
    }

    return `/${locale}${pathWithoutLocale}`;
}

