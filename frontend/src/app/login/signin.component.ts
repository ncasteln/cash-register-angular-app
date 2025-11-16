import { Component, OnInit } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from '../service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'signin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  user: IUser = {
    email: '',
    password: ''
  }
  errorMsg = '';
  userForm!: FormGroup;

  constructor( private authService: AuthService ) {

  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, [ Validators.required ]),
      password: new FormControl(this.user.password, [ Validators.required ])
    })
  }

  onSignin() {
    const { email, password } = this.userForm.value;
    this.authService.signin(email, password).subscribe(res => res);
  }
}
