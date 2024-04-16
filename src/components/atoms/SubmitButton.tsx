import {colorScheme} from "@/utils/chakra/theme";
import {Button, ButtonProps} from "@chakra-ui/react";
import {useFormStatus} from "react-dom";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

export default function SubmitButton(props: ButtonProps) {
  const {pending} = useFormStatus();

  return (
    <Button
      flex={1}
      p="1rem"
      isDisabled={pending}
      display="flex"
      gap="1rem"
      type="submit"
      colorScheme={colorScheme}
      variant="solid"
      {...props}
    >
      Invia
      {pending && <LoadingSpinner size="sm"/>}
    </Button>
  )
}