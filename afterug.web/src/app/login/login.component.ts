import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    defaultUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';//this.defaultUrl;//'/Test/User/USERID/Mode/MODE/QType/QTYPE';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.UserNameOrEmailAddress, this.model.Password)
            .subscribe(
            data => {
                this.buildDefaultUrl();
                this.router.navigate([this.defaultUrl]);
            },
            error => {
                this.alertService.error('Username or password is incorrect');
                this.loading = false;
            });
    }

    buildDefaultUrl() {
        
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var currUserId = currentUser.id;
        this.defaultUrl = '/Test/User/' + currUserId + '/Mode/1/QType/9';
    }
}
