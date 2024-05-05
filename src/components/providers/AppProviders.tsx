"use client";

import {ChakraProvider} from "@chakra-ui/react";
import {PropsWithChildren} from "react";
import theme from "@/utils/chakra/theme";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function AppProviders({children}: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>
    <ChakraProvider cssVarsRoot="body" theme={theme}>{children}</ChakraProvider>
  </QueryClientProvider>;
}
