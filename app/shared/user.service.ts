import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import { User } from "./user";

@Injectable()
export class UserService {

  public userAuth: number = 0;
  public user: User;

  // example string -> without values
  public userForLoginRegister: string[];

  constructor(private http: Http) {}

  login(email: string, password: string){
    const body = JSON.stringify(this.userForLoginRegister);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost/laravel_rest_api/public/api/user/' + email + '/' + password, body, {headers: headers})
        .map((data: Response) => data.json());
  }

  register(name: string, email: string, password: string){
    const body = JSON.stringify(this.userForLoginRegister);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post('http://localhost/laravel_rest_api/public/api/register/' + name + '/' + email + '/' + password, body, {headers: headers})
        .map((response: Response) => response.json());
  }

  logout(){
    this.userAuth = 0;
    this.user = null;
  }

}
