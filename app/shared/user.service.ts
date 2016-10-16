import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import { User } from "./user";
import { Observable } from "rxjs";

@Injectable()
export class UserService {

  public userAuth: number = 0;
  public user;

  // example string -> without values
  public userForLoginRegister: string[];

  constructor(private http: Http) {}

  // function for catching error -> implement in "http" requests
  private handleError(error: any){
    return Observable.throw(error.json());
  }

  login(email: string, password: string){
    const body = JSON.stringify(this.userForLoginRegister);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost/laravel_rest_api/public/api/user/' + email + '/' + password, body, {headers: headers})
        .map((data: Response) => data.json())
        .catch(this.handleError);
  }

  register(name: string, email: string, password: string){
    const body = JSON.stringify(this.userForLoginRegister);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost/laravel_rest_api/public/api/register/' + name + '/' + email + '/' + password, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

  logout(){
    this.userAuth = 0;
    this.user = null;
  }

}
