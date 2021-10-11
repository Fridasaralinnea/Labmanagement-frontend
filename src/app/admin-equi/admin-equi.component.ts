import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminequiService } from './admin-equi.service';
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './admin-equi.component.html',
    styleUrls: ['./admin-equi.component.css'],
    providers: [ AdminequiService ]
})
export class AdminequiComponent implements OnInit {

    // equipmentForm: FormGroup;
    submitted = false;
    loading = false;
    equipment: any;
    data: any;

    ROOT_URL = "http://localhost:8833/admin";
    DELETE_URL = "http://localhost:8833/del";

    constructor(
        // private formBuilder: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private adminService: AdminequiService) {
            this.getEquipment();
            // console.log("Equipment: ", this.equipment);
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

    ngOnInit() {
        // console.log("Equipment: ", this.equipment);
        // this.equipmentForm = this.formBuilder.group({
        //     "id": ""
        // });
    }

    // get f() { return this.equipmentForm.controls; }

    onSubmit(id) {
        console.log("id:", id);
        console.log(typeof id);
        if(confirm("Are you sure you want to delete the entire stock of equipment "+id)) {
            this.adminService.delete(id).subscribe({
                next: () => {
                    console.log("Equipment deleted succesfully.");
                    this.getEquipment();
                    this.router.navigate(['/admin'], { relativeTo: this.route, queryParamsHandling: 'preserve'});
                },
                error: error => {
                    console.log("Equipment not deleted");
                    alert("Equipment not deleted");
                    this.loading = false;
                }
            });
            // console.log("Delete equipment with id: ", id);
            // this.http.post(this.DELETE_URL, {id: id});
        }
        // this.getEquipment();
    }
}
