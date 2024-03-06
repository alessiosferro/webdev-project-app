import TextareaControl from "@/components/molecules/TextareaControl";
import {Button, Flex} from "@chakra-ui/react";

const NewPostForm = () => {
    return (
        <Flex as="form" gap="1rem" direction="column"
              alignItems="flex-end">
            <TextareaControl name="message"/>

            <Button type="submit" colorScheme="teal" variant="solid">Posta</Button>
        </Flex>
    )
}

export default NewPostForm;