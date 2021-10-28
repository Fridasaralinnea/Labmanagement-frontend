import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

// import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
// import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
// import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ UserService ]
})
export class UserComponent implements OnInit {

    @Input() newRole;

    submitted = false;
    loading = false;
    data: any;
    users: any;
    editForm: FormGroup;
    closeResult: string;
    userEmail: string;
    role: string;
    modalUser: string;
    roles: ["student", "admin", "superuser"];

    ROOT_URL = "http://localhost:8833/users";

    constructor(
        // private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: UserService) {
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
            newRole: ["", Validators.required]
        });
    }

    get f() { return this.editForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.editForm.invalid) {
            return;
        }

        console.log("bla");

        // console.log(this.modalUser);
        // console.log("New role: ", this.f.role.value);

        this.loading = true;

    }

    // onCreate() {
    //     this.dialog.open(UserComponent, {
    //         height: '400px',
    //         width: '600px'
    //     });
    // }

    // openDialog(email) {
    //     const dialogRef = this.dialog.open(UserComponent, {
    //         width: '250px',
    //         data: {email: email, role: this.role}
    //     });
    //
    //     dialogRef.afterClosed().subscribe(result => {
    //         console.log('The dialog was closed');
    //         this.role = result;
    //     });
    // }

    // open() {
    //     const modalRef = this.modalService.open(NgbdModalContent);
    //     modalRef.componentInstance.name = 'World';
    // }

    // open(content) {
    //     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }
}

// @Component({
//     selector: 'app-user',
//     templateUrl: '../user/user.component.html',
//     styleUrls: ['../user/user.component.css']
// })
//
// export class UserComponent {
//
//     constructor(
//         public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//         @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
//
//         onNoClick(): void {
//             this.dialogRef.close();
//         }
//
// }
