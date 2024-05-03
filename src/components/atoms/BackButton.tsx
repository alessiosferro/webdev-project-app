'use client';

import {FiArrowLeft} from "react-icons/fi";
import {ButtonProps, IconButton} from "@chakra-ui/react";
import {useRouter} from "@/navigation";
import {colorScheme} from "@/utils/chakra/theme";

export default function BackButton(props: ButtonProps) {
  const {back} = useRouter();

  return (
    <IconButton aria-label="Go back"
                onClick={back}
                colorScheme={colorScheme}
                icon={<FiArrowLeft fontSize="2rem"/>}
                variant="ghost"
                {...props}
    />
  )
}