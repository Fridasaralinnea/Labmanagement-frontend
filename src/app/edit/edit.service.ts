import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EditService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    onReportUpdateEvent = new EventEmitter();

    ROOT_URL = "http://localhost:8833/edit";

    edit(id: any, name: string, amount: any) {
        console.log("edit equipment with id: ", id, " name: ", name, " amount: ", amount);
        return this.http.post(this.ROOT_URL, {id: id, name: name, amount: amount});
    }
}
