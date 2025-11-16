import { Component } from '@angular/core';
import { IUser } from '../models';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
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

  onSignup() {
    const { email, password } = this.userForm.value;
    this.authService.signup(email, password).subscribe(res => res /* What to do */)
  }

}
