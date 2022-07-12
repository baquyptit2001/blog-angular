import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SetCookieService {

  constructor(private cookie: CookieService) { }

  setCookieObject(value: Object, prefix: string = '', expires?: number|Date) {
    if (prefix !== '') {
      prefix = prefix + '.'
    }
    for (const [key, val] of Object.entries(value)) {
      this.cookie.set(prefix + key, val, {expires: expires});
    }
  }
}
