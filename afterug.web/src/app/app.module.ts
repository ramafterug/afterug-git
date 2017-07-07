import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { TestListComponent } from './test/testlist.component';
import { TestQuestionService } from './test/test-questions.service';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService,AlertService } from './_services/index';
// used to create fake backend

import { RegisterComponent } from './register/index';

import { SimpleTimer } from 'ng2-simple-timer';
import {AppConfig} from './app.config';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestListComponent,
    LoginComponent,
    HomeComponent,
     RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    TestQuestionService,
    SimpleTimer,
    AppConfig
    // providers used to create fake backend
    // fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions
  ],
  exports: [TestListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
