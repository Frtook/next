export interface Articles {
  id: string;
  title: string;
  body: string;
  user_email: string;
  like: number;
  isLike: boolean;
  user_likes: string[];
}
