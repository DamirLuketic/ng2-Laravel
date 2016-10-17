import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";

import 'rxjs/Rx';
import { User } from "./user";
import { Observable } from "rxjs";
import {Contact} from "./contact";

@Injectable()
export class UserService {

  public userAuth: number = 0;
  public user = null;

  // rout route for REST API - local \ net
  private route: string = 'http://localhost/laravel_rest_api/';
  // private route: string = 'http://consilium-europa.com/pages/laravel_rest_api/';

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
    return this.http.post(this.route + 'public/api/user/' + email + '/' + password, body, {headers: headers})
        .map((data: Response) => data.json())
        .catch(this.handleError);
  }

  register(name: string, email: string, password: string){
    const body = JSON.stringify(this.userForLoginRegister);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.route + 'public/api/register/' + name + '/' + email + '/' + password, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

  logout(){
    this.userAuth = 0;
    this.user = null;
  }

  contactSendMail(contact: Contact){
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type' : 'application/json'});
    return this.http.post(this.route + 'public/api/send_mail/' + contact, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch(this.handleError);
  }

}
