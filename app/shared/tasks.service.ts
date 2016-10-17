import { Injectable, EventEmitter, Output } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import {Task} from "./task";
import { NewTask } from './new-task';
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class TasksService {

  public tasks: Task[] = null;
  public currentTask: Task = null;

  // rout route for REST API
  private route: string = 'http://localhost/laravel_rest_api/';

  // value for testing if we current create new task
  public newTask: boolean = false;

  constructor(private http: Http,
              private userService: UserService) { }

  // function for catching error and sending through Observable (json format)-> implement in "http" requests
    private handleError(error: any){
      return Observable.throw(error.json());
    }

   // use for catch user tasks data from rest api -> user id used for catch user data,
    // and user id set set in user service when user is login
      // uses "post" method for safety
  getTasks(userId: number){
    const body = JSON.stringify(this.tasks);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.route + 'public/api/tasks/' + this.userService.userAuth,
                          body, {'headers': headers}).map((data: Response) => data.json())
        .catch(this.handleError);
  };

  editTask(task: Task){
    const body = JSON.stringify(task);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.route + 'public/api/edit_task/' + task, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

    deleteTask(id: number){
        return this.http.delete(this.route + 'public/api/delete_task/' + id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    createTask(new_task: NewTask){
      const body = JSON.stringify(new_task);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post(this.route + 'public/api/create_task/' + new_task, body, {headers: headers})
          .map((response: Response) => response.json())
          .catch(this.handleError);
    }
}
