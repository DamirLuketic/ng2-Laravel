import { Component, OnInit } from '@angular/core';
import {TasksService} from "../../shared/tasks.service";
import {UserService} from "../../shared/user.service";

import { Task } from "../../shared/task";

@Component({
  selector: 'ts-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  public tasks: Task[];

  constructor(private taskService: TasksService,
              private userService: UserService) { }

  ngOnInit() {
    return this.taskService.getTasks(this.userService.userAuth).subscribe(
        (data: Task[]) => this.tasks = data
    );
  }

}
