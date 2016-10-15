import { Component, OnInit, OnDestroy } from '@angular/core';
import {UserService} from "./shared/user.service";
import { User } from "./shared/user";
import {TasksService} from "./shared/tasks.service";
import { Task } from "./shared/task";
import { Subscription } from "rxjs";

@Component({
  selector: 'ts-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public user: User = null;
  public tasks: Task[] = null;
  private subscription: Subscription = null;

  constructor(private userService: UserService,
              private tasksService: TasksService
  ) { }

  ngOnInit() {
    this.user = this.userService.user;

  // if user is logged
    if(this.user != null){
      // for first time usage of "home" component collect data of task from server
        // for further usage collect data of tasks through TasksService -> data is regularly updated,
          // and app don't need to access data from REST API furthermore
      if(this.tasksService.tasks == null){
        this.subscription = this.tasksService.getTasks(this.user.id).subscribe(
            (data: Task[]) => this.tasks = data
        );
      }else{
        this.tasks = this.tasksService.tasks;
      }
    }
  }

  // function for inputing start and end date of task,
    // and returning current progres of task

  current(start_date: string, end_date: string){
    let percent: number = 40;

    const taskStartTime = new Date(start_date).getTime();
    const taskEndTime = new Date(end_date).getTime();
    const currentTime = new Date().getTime();

    if(taskStartTime > currentTime){
      percent = 0;
    }else if(taskEndTime < currentTime) {
      percent = 100;
    }else{
      percent = ((currentTime - taskStartTime) / (taskEndTime - taskStartTime)) * 100;
    }

    return percent.toFixed(2) + '%';
  }
  // end of function for current task status

  // set current task as current globally
  setTask(task: Task){
    this.tasksService.currentTask = task;
  }
  // set globally -> new task is in creating
  setNewTask(){
    this.tasksService.newTask = true;
  }

  ngOnDestroy(){
    if(this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

}
