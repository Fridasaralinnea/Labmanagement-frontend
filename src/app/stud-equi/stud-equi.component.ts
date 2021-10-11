import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudequiService } from './stud-equi.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './stud-equi.component.html',
    styleUrls: ['./stud-equi.component.css'],
    providers: [ StudequiService ]
})
export class StudequiComponent implements OnInit {

    studequiForm: FormGroup;
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
        private accountService: StudequiService) {
            this.getEquipment();
        }

    ngOnInit() {
        // this.studequiForm = this.formBuilder.group({
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

    get f() { return this.studequiForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.studequiForm.invalid) {
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
