import {Spinner, SpinnerProps} from "@chakra-ui/react";

export default function LoadingSpinner(props: SpinnerProps) {
  return (
    <Spinner
      thickness=".2rem"
      speed="600ms"
      emptyColor="gray.200"
      color="blue.200"
      size="md"
      {...props}
    />
  )
}