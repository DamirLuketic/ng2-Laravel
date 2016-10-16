import {Component, OnInit, Input} from '@angular/core';
import {Task} from "../../shared/task";
import { TasksService } from "../../shared/tasks.service";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ts-task-item',
  template: `
<a class="list-group-item clearfix" style="cursor: pointer;" routerLinkActive="active" (click)="setTask()" [routerLink]="['description', task.id]">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{task.name}}</h4>
    <p class="list-group-item-text">End date: {{task.end_date}}</p>
  </div>
</a>
  `,
  styles: []
})
export class TaskItemComponent implements OnInit {

  @Input() public taskId: number = 0;
  @Input() public task: Task;

  constructor(private tasksService: TasksService,
              private userService: UserService,
              private router: Router
  ) { }

  ngOnInit() {
    if(this.userService.userAuth == 0){
      this.router.navigate(['/home']);
    }
  }

  // on click set this task as current task
  setTask(){
    this.tasksService.currentTask = this.task;
  }

}
