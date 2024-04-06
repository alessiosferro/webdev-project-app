import {PropsWithChildren, Suspense} from "react";
import Header from "@/components/molecules/Header/Header";
import {Box} from "@chakra-ui/react";
import Footer from "@/components/molecules/Footer";
import Loading from "@/app/[locale]/loading";

export default function Layout({children}: PropsWithChildren) {
    return (
        <>
            <Header/>
            <Box as="main" py={{base: '2rem', lg: '4rem'}} flex={1}>
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
            </Box>
            <Footer/>
        </>
    )
}