import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../model/post";
import {BlogService} from "../../service/blog.service";
import {HelperService} from "../../service/helper.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(category: number = 0, sort: number = 1, page: number = 1, size: number = 5): void {
    this.loading = true;
    this.blogService.getBlogs(category, sort, page, size).subscribe(
      (posts: any) => {
        this.posts = posts.posts;
        console.log(this.posts);
        this.loading = false;
      }, error => {
        console.log(error);
      });
  }

  onPageChange($event: PageEvent) {
    this.getPosts(0, 1, $event.pageIndex + 1, $event.pageSize);
    console.log($event);
  }
}
