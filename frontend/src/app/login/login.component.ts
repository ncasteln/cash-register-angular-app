import { Component, OnInit } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from '../service/auth.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  user: IUser = {
    email: '',
    password: ''
  }
  errorMsg = '';
  userForm!: FormGroup

  constructor( private authService: AuthService ) {

  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.userForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
}
