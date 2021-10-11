import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AddService {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {}

    ROOT_URL = "http://localhost:8833/add";

    add(name, amount) {
        console.log("Add new equipment: ", name, " with amount: ", amount);
        return this.http.post(this.ROOT_URL, {name: name, amount: amount});
    }
}
