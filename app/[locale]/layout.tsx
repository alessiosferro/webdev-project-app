import {PropsWithChildren} from "react";
import AppProviders from "@/components/providers/AppProviders";
import {locales} from "@/navigation";
import {notFound} from "next/navigation";
import {NextIntlClientProvider, useMessages} from "next-intl";

export default function RootLayout({children, params: {locale}}: PropsWithChildren<{ params: { locale: string } }>) {
    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = useMessages();


    return (
        <html lang={locale}>

        <NextIntlClientProvider
            locale={locale}
            messages={messages}
        >
            <body>
            <AppProviders>{children}</AppProviders>
            </body>
        </NextIntlClientProvider>

        </html>
    );
}