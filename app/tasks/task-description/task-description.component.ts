import { Component, OnInit, DoCheck } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Task } from '../../shared/task';
import {TasksService} from "../../shared/tasks.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'ts-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.css']
})
export class TaskDescriptionComponent implements OnInit, DoCheck {

  // create data for task input;
  public taskId: number;
  public task: Task = null;

  // create default data for form;
  public start_date = '';
  public end_date = '';
  public description = '';
  public status = '';
  public created_at = '';
  public updated_at = '';

  // create default form;
  public taskDetailForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private tasksService: TasksService,
              private formBuilder: FormBuilder,
              private router: Router
  ) {}

  ngOnInit() {
  }

  // ngDoCheck -> check changes in selected params
  ngDoCheck() {

    // add task id in property
    this.activatedRoute.params.subscribe(
        (data: any) => this.taskId = data['id']
    );

    this.task = this.tasksService.currentTask;

    // if task is not new -> add value from task into form
    if (this.task != null) {
      this.start_date = this.task.start_date;
      this.end_date = this.task.end_date;
      this.description = this.task.description;
      this.status = this.task.status == '0' ? 'active' : 'completed';
      this.created_at = this.task.created_at;
      this.updated_at = this.task.updated_at;
    }

    // create form
    this.taskDetailForm = this.formBuilder.group({
      start_date: [{value: this.start_date, disabled: true}, Validators.required],
      end_date: [{value: this.end_date, disabled: true}, Validators.required],
      description: [{value: this.description, disabled: true}, Validators.required],
      status: [{value: this.status, disabled: true}, Validators.required],
      created_at: [{value: this.created_at, disabled: true}, Validators.required],
      updated_at: [{value: this.updated_at, disabled: true}, Validators.required]
    });
  }

  taskEdit(){
    this.router.navigate(['/tasks/list/edit']);
  }
}