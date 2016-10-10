import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header.component";
import {HomeComponent} from "./home.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {UserService} from "./shared/user.service";
import {LoginComponent} from "./user/login/login.component";
import {routing} from "./app.routing";
import {TasksComponent} from "./tasks/tasks.component";
import {TasksService} from "./shared/tasks.service";
import {TasksListComponent} from "./tasks/tasks-list/tasks-list.component";
import {TaskItemComponent} from "./tasks/tasks-list/task-item.component";
import {TaskDescriptionComponent} from "./tasks/task-description/task-description.component";
import {RegisterComponent} from "./user/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DropdownDirective,
    LoginComponent,
    TasksComponent,
    TasksListComponent,
    TaskItemComponent,
    TaskDescriptionComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [UserService, TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
