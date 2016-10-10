import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {LoginComponent} from "./user/login/login.component";
import {TasksComponent} from "./tasks/tasks.component";
import { TASKS_ROUTES } from "./tasks/tasks.route";
import {RegisterComponent} from "./user/register/register.component";
const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksComponent},
    { path: 'tasks', component: TasksComponent, children: TASKS_ROUTES},
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);