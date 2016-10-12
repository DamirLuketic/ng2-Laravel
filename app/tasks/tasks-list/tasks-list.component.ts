import { Component, OnInit, OnDestroy } from '@angular/core';
import {TasksService} from "../../shared/tasks.service";
import {UserService} from "../../shared/user.service";

import { Task } from "../../shared/task";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'ts-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit, OnDestroy {

  public tasks: Task[];

  private subscription: Subscription;

  constructor(private taskService: TasksService,
              private userService: UserService,
              private router: Router
  ) { }

  // catch data of all user tasks and send data into TasksService,
  // then return this data into local variable "tasks"

  ngOnInit(){
      this.subscription = this.taskService.getTasks(this.userService.userAuth).subscribe(
        (data: Task[]) => {
          this.taskService.tasks = data,
              this.tasks = this.taskService.tasks
        }
      )
    }

    // route for new task -> also disable button for new task
  goToNew(){
    this.taskService.newTask = true;
    this.router.navigate(['/tasks/list/new']);
  }

  // show route for new task only if we current don't create new task
  isNew(){
    return this.taskService.newTask;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  }
