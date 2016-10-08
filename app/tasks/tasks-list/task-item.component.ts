import { Component, OnInit, Input } from '@angular/core';
import {Task} from "../../shared/task";

@Component({
  selector: 'ts-task-item',
  template: `
<a class="list-group-item clearfix" routerLinkActive="active">
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

  constructor() { }

  ngOnInit() {
  }

}
