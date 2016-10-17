import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {UserService} from "../shared/user.service";
import {User} from "../shared/user";
import {Contact} from "../shared/contact";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'ts-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public user: User = null;

  public name: string;
  public email: string;

  public contactForm: FormGroup;

  // value for "is human" test
  public notHuman: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private cookieService: CookieService
  ) { }

  // function that convert nay value to number -> usage for catch data
  convertToNumber(value: string){
    return parseInt(value);
  }

  ngOnInit() {

    // if cookie is set, but user is not (return of user to app), set user -> also in user service
    if(this.cookieService.getObject('user') != null){
      this.userService.user = this.cookieService.getObject('user');
      this.userService.userAuth = this.convertToNumber(this.userService.user.id);
    }

    this.user = this.userService.user;

    // if user is logged collect data to populate inputs
    if(this.user != null) {
      this.name = this.user.name;
      this.email = this.user.email;
    }

    this.contactForm = this.formBuilder.group({
      name: [this.name, [Validators.required, Validators.minLength(2)]],
      email: [this.email, [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      message: ['', Validators.required],
      human: ['', Validators.required]
    });
  }

  submitContact(){
    // retrieve value from form, and adjust this value for further use
    let formValue = this.contactForm.value;

    // if "human" test not correct alert user
    if(formValue.human != 5){
      this.notHuman = true;
    }else{
      this.notHuman = false,

      // collect data from form, and prepare data for "post"
      delete formValue['human'];
      const contact: Contact = formValue;

      this.userService.contactSendMail(contact).subscribe(
          (data: string) => console.log(data),
          (error: any) => console.log(error)
      );
      // reset form after send email
      this.clearForm();
    }
  }

  retriveIsHumanValue(){
    return this.notHuman;
  }

  clearForm(){
    this.contactForm.reset();
    this.notHuman = false;
  }
}
