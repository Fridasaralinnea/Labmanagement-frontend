import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [ UsersService ]
})
export class UsersComponent implements OnInit {

    submitted = false;
    loading = false;
    data: any;
    users: any;
    // form: any;

    ROOT_URL = "http://localhost:8833/users";

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UsersService) {
            this.http.get(this.ROOT_URL).toPromise().then(data => {
                // console.log("data: ", data.data);
                this.data = data;
                console.log("data: ", data);
                this.users = this.data.data;
                console.log("Users: ", this.users);
            });
        }

    ngOnInit() {

    }

    onSubmit() {
    }
}
