import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    providers: [ AddService ]
})
export class AddComponent implements OnInit {

    addForm: FormGroup;
    submitted = false;
    loading = false;
    // form: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private addService: AddService) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            name: ["", Validators.required],
            amount: ["",
                Validators.required
                // Validators.pattern("/^[0-9]+(\.?[0-9]+)?$/")
            ]
            // picture: ["", Validators.required]
        });
    }

    get f() { return this.addForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

        this.loading = true;

        this.addService.add(this.f.name.value, this.f.amount.value)
            .subscribe({
                next: () => {
                    console.log("Equipment added succesfully.");
                    this.router.navigate(['/admin'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                },
                error: error => {
                    console.log("Equipment not added");
                    alert("Equipment not added");
                    this.loading = false;
                }
            });
    }
}
