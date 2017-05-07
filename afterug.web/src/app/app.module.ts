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
import { AuthenticationService, UserService } from './_services/index';
// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TestListComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    TestQuestionService
    // providers used to create fake backend
    // fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions
  ],
  exports: [TestListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
