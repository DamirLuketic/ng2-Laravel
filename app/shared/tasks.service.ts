import { Injectable, EventEmitter, Output } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import {Task} from "./task";
import { NewTask } from './new-task';
import {UserService} from "./user.service";

@Injectable()
export class TasksService {

  public tasks: Task[] = null;
  public currentTask: Task = null;

  // value for testing if we current create new task
  public newTask: boolean = false;

  constructor(private http: Http,
              private userService: UserService) { }

   // use for catch user tasks data from rest api -> user id used for catch user data,
    // and user id set set in user service when user is login
      // uses "post" method for safety
  getTasks(userId: number){
    const body = JSON.stringify(this.tasks);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://www.consilium-europa.com/pages/laravel_rest_api/public/api/tasks/' + this.userService.userAuth,
                          body, {'headers': headers}).map((data: Response) => data.json());
  };

  editTask(task: Task){
    const body = JSON.stringify(task);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('http://www.consilium-europa.com/pages/laravel_rest_api/public/api/edit_task/' + task, body, {headers: headers})
        .map((response: Response) => response.json());
  }

    deleteTask(id: number){
        return this.http.delete('http://www.consilium-europa.com/pages/laravel_rest_api/public/api/delete_task/' + id)
            .map((response: Response) => response.json());
    }

    createTask(new_task: NewTask){
      const body = JSON.stringify(new_task);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('http://www.consilium-europa.com/pages/laravel_rest_api/public/api/create_task/' + new_task, body, {headers: headers})
          .map((response: Response) => response.json());
    }
}
