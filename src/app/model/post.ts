import {User} from "./user";
import {Category} from "./category";

export class Post {
  id: number = 0;
  title: string = '';
  content: string = '';
  slug: string = '';
  image: string = '';
  category: Category = new Category();
  user: User = new User();
  comment_count: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  created_at_human: string = '';
}
