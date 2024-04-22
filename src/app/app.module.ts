import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './Search/Search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* search子组件 */
import { MyBookingsComponent } from './MyBookings/MyBookings.component';
import { SearchformComponent } from './Search/searchform/searchform.component';
/* ==== */
// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
/* ==== */
import { ResultstableComponent } from './Search/resultstable/resultstable.component';
import { ReservationFormComponent } from './Search/reservationForm/reservationForm.component';
import { DetailsCardComponent } from './Search/detailsCard/detailsCard.component';
/* ============ */
import { MatTabsModule } from '@angular/material/tabs';
/* ============ */
/* ============ */
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    MyBookingsComponent,
    SearchformComponent,
    ResultstableComponent,
    ReservationFormComponent,
    DetailsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTabsModule,
    NgbModule,
    GoogleMapsModule,

  ],
  providers: [
    // hash路由
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },],
  bootstrap: [AppComponent]
})
export class AppModule { }
