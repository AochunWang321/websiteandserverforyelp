import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './Search/Search.component';
import { MyBookingsComponent } from './MyBookings/MyBookings.component';
import { PageNotFoundComponentComponent } from './PageNotFoundComponent/PageNotFoundComponent.component';
const routes: Routes = [
  { path: '', redirectTo: "/Search", pathMatch: 'full' },
  { path: 'Search', component: SearchComponent },
  { path: 'booking', component: MyBookingsComponent },
  /* 页面不存在的路由 */
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
