import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import moment from 'moment';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    userRole: string;
    userEmail: string;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    ROOT_URL = "http://localhost:8833/login";

    login(email: string, password: string) {
        console.log("login with email: ", email, " and password: ", password);
        this.userEmail = email;
        localStorage.setItem('user_email', email);
        return this.http.post(this.ROOT_URL, {email: email, password: password})
            .pipe(map(res => this.setSession(res)),
            shareReplay());
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        this.userRole = authResult.user.role;
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('user_role', authResult.user.role);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_role');
        console.log("Succesfully logged out");
        this.userRole = null;
        this.userEmail = null;
        this.router.navigate(['/login']);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    public getUserRole() {
        const role = localStorage.getItem("user_role");
        console.log("User role: ", role);
        return role;
    }

    public getUserEmail() {
        const email = localStorage.getItem("user_email");
        console.log("User email: ", email);
        return email;
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
