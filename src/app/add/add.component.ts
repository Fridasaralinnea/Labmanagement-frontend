import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { LoginService } from '../login/login.service';
import { HistoryService } from '../history/history.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css'],
    providers: [
        AddService,
        LoginService,
        HistoryService
    ]
})
export class AddComponent implements OnInit {

    addForm: FormGroup;
    submitted = false;
    loading = false;
    userRole: any;
    action = "Equipment created";

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private addService: AddService,
        private historyService: HistoryService,
        private accountService: LoginService) {
            this.userRole = this.accountService.getUserRole();
            if (this.userRole != "admin" && this.userRole != "superuser") {
                alert("Valid user needed to view this page");
                this.accountService.logout();
                this.router.navigate(['/login'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
            }
        }

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
                    // this.historyService.addHistory(this.id, this.f.amount.value, this.user, this.action).subscribe({
                    //     next: () => {
                    //         console.log("History added succesfully.");
                    //         // this.getEquipment();
                    //         this.router.navigate(['/admin'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                    //     },
                    //     error: error => {
                    //         console.log("History not added");
                    //         alert("History not added");
                    //         this.loading = false;
                    //     }
                    // });
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
