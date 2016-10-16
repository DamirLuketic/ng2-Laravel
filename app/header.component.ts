import { Component, OnInit } from '@angular/core';
import {UserService} from "./shared/user.service";

@Component({
  selector: 'ts-header',
  templateUrl: './header.component.html',
  styles: [`
    nav { 
        background-color: snow; 
        }
`]
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  isActive(){
    return this.userService.userAuth;
  }

  ngOnInit() {
  }

}
