import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileMainDetailsComponent } from './profile-main-details/profile-main-details.component';
import { FiltersComponent } from './filters/filters.component';
import { DropDownListModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule, CheckBoxModule } from '@progress/kendo-angular-inputs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {GridModule} from "@progress/kendo-angular-grid";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    ProfileMainDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropDownsModule,
    LabelModule,
    InputsModule,
    FormsModule,
    DropDownListModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    CommonModule,
    CheckBoxModule,
    RouterModule.forRoot([
      { path: '', component: FiltersComponent },
      { path: 'profile-details', component: ProfileMainDetailsComponent }
    ])

  ],
  exports: [
    FiltersComponent,
    ProfileMainDetailsComponent,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
