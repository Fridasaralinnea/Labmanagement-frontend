import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [ RegisterService ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    submitted = false;
    loading = false;
    // form: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: RegisterService) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ["",
                Validators.required,
                Validators.pattern("/^[A-Za-z0-9._%+-]+@(bth\.com|student\.bth\.com)$/")
            ],
            password: ["", Validators.required]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // if (this.f.email.value != "/^[A-Za-z0-9._%+-]+@bth.com$/" || this.f.email.value != "/^[A-Za-z0-9._%+-]+@student.bth.com)$/") {
        //     return alert("Wrong email format.");
        // }

        if (this.registerForm.invalid) {
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
