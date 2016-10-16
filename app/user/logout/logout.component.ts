import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { TasksService } from "../../shared/tasks.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'ts-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
              private tasksService: TasksService,
              private router: Router,
              private cookieService: CookieService
  ) {}

  ngOnInit() {

    // remove user data in cookies -> if cookies is set
    if(this.cookieService.getObject('user') != null){
      this.cookieService.remove('user');
    }

    // remove all tasks from list
    this.tasksService.currentTask = null;
    this.tasksService.tasks = null;

    // call function for remove current user daa
    this.userService.logout();

    this.router.navigate(['/home']);
  }

}
