import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/// <reference path = "../models.ts" />
import * as afterUGExtended from "../models";


import { AlertService, AuthenticationService } from '../_services/index';
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
  returnUrl: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
           this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

     login() {
        this.loading = true;
        this.authenticationService.login(this.model.UserNameOrEmailAddress, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                      this.alertService.error(this.error);
                    this.loading = false;
                }
            });
    }
}
