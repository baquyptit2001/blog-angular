import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/post";
import {API_URL} from "../app.constants";
import {CookieService} from "ngx-cookie-service";
import {HelperService} from "./helper.service";

class PostResponse {
  posts: Post[] = [];
  total: number = 0;
}

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient, private cookieService: CookieService, private helper: HelperService) {
  }

  getBlogs(category?: number | number[], sort: number = 1, page: number = 1, size: number = 5): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${API_URL}posts/${category}/${sort}/${page}/${size}`);
  }

  getBlog(slug: string): Observable<any> {
    return this.http.get<Post>(`${API_URL}posts/${slug}`);
  }

  addComment(slug: string, comment: any): Observable<any> {
    let userID = this.cookieService.get('user.id');
    return this.http.post<any>(`${API_URL}comments/${slug}/${userID}`, comment, {headers: this.helper.setHeader()});
  }

  getComments(slug: string, offset: number): Observable<any> {
    return this.http.get<any>(`${API_URL}comments/${slug}/${offset}`);
  }


}
