import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyequiService } from './my-equi.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './my-equi.component.html',
    styleUrls: ['./my-equi.component.css'],
    providers: [ MyequiService ]
})
export class MyequiComponent implements OnInit {

    myequiForm: FormGroup;
    submitted = false;
    loading = false;
    equipment: any;
    data: any;
    // form: any;

    ROOT_URL = "http://localhost:8833/admin";

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: MyequiService) {
            this.getEquipment();
        }

    ngOnInit() {
        // this.myequiForm = this.formBuilder.group({
        //     email: ["",
        //         Validators.required,
        //         Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        //     ],
        //     password: ["", Validators.required]
        // });
    }

    getEquipment() {
        this.http.get(this.ROOT_URL).toPromise().then(data => {
            // console.log("data: ", data.data);
            this.data = data;
            console.log("data: ", data);
            this.equipment = this.data.data;
            console.log("Equipment: ", this.equipment);
        });
    }

    get f() { return this.myequiForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.myequiForm.invalid) {
            return;
        }

        // console.log(this.f.email.value);
        // console.log(this.f.password.value);

        this.loading = true;

        this.accountService.register(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Registration succesfull.")
                    this.router.navigate(['/login'], { relativeTo: this.route});
                },
                error: error => {
                    console.log("Registration not succesfull.");
                    alert("Registration not succesfull");
                    this.loading = false;
                }
            });
    }
}
