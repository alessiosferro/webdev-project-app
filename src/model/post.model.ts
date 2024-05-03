export default interface Post {
  id: number;
  created_at: string;
  image_url?: string;
  distruption_id?: string;
  city_id?: string;
  address: string;
  user_id?: string;
  message: string;
  upvotes: number;
  city_name: string;
  comments_count?: number;
  disruption_name: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_image_url: string;
}