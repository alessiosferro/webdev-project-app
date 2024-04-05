import {PropsWithChildren} from "react";
import AppProviders from "@/components/providers/AppProviders";
import {NextIntlClientProvider, useMessages} from "next-intl";
import Header from "@/components/molecules/Header/Header";
import {Box, Flex} from "@chakra-ui/react";
import Footer from "@/components/molecules/Footer";

export default function RootLayout({children, params: {locale}}: PropsWithChildren<{ params: { locale: string } }>) {
    const messages = useMessages();

    return (
        <html lang={locale}>

        <NextIntlClientProvider
            locale={locale}
            messages={messages}
        >
            <body>
            <AppProviders>
                <Flex minH="100dvh" direction="column">
                    <Header/>
                    <Box as="main" py={{base: '2rem', lg: '4rem'}} flex={1}>
                        {children}
                    </Box>
                    <Footer/>
                </Flex>
            </AppProviders>
            </body>
        </NextIntlClientProvider>

        </html>
    );
}