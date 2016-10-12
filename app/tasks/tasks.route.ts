import {Routes} from "@angular/router";
import { TasksListComponent } from "./tasks-list/tasks-list.component";
import { TaskDescriptionComponent } from "./task-description/task-description.component";
import {TaskEditComponent} from "./task-edit/task-edit.component";
import {TaskNewComponent} from "./task-new/task-new.component";
export const TASKS_ROUTES: Routes = [
    { path: 'list', component: TasksListComponent },
    { path: 'list', component: TasksListComponent, children: [
        {path: 'description/:id', component: TaskDescriptionComponent},
        {path: 'edit', component: TaskEditComponent},
        {path: 'new', component: TaskNewComponent}
        ]}
];