import { AppUser } from "@/model/user-profile.model";
import { Avatar, Flex, FlexProps, Text } from "@chakra-ui/react";

export default function UserProfileButton(props: UserProfileButtonProps) {
  const { user, showFullName = true, ...flexProps } = props;

  const fullName =
    user?.profile?.first_name &&
    user.profile.last_name &&
    `${user.profile.first_name} ${user.profile.last_name}`;

  const imageUrl = user?.profile?.image_url || "";

  return (
    <Flex
      as="button"
      display="flex"
      alignItems="center"
      gap="1rem"
      {...flexProps}
    >
      <Avatar size="lg" src={imageUrl} />

      {showFullName && <Text>{fullName}</Text>}
    </Flex>
  );
}

interface UserProfileButtonProps extends FlexProps {
  user: AppUser | null;
  showFullName?: boolean;
}
