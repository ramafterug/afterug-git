import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    ServerMessage: string;
    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.ServerMessage = data.toString()
                if (this.ServerMessage == "Success") {
                    this.loading = false;
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                    
                } else if(this.ServerMessage == "User Already Exists"){
                    this.alertService.error(this.ServerMessage);
                    alert('User already exists');
                    this.loading = false;
                }

            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
