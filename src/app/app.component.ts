import { Component } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { LoginService } from './login/login.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Labmanagement';

    isLoggedIn: boolean;
    userRole: string;
    isSuperUser = false;
    isAdmin = false;
    isStudent = false;

    constructor(
        private accountService: LoginService) {}

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
        this.userRole = this.accountService.getUserRole();
        if (this.userRole === "superuser") {
            this.isSuperUser = true;
        } else {
            this.isSuperUser = false;
        }
        if (this.userRole === "admin") {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
        if (this.userRole === "student") {
            this.isStudent = true;
        } else {
            this.isStudent = false;
        }
    }
}
