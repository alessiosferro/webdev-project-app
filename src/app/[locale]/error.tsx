"use client";

import { Container, Text } from "@chakra-ui/react";
import { ErrorComponent } from "next/dist/client/components/error-boundary";

const ErrorPage: ErrorComponent = ({ error, reset }) => {
  return (
    <Container>
      <Text>Sorry, something went wrong</Text>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </Container>
  );
};

export default ErrorPage;
