import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class MyequiService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    ROOT_URL = "";

    register(email, password) {
            console.log("Register new user with email: ", email);
            return this.http.post(this.ROOT_URL, {email: email, password: password});
        }
}
