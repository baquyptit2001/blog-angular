import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
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

   setHeader = (token: string): Headers => {
     return new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
   }
}
