import { Component, OnInit, DoCheck } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Task } from '../../shared/task';
import {TasksService} from "../../shared/tasks.service";

@Component({
  selector: 'ts-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit, DoCheck {

  public taskId: number;
  public task: Task;

  constructor(private activatedRoute: ActivatedRoute,
              private tasksService: TasksService
  ) {}


  // first part add taskId -> second part catch task -> all task are set in tasks services -> through task list
  ngOnInit() {
    this.activatedRoute.params.subscribe(
        (data: any) => this.taskId = data['id']
    );
    for(let task of this.tasksService.tasks){
      if(task.id == this.taskId){
        this.task = task
      }
    }
  }

   // ngDoCheck -> check changes in selected params
  ngDoCheck(){
    for(let task of this.tasksService.tasks){
      if(task.id == this.taskId){
        this.task = task
      }
    }
  }



}
