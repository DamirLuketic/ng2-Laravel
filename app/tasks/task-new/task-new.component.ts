import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {TasksService} from "../../shared/tasks.service";

import { NewTask } from '../../shared/new-task';
import {Router} from "@angular/router";

@Component({
  selector: 'ts-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit, OnDestroy {

  newTaskForm: FormGroup;
  newTask: NewTask = null;

  // set current date
  public date = new Date();
  public fullDate = this.date.getFullYear() + '-' + ('0' + (this.date.getMonth() + 1)).slice(-2) + '-' + ('0' + this.date.getDate()).slice(-2);

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private tasksService: TasksService,
              private router: Router
  ) { }

  ngOnInit() {
    this.newTaskForm = this.formBuilder.group({
      user_id: [this.userService.userAuth, Validators.required],
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date:  ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(){
    this.newTask = this.newTaskForm.value;
    this.tasksService.createTask(this.newTask).subscribe(
        (data: string) => {
          console.log(data)
          this.router.navigate(['/tasks/list']);
        }
    );
  }

  onCancel(){
    this.newTaskForm.reset();
  }

  ngOnDestroy(){
    this.tasksService.newTask = false;
  }

}

