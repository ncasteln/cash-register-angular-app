import { Component } from '@angular/core';
import { IUser } from '../models';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

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
    username: '',
    password: ''
  }
  errorMsg = '';
  userForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm() {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, [ Validators.required ]),
      password: new FormControl(this.user.password, [ Validators.required ])
    })
  }

  onSignup() {
    const { username, password } = this.userForm.value;
    this._authService.signup(username, password).subscribe(res => {
      /* Add loading */
      this._router.navigate([ '/products' ])
    })
  }

}
