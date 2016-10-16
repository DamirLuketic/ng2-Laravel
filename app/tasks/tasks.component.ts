import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ts-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
    // redirect to home page if user is not logged
    if(this.userService.userAuth == 0){
      this.router.navigate(['/home']);
    }
  }

}
