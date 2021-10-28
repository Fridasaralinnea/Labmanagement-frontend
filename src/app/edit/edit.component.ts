import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EditService } from './edit.service';
import { LoginService } from '../login/login.service';
import { HistoryService } from '../history/history.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [
        EditService,
        LoginService,
        HistoryService,
        HttpParams
    ]
})

export class EditComponent implements OnInit, OnDestroy {
    @Input()
    name: string;
    amount: any;

    private editSubscription: Subscription;

    editForm: FormGroup;
    submitted = false;
    data: any;
    equipment: any;
    isLoggedIn: boolean;
    id: any;
    loading = false;
    params: any;
    user: string;
    userRole: any;
    action = "Edited equipment";

    ROOT_URL = "http://localhost:8833/edit";

    constructor(
        private http: HttpClient,
        private httpParams: HttpParams,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private editService: EditService,
        private historyService: HistoryService,
        private accountService: LoginService) {
            this.userRole = this.accountService.getUserRole();
            if (this.userRole != "admin" && this.userRole != "superuser") {
                alert("Valid user needed to view this page");
                this.accountService.logout();
                this.router.navigate(['/login'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
            }
            this.user = this.accountService.getUserEmail();
            console.log(this.user);
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
        }

    ngAfterContentChecked() {
        this.isLoggedIn = this.accountService.isLoggedIn();
    }

    ngOnInit(): void {
        this.editForm = this.formBuilder.group({
            name: ["", Validators.required],
            amount: ["",
                Validators.required
                // Validators.pattern("/^[0-9]+(\.?[0-9]+)?$/")
            ]
            // picture: ["", Validators.required]
        });
    }

    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;
        // console.log("new info: ", this.infotext);

        if (!this.isLoggedIn) {
            return alert("Error, valid user needed to edit.");
        }

        console.log(this.f.name.value);
        console.log(this.f.amount.value);

        this.editService.edit(this.id, this.f.name.value, this.f.amount.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Edit succesfull");
                    this.historyService.addHistory(this.id, this.f.amount.value, this.user, this.action).subscribe({
                        next: () => {
                            console.log("History added succesfully.");
                            // this.getEquipment();
                            this.router.navigate(['/admin'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                        },
                        error: error => {
                            console.log("History not added");
                            console.log(error);
                            alert("History not added");
                            this.loading = false;
                        }
                    });
                    this.router.navigate(['/admin'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                },
                error: error => {
                    alert("Edit not succesfull.");
                }
            });
    }

    ngOnDestroy() {
        // this.editSubscription.unsubscribe();
    }
}
