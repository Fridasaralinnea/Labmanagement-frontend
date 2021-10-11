
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HistoryService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    HISTORY_URL = "http://localhost:8833/history";


    addHistory(id: any, amount: any, user: string, action: string) {
        console.log("Add history");
        return this.http.post(this.HISTORY_URL, {id: id, amount: amount, user: user, action: action});
    }
}
