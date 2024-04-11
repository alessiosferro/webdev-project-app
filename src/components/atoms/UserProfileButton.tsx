import {AppUser} from "@/model/user-profile.model";
import {Avatar, Flex, Text} from "@chakra-ui/react";

export default function UserProfileButton(props: UserProfileButtonProps) {
    const {
        user,
        showFullName = true
    } = props;

    const fullName = user?.profile?.first_name && user.profile.last_name &&
        `${user.profile.first_name} ${user.profile.last_name}`;

    const imageUrl = user?.profile?.image_url || '';

    return (
        <Flex as="button" display="flex" alignItems="center" gap="1rem">
            <Avatar size="lg" src={imageUrl}/>

            {showFullName && <Text>{fullName}</Text>}
        </Flex>
    )
}

interface UserProfileButtonProps {
    user: AppUser | null;
    showFullName?: boolean;
}