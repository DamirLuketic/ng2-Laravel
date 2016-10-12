import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";
import {User} from "../../shared/user";

@Component({
  selector: 'ts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  onSubmit(){
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
            (data: User) => {
              this.userService.userAuth = data ? +data['id'] : 0,
              this.userService.user = data,
              data ? this.router.navigate(['/home']) : alert('Wrong e-mail/password')
            }
        );
  };

  ngOnInit() {
  }

  ngOnDestroy(){
  }

}
