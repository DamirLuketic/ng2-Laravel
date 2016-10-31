import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header.component";
import {HomeComponent} from "./home.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {UserService} from "./shared/user.service";
import {routing} from "./app.routing";
import {TasksComponent} from "./tasks/tasks.component";
import {TasksService} from "./shared/tasks.service";
import {TasksListComponent} from "./tasks/tasks-list/tasks-list.component";
import {TaskItemComponent} from "./tasks/tasks-list/task-item.component";
import {TaskDescriptionComponent} from "./tasks/task-description/task-description.component";
import {TaskEditComponent} from "./tasks/task-edit/task-edit.component";
import {LogoutComponent} from "./user/logout/logout.component";
import {TaskNewComponent} from "./tasks/task-new/task-new.component";
import {LoginRegisterComponent} from "./user/login-register/login-register.component";
import {CookieService} from "angular2-cookie/services/cookies.service";
import { LeavePageWarningGuard } from "./shared/leavePageWarning";
import {ContactComponent} from "./contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DropdownDirective,
    TasksComponent,
    TasksListComponent,
    TaskItemComponent,
    TaskDescriptionComponent,
    TaskEditComponent,
    LogoutComponent,
    TaskNewComponent,
    LoginRegisterComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [UserService, TasksService, CookieService, LeavePageWarningGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
