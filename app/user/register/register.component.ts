import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'ts-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private formBuilder: FormBuilder,
              private userSevice: UserService
              ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.userSevice.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
    (answer: any) => alert(answer)
    );
  }

  onCancel(){
    this.registerForm.reset();
  }
}
