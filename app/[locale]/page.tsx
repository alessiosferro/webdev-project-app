import {useTranslations} from "next-intl";
import LanguageChanger from "@/components/LanguageChanger";

export default function Home({params: {locale}}: { params: { locale: string } }) {
    const t = useTranslations('common');

    return (
        <main>
            <h1>{t('header.title')}</h1>

            <p>{t('footer.copy')}</p>

            <LanguageChanger locale={locale}/>
        </main>
    );
}