import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../app.constants";
import {Category} from "../../model/category";
import {BlogComponent} from "../../component/blog/blog.component";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  categories: Category[] = [];
  categoryChecked: boolean[] = [];
  categoryAll: boolean = true;

  sort: number = 1;
  textSort: string = 'Mới nhất';
  @Output()
  onChange = new EventEmitter<any>();

  constructor(private http: HttpClient, private _blog: BlogComponent) {
    this.getCategory();
  }

  getCategory() {
    this.http.get<any>(API_URL + 'categories').subscribe(
      (data: any) => {
        this.categories = data.categories;
        this.categories.forEach(category => {
          this.categoryChecked[category.id] = true;
        })
      }
    );
  }

  checkAll() {
    this.categoryAll = !this.categoryAll;
    this.updateCategory();
    this.categories.forEach(category => {
      this.categoryChecked[category.id] = this.categoryAll;
    })
    if (this.categoryAll) {
      let listCategory = this.categories.filter(c => this.categoryChecked[c.id]).map(c => c.id);
      let page = this._blog.page;
      this._blog.getPosts(listCategory.length == 0 ? -1 : listCategory, this.sort ? 1 : 2, page.pageIndex + 1, page.pageSize);
    } else {
      this._blog.getPosts(-1, 1, this._blog.page.pageIndex + 1, this._blog.page.pageSize);
    }
  }

  checkCategory(category: Category) {
    this.categoryChecked[category.id] = !this.categoryChecked[category.id];
    this.updateCategory();
    this.categoryAll = this.categories.every(c => this.categoryChecked[c.id]);
    let listCategory = this.categories.filter(c => this.categoryChecked[c.id]).map(c => c.id);
    let page = this._blog.page;
    this._blog.getPosts(listCategory.length == 0 ? -1 : listCategory, this.sort ? 1 : 2, page.pageIndex + 1, page.pageSize);
  }

  changeSort() {
    if (this.sort == 1) {
      this.sort = 2;
    } else {
      this.sort = 1;
    }
    this.textSort = this.sort == 1 ? 'Mới nhất' : 'Cũ nhất';
    this.updateCategory();
    this.categoryAll = this.categories.every(c => this.categoryChecked[c.id]);
    let listCategory = this.categories.filter(c => this.categoryChecked[c.id]).map(c => c.id);
    let page = this._blog.page;
    this._blog.getPosts(listCategory.length == 0 ? -1 : listCategory, this.sort, page.pageIndex + 1, page.pageSize);
  }

  updateCategory() {
    let listCategory: number | number[] = this.categories.filter(c => this.categoryChecked[c.id]).map(c => c.id);
    listCategory = listCategory.length == 0 ? -1 : listCategory
    // @ts-ignore
    this.onChange.emit({category: listCategory, sort: this.sort});
  }
}
