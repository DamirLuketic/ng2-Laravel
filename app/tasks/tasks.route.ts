import {Routes} from "@angular/router";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TaskDescriptionComponent } from "./task-description/task-description.component";
export const TASKS_ROUTES: Routes = [
    { path: 'list', component: TasksListComponent },
    { path: 'list', component: TasksListComponent, children: [{path: 'description/:id', component: TaskDescriptionComponent}]}
];