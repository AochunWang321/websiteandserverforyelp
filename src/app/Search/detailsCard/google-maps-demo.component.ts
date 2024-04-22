import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'google-maps-demo',
  templateUrl: './google-maps-demo.component.html',
})
export class GoogleMapsDemoComponent {
  apiLoaded: Observable<boolean>;

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCDJHOpT6euCZH1Z0dcghjxEigUxUj8oII', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}