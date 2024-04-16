import {loginWithGoogle} from "@/app/[locale]/login/actions";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import {Flex} from "@chakra-ui/react";
import {useState} from "react";

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (response: CredentialResponse) => {
    setIsLoading(true);
    await loginWithGoogle(response);
    setIsLoading(false);
  }

  return (
    <Flex gap="2rem" align="center" position="absolute">
      <GoogleLogin onSuccess={handleSubmit}/>

      {isLoading && <LoadingSpinner/>}
    </Flex>

  )
}