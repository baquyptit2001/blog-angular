import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../service/blog.service";
import {Post} from "../../model/post";
import {Comment} from "../../model/comment";
import {HelperService} from "../../service/helper.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Pusher from 'pusher-js';
import {Paginator} from "primeng/paginator";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: Paginator | undefined;

  slug: string = '';
  post: Post = new Post();
  loading = true;
  comments: Comment[] = [];
  totalComment = 0;
  isEnd: boolean = true;
  commentLoading: boolean = true;
  isLogin: boolean = false;

  comment: string = 'comment';

  commentForm: FormGroup = this.formBuilder.group({
    content: new FormControl('', [Validators.required])
  });

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService, public helperService: HelperService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.params['slug'];
    this.getBlog()
    this.isLogin = this.helperService.isLogin();
  }

  getBlog() {
    this.loading = true;
    this.blogService.getBlog(this.slug).subscribe(
      (data: any) => {
        this.post = data.data;
        console.log(this.post);
        this.getComment()
        this.totalComment = this.post.comment_count;
        this.pusher();
        this.loading = false;
      }, error => {
        console.log(error);
      })
  }

  addComment() {
    if (this.commentForm.valid) {
      this.blogService.addComment(this.slug, this.commentForm.value).subscribe(
        (data: any) => {
          this.commentForm.reset();
          this.totalComment++;
        }
        , error => {
          console.log(error);
        }
      );
    }
  }

  pusher() {
    // Pusher.logToConsole = true;

    let pusher = new Pusher('4cf90ee119b2e0ac8c23', {
      cluster: 'ap1'
    });

    let channel = pusher.subscribe('comment-' + this.post.id);
    channel.bind('comment', (data: any) => {
      this.comments.unshift(data.message);
      this.totalComment++;
    });
  }

  getComment() {
    this.commentLoading = true;
    this.blogService.getComments(this.slug, this.comments.length).subscribe(
      (data: any) => {
        this.comments.push(...data.comments);
        this.commentLoading = false;
        this.isEnd = data.is_end;
      }
      , error => {
        console.log(error);
      }
    );
  }

}
