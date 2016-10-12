import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/user.service";
import { TasksService } from "../../shared/tasks.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ts-logout',
  template: ``,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService,
              private tasksService: TasksService,
              private router: Router
  ) {}

  ngOnInit() {
    this.tasksService.currentTask = null;
    this.tasksService.tasks = null;

    this.userService.logout();

    this.router.navigate(['/home']);
  }

}
