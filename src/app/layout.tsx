import {PropsWithChildren} from "react";
import AppProviders from "@/components/providers/AppProviders";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {Box, Container} from "@chakra-ui/react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import UserProvider from "@/components/providers/UserProvider";
import Header from "@/components/molecules/Header";
import AddPostFormServer from "@/components/molecules/AddPostFormServer";

export default function RootLayout({
                                     children,
                                     params: {locale},
                                   }: PropsWithChildren<{
  params: { locale: string };
}>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
    <NextIntlClientProvider locale={locale} messages={messages}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
      >
        <body>
        <AppProviders>
          <UserProvider>
            {(user) => (
              <Container
                py="2rem"
                display="flex"
                minH="100dvh"
                flexDirection="column"
                gap="2rem"
              >
                <Header addPostForm={<AddPostFormServer/>} user={user}/>

                <Box flex={1} mt="2rem" as="main">
                  {children}
                </Box>
              </Container>
            )}
          </UserProvider>
        </AppProviders>
        </body>
      </GoogleOAuthProvider>
    </NextIntlClientProvider>
    </html>
  );
}
