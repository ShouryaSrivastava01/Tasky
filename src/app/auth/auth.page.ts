import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  authType: string = 'login'; // Default to login form
  
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  userSignUpForm: any;

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    
  this.userSignUpForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  onLogin() {
    console.log(this.userForm.value)
    if(this.userForm.value.email && this.userForm.value.password) {
      this.authService.login(this.userForm.value.email, this.userForm.value.password);
    }
    
  }

  onSignup() {
    if(this.userSignUpForm.value.email && this.userForm.value.password) {
      this.authService.signup(this.userSignUpForm.value.email, this.userSignUpForm.value.password);
    }
  }
  matchPassword() {
    return this.userSignUpForm.value.password !== this.userSignUpForm.value.confirmPassword
  }
}
