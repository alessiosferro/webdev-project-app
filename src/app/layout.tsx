import {PropsWithChildren} from "react";
import AppProviders from "@/components/providers/AppProviders";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {Flex} from "@chakra-ui/react";
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function RootLayout({children, params: {locale}}: PropsWithChildren<{
    params: { locale: string }
}>) {
    const messages = useMessages();

    return (
        <html lang={locale}>

        <NextIntlClientProvider
            locale={locale}
            messages={messages}
        >
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                <body>
                <AppProviders>
                    <Flex minH="100dvh" direction="column">
                        {children}
                    </Flex>
                </AppProviders>
                </body>
            </GoogleOAuthProvider>
        </NextIntlClientProvider>

        </html>
    );
}