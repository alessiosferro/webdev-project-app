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
    <body>
    <AppProviders>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <UserProvider>
            {(user) => (
              <>
                <Header addPostForm={<AddPostFormServer/>} user={user}/>

                <Container
                  maxW={{md: "container.md"}}
                  display="flex"
                  flexDirection="column"
                >
                  <Box flex={1} pt="2rem" pb="4rem" as="main">
                    {children}
                  </Box>
                </Container>
              </>
            )}
          </UserProvider>
        </GoogleOAuthProvider>
      </NextIntlClientProvider>
    </AppProviders>
    </body>
    </html>
  );
}
