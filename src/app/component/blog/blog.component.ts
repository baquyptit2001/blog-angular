import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../model/post";
import {BlogService} from "../../service/blog.service";
import {HelperService} from "../../service/helper.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {SideBarComponent} from "../../common/side-bar/side-bar.component";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService, public helperService: HelperService, private store: Store, private titleService: Title) {
  }

  posts: Post[] = [];
  total: number = 0;
  loading = false;
  page: PageEvent = {
    pageIndex: 0,
    pageSize: 5,
    length: 0,
    previousPageIndex: 0
  };
  categorySearch!: number[];
  sort: number = -1;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.getPosts();
    this.titleService.setTitle('Bài viết');
  }

  getPosts(category: number|number[] = 0, sort: number = 1, page: number = 1, size: number = 5): void {
    this.loading = true;
    if (this.categorySearch != undefined) {
      category = this.categorySearch;
    }
    if (this.sort != -1) {
      sort = this.sort;
    }
    this.blogService.getBlogs(category, sort, page, size).subscribe(
      (posts: any) => {
        this.posts = posts.posts;
        this.total = posts.total;
        this.loading = false;
      }, error => {
        console.log(error);
      });
  }

  onPageChange($event: PageEvent) {
    this.store.dispatch({type: 'getPage', payload: $event.pageIndex + 1});
    this.getPosts(0, 1, $event.pageIndex + 1, $event.pageSize);
    this.page = $event;
  }

  updateCategorySearch($event: any) {
    this.categorySearch = $event.category;
    this.sort = $event.sort;
  }

}
