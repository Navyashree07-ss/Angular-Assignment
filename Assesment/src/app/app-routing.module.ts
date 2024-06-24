import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMainDetailsComponent } from './profile-main-details/profile-main-details.component';
import { FiltersComponent } from './filters/filters.component';

const routes: Routes = [
  //{ path: '', component: FiltersComponent },
  //{ path: 'profile-details', component: ProfileMainDetailsComponent },
  // other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
