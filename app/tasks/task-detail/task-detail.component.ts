import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../../shared/task';

@Component({
  selector: 'ts-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;

  ngOnInit() {
  }

}
