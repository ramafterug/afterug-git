import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TestComponent } from './test/test.component';
import { TestListComponent } from './test/testlist.component';

import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { AuthGuard } from './_guards/index';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  { path: 'Test/User/:userID', component: TestListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  //declarations: [  TestListComponent],
})
export class AppRoutingModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/