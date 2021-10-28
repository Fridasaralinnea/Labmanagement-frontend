import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

import { TemplateRef, Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
// MatFormFieldControl
import { FormControl, NgForm } from '@angular/forms';
// import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
    providers: [
        { provide: MatFormFieldControl, useExisting: UsersComponent}
    ]
})
export class UsersComponent implements OnInit {
    @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
    @ViewChild('userForm') userForm: any;
    dialogRef: any;
    userModel: any = {};
    //name = 'Angular';

    @Input() modalRole;

    submitted = false;
    loading = false;
    data: any;
    users: any;
    editForm: FormGroup;
    closeResult: string;
    userEmail: string;
    userRole: any;
    role: string;
    modalUser: string;
    roles: ["student", "admin", "superuser"];

    ROOT_URL = "http://localhost:8833/users";

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: LoginService) {
            this.userRole = this.accountService.getUserRole();
            if (this.userRole != "superuser") {
                alert("Valid user needed to view this page");
                this.accountService.logout();
                this.router.navigate(['/login'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
            }
            this.http.get(this.ROOT_URL).toPromise().then(data => {
                // console.log("data: ", data.data);
                this.data = data;
                console.log("data: ", data);
                this.users = this.data.data;
                console.log("Users: ", this.users);
            });
        }

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            modalRole: ["", Validators.required]
        });
    }

    get f() { return this.editForm.controls; }

    openDialog(user) {
        console.log("Dialog opened");
        this.modalUser = user;
        this.dialogRef = this.dialog.open(this.callAPIDialog);
        this.dialogRef.afterClosed().subscribe(result => {
            console.log("Dialog closed");
            // console.log(this.editForm);
            if (result !== undefined) {
                if (result !== 'no') {
                    const enabled = "Y"
                    console.log(result);
                } else if (result === 'no') {
                    console.log('User clicked no.');
                }
            }
        })
    }

    onSend(){
        // let data = form.value;
        console.log(this.f.modalRole.value);
        console.log('form submitted');
        console.log(this.modalUser);

        this.updateUserRole(this.modalUser, this.f.modalRole.value);

        this.dialogRef.close();
    }


    updateUserRole(user, role) {
        if(confirm("Are you sure you want to change this user role?")) {
            console.log("Edit user role");
            this.http.post(this.ROOT_URL, {user: user, role: role})
            .pipe(first())
            .subscribe({
                next: () => {
                    console.log("Edit succesfull.");
                    alert("Edit succesfull");
                    // this.router.navigate(['/myequi'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                    window.location.reload();
                },
                error: error => {
                    console.log("Edit not succesfull.");
                    alert("Edit not succesfull");
                    this.loading = false;
                }
            });
        }
    }


    onSubmit() {
        this.submitted = true;

        if (this.editForm.invalid) {
            return;
        }

        console.log(this.modalUser);
        // console.log("New role: ", this.f.role.value);

        this.loading = true;

    }
}
