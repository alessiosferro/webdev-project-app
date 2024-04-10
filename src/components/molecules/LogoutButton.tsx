import {Box, Button} from "@chakra-ui/react";
import {colorScheme} from "@/utils/chakra/theme";
import {logout} from "@/app/[locale]/login/actions";

const LogoutButton = ({text}: { text: string }) => {
    return (
        <Box display="flex" alignItems="center" as="form" action={logout}>
            <Button variant={{base: 'link', lg: 'ghost'}}
                    type="submit"
                    colorScheme={colorScheme}>
                {text}
            </Button>
        </Box>
    )
}

export default LogoutButton;