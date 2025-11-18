import { Component, OnInit } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from '../service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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

  onSignin() {
    const { username, password } = this.userForm.value;
    this._authService.signin(username, password).subscribe({
      next: (res) => {
        this._authService.setToken(res.token); // before testing add the signout + button which changes
        this._router.navigate(['/products']);
      },
      error: (err) => {
        console.log(err) // how access the backend errors
      },
      complete: () => {
        console.log("Completed!")
      },
    });
  }
}
