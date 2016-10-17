import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {TasksComponent} from "./tasks/tasks.component";
import { TASKS_ROUTES } from "./tasks/tasks.route";
import {LogoutComponent} from "./user/logout/logout.component";
import {LoginRegisterComponent} from "./user/login-register/login-register.component";
import {ContactComponent} from "./contact/contact.component";
const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'tasks', component: TasksComponent, children: TASKS_ROUTES},
    { path: 'logout', component: LogoutComponent},
    { path: 'loginRegister', component: LoginRegisterComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);