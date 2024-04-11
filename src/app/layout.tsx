import {PropsWithChildren, Suspense} from "react";
import AppProviders from "@/components/providers/AppProviders";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {Container, Flex} from "@chakra-ui/react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Header from "@/components/molecules/Header/Header";
import Loading from "@/app/[locale]/loading";
import Footer from "@/components/molecules/Footer";

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
                        <Header/>
                        <Container as="main" py={{base: '2rem', lg: '4rem'}} flex={1}>
                            <Suspense fallback={<Loading/>}>
                                {children}
                            </Suspense>
                        </Container>
                        <Footer/>
                    </Flex>
                </AppProviders>
                </body>
            </GoogleOAuthProvider>
        </NextIntlClientProvider>

        </html>
    );
}