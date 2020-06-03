import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { UserPersonalFormComponent } from './user/user-personal-form/user-personal-form.component';
import { UserProfessionalFormComponent } from './user/user-professional-form/user-professional-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserPersonalFormComponent,
    UserProfessionalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
