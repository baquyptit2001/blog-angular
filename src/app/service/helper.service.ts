import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private cookieService: CookieService) {
  }

  getAvatarName = (name: string): string => {
    let words = name.split(' ');
    if (words.length > 1) {
      return words[0].charAt(0) + words[words.length - 1].charAt(0);
    }
    return name.charAt(0).toUpperCase();
  }

  longName = (text: string, length: number = 50): string => {
    if (text == null) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    text = text.substring(0, length);
    let last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
  }

  isLogin = (): boolean => {
    return this.cookieService.check('user.id');
  }

  setHeader = (): HttpHeaders => {
    let token = this.cookieService.get('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
  }

  getUser = (): User => {
    let user: User = new User();
    user.name = this.cookieService.get('user.name');
    user.email = this.cookieService.get('user.email');
    user.id = this.cookieService.get('user.id');
    user.live = this.cookieService.get('user.live');
    user.address = this.cookieService.get('user.address');
    user.phone_number = this.cookieService.get('user.phone_number');
    user.birthday = new Date(this.cookieService.get('user.birthday'));
    return user;
  }

  clearUser = (): void => {
    this.cookieService.delete('access_token');
    this.cookieService.delete('user.name');
    this.cookieService.delete('user.email');
    this.cookieService.delete('user.id');
    this.cookieService.delete('user.live');
    this.cookieService.delete('user.address');
    this.cookieService.delete('user.phone_number');
    this.cookieService.delete('user.birthday');
  }
}
