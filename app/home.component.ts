import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";
import { User } from "./shared/user";

@Component({
  selector: 'ts-home',
  template: `
    <p *ngIf="user != null">
      Welcome {{user?.name}}
    </p>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  public user: User = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }
}
