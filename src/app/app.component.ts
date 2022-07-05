import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-angular';

  constructor() {
    console.log('AppComponent constructor');
  }

  onBack() {
    console.log('AppComponent onBack');
  }
}
