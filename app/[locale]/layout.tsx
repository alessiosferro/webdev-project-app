import {PropsWithChildren} from "react";

export default function RootLayout({children, params: {locale}}: PropsWithChildren<{ params: { locale: string } }>) {
    return (
        <html lang={locale}>
        <body>{children}</body>
        </html>
    );
}