import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AdminequiService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    ROOT_URL = "http://localhost:8833/del";

    delete(id) {
        console.log("Delete equipment with id: ", id);
        return this.http.post(this.ROOT_URL, {id: id});
        // return this.http.post(this.ROOT_URL, {name: name, amount: amount});
    }
}
