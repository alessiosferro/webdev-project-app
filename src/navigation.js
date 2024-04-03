import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const defaultLocale = 'it';
export const locales = ['it', 'en'];
export const localePrefix = 'as-needed';

export const {Link, redirect, usePathname, useRouter} =
    createSharedPathnamesNavigation({locales, localePrefix});
