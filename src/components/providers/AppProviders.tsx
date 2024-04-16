"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import theme from "@/utils/chakra/theme";

export default function AppProviders({ children }: PropsWithChildren) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
