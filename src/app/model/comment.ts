import { User } from "./user";

export class Comment {
  id: number = 0;
  content: string = '';
  user: User = new User();
  created_at: Date = new Date();
  updated_at: Date = new Date();
}
