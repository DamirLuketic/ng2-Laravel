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

  // catch data of all user tasks and send data into TasksService,
  // then return this data into local variable "tasks"
  ngOnInit() {
    return this.taskService.getTasks(this.userService.userAuth).subscribe(
        (data: Task[]) => {
          this.taskService.tasks = data,
          this.tasks = this.taskService.tasks
        }
      )
    }
  }
