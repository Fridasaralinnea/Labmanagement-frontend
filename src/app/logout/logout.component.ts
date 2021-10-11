import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Login } from "./login";
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";
import { first } from "rxjs/operators";
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {

    logoutForm: FormGroup;
    submitted = false;
    loading = false;
    isLoggedIn: boolean;
    // form: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: LoginService) {
            if(confirm("Are you sure you want to log out?")) {
                this.accountService.logout();
            }
        }

    ngOnInit() {
    }

    onSubmit() {
        this.submitted = true;
        this.loading = true;
        this.accountService.logout();

        // if(confirm("Are you sure you want to log out?")) {
        //     this.accountService.logout();
        // }
    }

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }
}
