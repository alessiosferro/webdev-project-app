import TextareaControl from "@/components/molecules/TextareaControl";
import {Button, Flex} from "@chakra-ui/react";
import {colorScheme} from "@/utils/chakra/theme";

const AddPostForm = ({action, ctaLabel}: { ctaLabel: string, action: (formData: FormData) => Promise<void> }) => {
    return (
        <Flex as="form"
              action={action}
              gap="1rem"
              direction="column"
              alignItems="flex-end">
            <TextareaControl name="message"/>

            <Button type="submit" colorScheme={colorScheme} variant="solid">{ctaLabel}</Button>
        </Flex>
    )
}

export default AddPostForm;