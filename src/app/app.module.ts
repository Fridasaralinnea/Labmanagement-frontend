import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { MyequiComponent } from './my-equi/my-equi.component';
// import { DeleteComponent } from './delete/delete.component';



const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    // { path: 'reports', component: ReportComponent, pathMatch: 'prefix' },
    // { path: 'reports/week', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/1', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/2', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/3', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/4', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/5', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/6', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/week/10', component: ReportComponent, pathMatch: 'full' },
    // { path: 'reports/edit/:kmom', component: EditComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
    { path: 'admin', component: AdminequiComponent, pathMatch: 'full' },
    { path: 'student', component: StudequiComponent, pathMatch: 'full' },
    { path: 'history', component: HistoryComponent, pathMatch: 'full' },
    { path: 'edit', component: EditComponent, pathMatch: 'full' },
    { path: 'add', component: AddComponent, pathMatch: 'full' },
    { path: 'users', component: UsersComponent, pathMatch: 'full' },
    { path: 'myequi', component: MyequiComponent, pathMatch: 'full' }
    // { path: 'delete', component: DeleteComponent, pathMatch: 'full' }
    // { path: 'chat', component: ChatComponent, pathMatch: 'full' },

    // { path: '**', redirectTo: '/', pathMatch: 'full'},
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
    MyequiComponent,
    // DeleteComponent,
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
      ReactiveFormsModule,
      CommonModule
  ],
  providers: [
      RegisterService,
      LoginService,
      AdminequiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
