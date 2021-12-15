import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/authentication/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  login(event:Event) {
    event.preventDefault();
    this.userService.loginUser(this.form.value).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }

  private buildForm () {
    this.form = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
