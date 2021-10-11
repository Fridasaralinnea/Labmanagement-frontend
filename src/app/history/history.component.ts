import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoryService } from './history.service';
import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css'],
    providers: [
        HistoryService,
        LoginService,
        HttpParams
    ]
})
export class HistoryComponent implements OnInit {

    // historyForm: FormGroup;
    submitted = false;
    loading = false;
    id: any;
    data: any;
    history: any;
    equipment: any;
    params: any;
    // form: any;

    ROOT_URL = "http://localhost:8833/history";

    constructor(
        private http: HttpClient,
        private httpParams: HttpParams,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private historyService: HistoryService) {
            this.route.queryParams
                .subscribe(params => {
                    console.log("params: ", params); // { orderby: "price" }
                    this.id = params.id;
                    console.log("id: ", this.id); // price
                });
            this.params = new HttpParams().set("id",this.id);
            this.http.get(this.ROOT_URL, {params: this.params}).toPromise().then(data => {
                this.data = data;
                console.log("data: ", this.data);
                this.equipment = this.data.data;
                console.log("Equipment: ", this.equipment);
            });
            this.http.get(this.ROOT_URL + "/history", {params: this.params}).toPromise().then(data => {
                this.history = data;
                console.log("history: ", this.history);
                // this.equipment = this.data.data;
                // console.log("Equipment: ", this.equipment);
            });
        }

    ngOnInit() {
        // this.historyForm = this.formBuilder.group({
        //     email: ["",
        //         Validators.required,
        //         Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        //     ],
        //     password: ["", Validators.required]
        // });
    }

    // get f() { return this.historyForm.controls; }

    onSubmit() {
        this.submitted = true;

        // console.log(this.f.email.value);
        // console.log(this.f.password.value);

        this.loading = true;
        //
        // this.accountService.register(this.f.email.value, this.f.password.value)
        //     .pipe(first())
        //     .subscribe({
        //         next: () => {
        //             console.log("Registration succesfull.")
        //             this.router.navigate(['/login'], { relativeTo: this.route});
        //         },
        //         error: error => {
        //             console.log("Registration not succesfull.");
        //             alert("Registration not succesfull");
        //             this.loading = false;
        //         }
        //     });
    }
}
