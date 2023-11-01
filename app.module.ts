import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from "@angular/fire/compat";
import { FirestoreModule } from "@angular/fire/firestore";
import { FunctionsModule, getFunctions } from "@angular/fire/functions";
import { AuthModule } from "@angular/fire/auth";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Environments } from './environments';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './parts/home/home.component';
import { RegisterComponent } from './parts/register/register.component';
import { LoginComponent } from './parts/login/login.component';
import { NavComponent } from './parts/nav/nav.component';
import { UsersComponent } from './parts/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(Environments.firebaseConfig),
    FirestoreModule,
    FunctionsModule,
    AuthModule,
    AngularFireAuthModule,
    
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
