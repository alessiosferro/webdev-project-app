import {useFormStatus} from "react-dom";
import {Flex, MenuItem} from "@chakra-ui/react";
import {logout} from "@/app/[locale]/login/actions";
import {FiLogOut} from "react-icons/fi";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import {PropsWithChildren} from "react";

export default function LogoutButton({children}: PropsWithChildren) {
  const {pending} = useFormStatus();

  return (
    <MenuItem
      type="submit"
      formAction={logout}
      closeOnSelect={false}
      icon={<FiLogOut fontSize="1.6rem"/>}
      color="blue.500"
    >
      <Flex align="center" gap="1.5rem">
        {children}

        {pending && <LoadingSpinner thickness=".15rem" size="sm"/>}
      </Flex>
    </MenuItem>
  )
}