import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {DemoMaterialModule} from './material-module';
// import { MaterialModule } from "./material/material.module";


// Custom services
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { AdminequiService } from './admin-equi/admin-equi.service';


// Custom components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { AdminequiComponent } from './admin-equi/admin-equi.component';
import { StudequiComponent } from './stud-equi/stud-equi.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { HistoryComponent } from './history/history.component';
import { UsersComponent } from './users/users.component';
// import { BookComponent } from './book/book.component';
import { MyequiComponent } from './my-equi/my-equi.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminequiComponent, pathMatch: 'full' },
    { path: 'student', component: StudequiComponent, pathMatch: 'full' },
    { path: 'history', component: HistoryComponent, pathMatch: 'full' },
    { path: 'edit', component: EditComponent, pathMatch: 'full' },
    { path: 'add', component: AddComponent, pathMatch: 'full' },
    { path: 'users', component: UsersComponent, pathMatch: 'full' },
    // { path: 'book', component: BookComponent, pathMatch: 'full' },
    { path: 'myequi', component: MyequiComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AdminequiComponent,
    StudequiComponent,
    UsersComponent,
    // BookComponent,
    MyequiComponent,
    EditComponent,
    AddComponent,
    HistoryComponent
  ],
  imports: [
      RouterModule,
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      ),
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatInputModule,
      MatDialogModule,
      MatFormFieldModule,
      MatSelectModule,
      NgbModule,
      ReactiveFormsModule,
      CommonModule,
      BrowserAnimationsModule
  ],
  providers: [
      RegisterService,
      LoginService,
      AdminequiService
  ],
  bootstrap: [AppComponent]
  // entryComponents: [UserComponent]
})
export class AppModule { }
