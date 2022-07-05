import {Component, OnInit} from '@angular/core';
import {Post} from "../../model/post";
import {BlogService} from "../../service/blog.service";
import {HelperService} from "../../service/helper.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService, public helperService: HelperService) {
  }

  posts: Post[] = [];
  loading = false;

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.blogService.getBlogs().subscribe(
      (posts: any) => {
        this.posts = posts.posts;
        console.log(this.posts);
        this.loading = false;
      }, error => {
        console.log(error);
      });
  }

}
