import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'
import {useTranslations} from "next-intl";

export default async function PrivatePage() {
    const supabase = createClient();


    const {data, error} = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <p>Hello <ClientComponent/> {data.user.email}</p>
}

const ClientComponent = () => {
    'use client';

    const t = useTranslations('common');

    return (
        <>{t('footer.copy')}</>
    );
}