import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";

@Component({
  selector: 'ts-header',
  template: `
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" [routerLink]="['/home']">Home</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li routerLinkActive="active"><a *ngIf="isActive() != 0" [routerLink]="['/tasks', 'list']">Tasks List</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown" tsdropdown>
          <a
            class="dropdown-toggle"
            role="button"
            aria-haspopup="true"
            aria-expanded="false">Users<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a style="cursor: pointer;" *ngIf="isActive() == 0" [routerLink]="['/register']">Register</a></li>
            <li><a style="cursor: pointer;" *ngIf="isActive() == 0" [routerLink]="['/login']">LogIn</a></li>
            <li><a style="cursor: pointer;" *ngIf="isActive() != 0">LogOut</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  isActive(){
    return this.userService.userAuth;
  }

  ngOnInit() {
  }

}