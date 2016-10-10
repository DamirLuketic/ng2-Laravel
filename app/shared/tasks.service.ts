import { Injectable, EventEmitter, Output } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import {Task} from "./task";
import {UserService} from "./user.service";

@Injectable()
export class TasksService {

  public tasks: Task[];

  constructor(private http: Http,
              private userService: UserService) { }

  getTasks(userId: number){
    const body = JSON.stringify(this.tasks);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost/laravel_rest_api/public/api/tasks/' + this.userService.userAuth,
                          body, {'headers': headers}).map((data: Response) => data.json());
  };

  currentTask(taskId: number){
    return this.tasks[taskId];
  }

}
