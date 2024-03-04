'use client';

import {usePathname, useRouter} from '@/navigation';
import {ChangeEventHandler} from "react";

export default function LanguageChanger({locale}: { locale: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = e => {
        router.replace(pathname, {locale: e.target.value});
    };

    return (
        <select value={locale} onChange={handleChange}>
            <option value="it">Italian</option>
            <option value="en">English</option>
        </select>
    );
}
