import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
// import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './stud-equi.component.html',
    styleUrls: ['./stud-equi.component.css'],
    providers: [
        LoginService,
        HttpParams
    ]
})
export class StudequiComponent implements OnInit {

    @Input() bookDate;

    bookForm: FormGroup;
    submitted = false;
    loading = false;
    equipment: any;
    bookings: any;
    data: any;
    editForm: any;
    params: any;
    user: any;
    userRole: any;
    activeEquipment: any;
    equipmentAmount: any;
    // form: any;
    closeResult: string;
    modalUser: string;

    ROOT_URL = "http://localhost:8833/admin";
    BOOKINGS_URL = "http://localhost:8833/book";

    constructor(
        private http: HttpClient,
        private httpParams: HttpParams,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: LoginService) {
            this.userRole = this.accountService.getUserRole();
            if (this.userRole != "student") {
                alert("Valid user needed to view this page");
                this.accountService.logout();
                this.router.navigate(['/login'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
            }
            this.user = this.accountService.getUserEmail();
            console.log("This user: ", this.user);
            this.getAllEquipment();
        }

    ngOnInit() {
        this.bookForm = this.formBuilder.group({
            bookDate: ["", Validators.required]
        });
    }


    getAllEquipment() {
        this.http.get(this.ROOT_URL).toPromise().then(data => {
            // console.log("data: ", data.data);
            this.data = data;
            console.log("data: ", data);
            this.equipment = this.data.data;
            console.log("Equipment: ", this.equipment);
        });
    }


    async getEquipment(id) {
        this.params = new HttpParams().set("id",id);
        await this.http.get(this.BOOKINGS_URL + "/equipment", {params: this.params}).toPromise().then(data => {
            // console.log("data: ", data.data);
            this.activeEquipment = data;
            console.log("Active Equipment: ", data);
            // this.equipmentAmount = data.amount;
            // console.log("Amount: ", data.amount);
            console.log("Amount: ", this.activeEquipment.amount);
            this.equipmentAmount = this.activeEquipment.amount;
            // return this.activeEquipment.amount;
        });
        return this.equipmentAmount;
    }


    async getBookings(user, equipment, rent_date) {
        console.log("GET BOKINGS!!!");
        this.params = new HttpParams().set("email",user).set("id",equipment).set("rent_date",rent_date);
        await this.http.get(this.BOOKINGS_URL, {params: this.params}).toPromise().then(data => {
            this.data = data;
            console.log("data: ", this.data);
            this.bookings = this.data.data;
            console.log("Bookings: ", this.bookings);
            // return this.data.data;
        });
        return this.bookings;
    }


    addBooking(user, id, equipment, rent_date) {
        console.log("ADD BOKING!!!");
        var status = "booked";
        this.http.post(this.BOOKINGS_URL, {user: user, id: id, equipment: equipment, rent_date: rent_date, status: status})
        .pipe(first())
        .subscribe({
            next: () => {
                console.log("Booking succesfull.");
                alert("Booking succesfull");
                // this.router.navigate(['/login'], { relativeTo: this.route});
            },
            error: error => {
                console.log("Booking not succesfull.");
                alert("Booking not succesfull");
                this.loading = false;
            }
        });
    }


    get f() { return this.bookForm.controls; }

    async onSubmit(id, name) {
        this.submitted = true;
        // var rent_date = this.f.bookDate.value;

        if (this.bookForm.invalid) {
            return;
        }

        console.log("Equipment: ", id);
        console.log("Equipment name: ", name);
        console.log(this.f.bookDate.value);
        // console.log(rent_date);

        var year = this.f.bookDate.value.getFullYear();
        var month = this.f.bookDate.value.getMonth() + 1;
        var day = this.f.bookDate.value.getDate();
        var dateValue = year + "-" + month + "-" + day;

        console.log("Date: ", dateValue);

        if(confirm("Are you sure you want to book " + name + " for " + dateValue + "?")) {
            var bookings = await this.getBookings(this.user, id, dateValue);
            var equipmentAmount = await this.getEquipment(id);
            console.log("BOOK!");
            console.log("Bookings: ", bookings);
            // console.log("Bookings amount", bookings.length);
            console.log("Equipment Amount: ", equipmentAmount);
            if (this.bookings) {
                console.log("IN IF");
                console.log("Amount bookings: ", this.bookings.length);
                var amount_bookings = this.bookings.length;
                if (amount_bookings >= this.equipmentAmount) {
                    console.log("None available");
                    return alert("Equipment not available this date, try another date.");
                } else {
                    this.addBooking(this.user, id, name, dateValue);
                    console.log("Booking confirmed");
                }
            } else {
                this.addBooking(this.user, id, name, dateValue);
                console.log("Booking confirmed");
            }
        }

        this.loading = true;

    }
}
