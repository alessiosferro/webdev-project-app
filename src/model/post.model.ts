import UserProfile from "@/model/user-profile.model";

export default interface Post {
  id: number;
  created_at: string;
  image_url?: string;
  distruption_id?: string;
  city_id?: string;
  user_id?: string;
  message: string;
  users: UserProfile;
}
