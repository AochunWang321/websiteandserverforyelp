import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'my-app';
  constructor(private Routes: Router) {
    let url = window.location.href;
    console.log(url)
    console.log(Routes)

  }
}
