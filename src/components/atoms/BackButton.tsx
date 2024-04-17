'use client';

import {FiArrowLeft} from "react-icons/fi";
import {Button, ButtonProps} from "@chakra-ui/react";
import {useRouter} from "@/navigation";
import {colorScheme} from "@/utils/chakra/theme";

export default function BackButton(props: ButtonProps) {
  const {back} = useRouter();

  return (
    <Button aria-label="Go back"
            onClick={back}
            gap=".2rem"
            colorScheme={colorScheme}
            sx={{"> .chakra-button__icon svg": {fontSize: "2rem"}}}
            leftIcon={<FiArrowLeft/>}
            variant="ghost"
            {...props}
    >Go back</Button>
  )
}