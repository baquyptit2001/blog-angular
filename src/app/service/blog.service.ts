import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {API_URL} from "../app.constants";

class PostResponse {
  posts: Post[] = [];

}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) {}

  getBlogs(category: number = 1, sort: number = 1, page: number = 1, size: number = 5):Observable<PostResponse> {
     return this.http.get<PostResponse>(`${API_URL}posts/${category}/${sort}/${page}/${size}`);
  }


}
