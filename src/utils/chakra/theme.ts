import {defineStyle, defineStyleConfig, extendTheme} from "@chakra-ui/react";
import space from "@/utils/chakra/space";

export const colorScheme = "blue";

const theme = extendTheme({
    components: {
        Container: defineStyleConfig({
            baseStyle: defineStyle({
                maxW: {base: 'container.lg', lg: 'xl'}
            })
        })
    },
    space,
    sizes: {
        ...space,
        full: "100%",
        "3xs": "22.4rem",
        "2xs": "25.6rem",
        xs: "32rem",
        sm: "38.4rem",
        md: "44.8rem",
        lg: "51.2rem",
        xl: "57.6rem",
        "2xl": "67.2rem",
        "3xl": "76.8rem",
        "4xl": "89.6rem",
        "5xl": "102.4rem",
        "6xl": "115.2rem",
    },
    fontSizes: {
        xs: "1.2rem",
        sm: "1.4rem",
        md: "1.6rem",
        lg: "1.8rem",
        xl: "2rem",
        "2xl": "2.4rem",
        "3xl": "3rem",
        "4xl": "3.6rem",
        "5xl": "4.8rem",
        "6xl": "6rem",
        "7xl": "7.2rem",
        "8xl": "9.6rem",
        "9xl": "12.8rem",
    },
    styles: {
        global: {
            html: {
                fontSize: '62.5%'
            },
            body: {
                fontSize: '1.6rem'
            }
        }
    }
});

export default theme;
