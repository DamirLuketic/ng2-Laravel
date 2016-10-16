import { Component, OnInit, OnDestroy } from '@angular/core';
import {TasksService} from "../../shared/tasks.service";

import { Task } from '../../shared/task';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {AlertUserClass} from "../../shared/leavePageWarning";
import {Observable} from "rxjs";


@Component({
  selector: 'ts-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy, AlertUserClass {

  public task: Task = null;

  // variable for test if value changes is saved
  private isSaved: boolean = false;

  // create default data for form -> add "id" and "user_id" to fit class "Task"
  public id: number = null;
  public user_id: number = null;
  public name = '';
  public start_date = '';
  public end_date = '';
  public description = '';
  public status = '';
  public created_at = '';
  public updated_at = '';

  // create default form;
  public taskEditForm: FormGroup;

  constructor(private tasksService: TasksService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router
  ) { }

  ngOnInit() {

    // redirect to home page if user is not logged
    if(this.userService.userAuth == 0){
      this.router.navigate(['/home']);
    }

    this.task = this.tasksService.currentTask;

    // if task is not new -> add value from task into form
    if (this.task != null) {
      this.id = this.task.id;
      this.user_id = this.task.user_id;
      this.name = this.task.name;
      this.start_date = this.task.start_date;
      this.end_date = this.task.end_date;
      this.description = this.task.description;
      this.status = this.task.status == '0' ? 'active' : 'completed';
      this.created_at = this.task.created_at;
      this.updated_at = this.task.updated_at;
    }

    // create form
    this.taskEditForm = this.formBuilder.group({
      id: [this.id],
      user_id: [this.user_id],
      name: [this.name, Validators.required],
      start_date: [this.start_date, Validators.required],
      end_date: [this.end_date, Validators.required],
      description: [this.description, Validators.required],
      status: [this.status, Validators.required],
      created_at: [{value: this.created_at, disabled: true}, Validators.required],
      updated_at: [{value: this.updated_at, disabled: true}, Validators.required]
    });
  }

  onSubmit(){
    this.isSaved = true;
    const editTask = this.taskEditForm.value;
    this.tasksService.editTask(editTask).subscribe(
        (data: string) => {
              console.log(data),
              this.router.navigate(['/tasks/list']);
        },
        (error: any) => console.log(error)
    );
  };

  onDelete(){
    this.tasksService.deleteTask(this.task.id).subscribe(
        (data: any) => {
              console.log(data),
              this.router.navigate(['/tasks/list']);
        },
        (error: any) => console.log(error)
    );
  }

  // function for saving changes and return true -> function used in Guardien
  saveAndLeave(){
    this.onSubmit();
    return true;
  }

  alertUserFunction(): Observable<boolean> | boolean {
    if(this.taskEditForm.dirty){
      return confirm('Changes are not saved, do you want to save changes before leave?') === true ? this.saveAndLeave() : true;
    }else {
      return true;
    }
  }

  ngOnDestroy(){

  }

}
