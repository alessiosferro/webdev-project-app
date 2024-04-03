import {getTranslations} from "next-intl/server";
import {LocaleParams} from "@/model/locale-params.props";
import LoginForm from "@/components/organisms/LoginForm";

export const generateMetadata = async ({params: {locale}}: LocaleParams) => {
    const t = await getTranslations({namespace: 'common', locale});

    return {
        title: t('seo.login')
    }
}

export default function LoginPage() {
    return <LoginForm/>;
}
