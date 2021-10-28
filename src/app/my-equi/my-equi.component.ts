import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { HistoryService } from '../history/history.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './my-equi.component.html',
    styleUrls: ['./my-equi.component.css'],
    providers: [
        HttpParams,
        LoginService,
        HistoryService
    ]
})
export class MyequiComponent implements OnInit {

    myequiForm: FormGroup;
    submitted = false;
    loading = false;
    bookings: any;
    data: any;
    user: any;
    params: any;
    dateToday: any;
    userRole: any;
    // form: any;
    action_pickup = "Equipment picked up";
    action_return = "Equipment returned";
    amount = 1;

    ROOT_URL = "http://localhost:8833/mybookings";

    constructor(
        private http: HttpClient,
        private httpParams: HttpParams,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private historyService: HistoryService,
        private accountService: LoginService) {
            this.userRole = this.accountService.getUserRole();
            if (this.userRole != "student") {
                alert("Valid user needed to view this page");
                this.accountService.logout();
                this.router.navigate(['/login'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
            }
            this.user = this.accountService.getUserEmail();
            console.log("This user: ", this.user);
            this.getBookings();
            this.dateToday = this.getDate();
        }

    ngOnInit() {
    }

    async getBookings() {
        this.params = new HttpParams().set("email",this.user);
        await this.http.get(this.ROOT_URL, {params: this.params}).toPromise().then(data => {
            this.data = data;
            console.log("data: ", this.data);
            this.bookings = this.data.data;
            console.log("Bookings: ", this.bookings);
            // return this.data.data;
        });
    }

    getDate() {
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var dateValue = year + "-" + month + "-" + day;
        return dateValue;
    }


    pickupEquipment(equipment, bookingId) {
        if(confirm("Are you sure you want to pick up this equipment?")) {
            console.log("PICKUP BOKING!!!");
            var status = "pickedup";
            this.http.post(this.ROOT_URL + "/pickup", {id: bookingId, status: status})
            .pipe(first())
            .subscribe({
                next: async () => {
                    console.log("Pick up succesfull.");
                    alert("Pick up succesfull");
                    await this.historyService.addHistory(equipment, this.amount, this.user, this.action_pickup).subscribe({
                        next: () => {
                            console.log("History added succesfully.");
                            window.location.reload();
                        },
                        error: error => {
                            console.log("History not added");
                            console.log(error);
                            alert("History not added");
                            this.loading = false;
                        }
                    });
                    // this.router.navigate(['/myequi'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                    // window.location.reload();
                },
                error: error => {
                    console.log("Pick up not succesfull.");
                    alert("Pick up not succesfull");
                    this.loading = false;
                }
            });
        }
    }


    returnEquipment(equipment, bookingId) {
        if(confirm("Are you sure you want to return this equipment?")) {
            console.log("RETURN!!!");
            this.http.post(this.ROOT_URL + "/return", {id: bookingId})
            .pipe(first())
            .subscribe({
                next: async () => {
                    console.log("Return succesfull.");
                    alert("Return succesfull");
                    await this.historyService.addHistory(equipment, this.amount, this.user, this.action_return).subscribe({
                        next: () => {
                            console.log("History added succesfully.");
                            window.location.reload();
                        },
                        error: error => {
                            console.log("History not added");
                            console.log(error);
                            alert("History not added");
                            this.loading = false;
                        }
                    });
                    // this.router.navigate(['/myequi'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                    // window.location.reload();
                },
                error: error => {
                    console.log("Return not succesfull.");
                    alert("Return not succesfull");
                    this.loading = false;
                }
            });
        }
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
    }
}
