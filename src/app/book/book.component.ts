import { Component, Injectable, OnInit, Inject, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './book.service';
import { LoginService } from '../login/login.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
// import { Subject } from "rxjs";
// import { map } from "rxjs/operators";

@Component({
    selector: 'app-register',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.css'],
    providers: [
         BookService,
         HttpParams,
         NgbInputDatepickerConfig,
         MatDatepickerModule
     ]
})
export class BookComponent implements OnInit {

    @Input()
    bookDate;
    mount;

    model: NgbDateStruct;
    bookForm: FormGroup;
    submitted = false;
    loading = false;
    equipment: any;
    data: any;
    user: any;
    params: any;
    closeResult: string;
    modalUser: string;

    ROOT_URL = "http://localhost:8833/admin";

    constructor(
        private http: HttpClient,
        private httpParams: HttpParams,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private bookService: BookService,
        private accountService: LoginService,
        config: NgbInputDatepickerConfig,
        calendar: NgbCalendar) {
            this.user = this.accountService.getUserEmail();
            console.log(this.user);
            this.route.queryParams
                .subscribe(params => {
                    console.log("params: ", params); // { orderby: "price" }
                    this.equipment = params.equipment;
                    console.log("equipment: ", this.equipment); // price
                });
            // customize default values of datepickers used by this component tree
            config.minDate = {year: 1900, month: 1, day: 1};
            config.maxDate = {year: 2099, month: 12, day: 31};
            // days that don't belong to current month are not visible
            config.outsideDays = 'hidden';
            // weekends are disabled
            config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 6;
            // setting datepicker popup to close only on click outside
            config.autoClose = 'outside';
            // setting datepicker popup to open above the input
            config.placement = ['top-left', 'top-right'];
            this.params = new HttpParams().set("equipment",this.equipment);
            // this.http.get(this.ROOT_URL, {params: this.params}).toPromise().then(data => {
            //     this.data = data;
            //     console.log("data: ", this.data);
            //     this.equipment = this.data.data;
            //     console.log("Equipment: ", this.equipment);
            // });
        }

    ngOnInit() {
        this.bookForm = this.formBuilder.group({
            amount: ["", Validators.required],
            bookDate: [new Date()]
        });
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

    get f() { return this.bookForm.controls; }

    onSubmit() {
        this.submitted = true;

        // if (this.bookForm.invalid) {
        //     return;
        // }

        if(confirm("Are you sure you want to book this equipment?")) {
            // this.bookService.book();
            console.log("book");
        }

        this.loading = true;

    }
}
