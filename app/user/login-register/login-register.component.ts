import { Component } from '@angular/core';
import {User} from "../../shared/user";
import {Router} from "@angular/router";
import {UserService} from "../../shared/user.service";
import {Validators, FormBuilder} from "@angular/forms";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'ts-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  // test is login
  public login: boolean = true;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private cookieService: CookieService
  ) { }


  toRegister(){
    this.login = false;
  }

  toLogin(){
    this.login = true;
  }


  // login part

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: []
  });

  onSubmitLogin(){

    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
            (data: User) => {
              // if retrive user -> set user id
              this.userService.userAuth = data ? +data['id'] : 0,
              // if it is selected option remember -> set cookie and value to user data, else, set value to user
              this.loginForm.value.remember != null ? (this.userService.user = this.cookieService.putObject('user', data)) : this.userService.user = data
              data ? this.router.navigate(['/home']) : alert('Wrong e-mail/password')
            },
            // show error
            error => console.log(error),
        );
  };

  // register part

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSuccess(value: any){
    alert(value);
    this.router.navigate(['/home'])
  }

  onSubmitRegister(){
    if(this.registerForm.value.password == this.registerForm.value.repeatPassword){
      this.userService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
          (answer: any) => {
            answer == 'Confirm e-mail to activate account' ? this.onSuccess(answer) : alert(answer);
          },
          error => console.log(error)
      );
    }else{
      alert("Password and repeated password don't match.")
    }
  }

  onCancel(){
    this.registerForm.reset();
  }

}
