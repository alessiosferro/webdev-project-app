import UserProfile from "@/model/user-profile.model";
import {City, Disruption} from "@/model/types";

export default interface Post {
  id: number;
  created_at: string;
  image_url?: string;
  distruption_id?: string;
  city_id?: string;
  address: string;
  user_id?: string;
  message: string;
  users: UserProfile;
  cities: City;
  disruptions: Disruption;
}
