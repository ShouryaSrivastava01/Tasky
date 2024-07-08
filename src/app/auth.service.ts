import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { TaskService } from './tasks/task.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticate: boolean = false;


  users = [
    {
      email: "user1@example.com",
      password: "password123"
    },
    {
      email: "shourya@gmail.com",
      password: "123"
    }
  ]
  

  constructor(private router: Router,
    private toaster: ToasterService,
    private taskService: TaskService
  ) { }

  isLoggedIn() {
    const auth = localStorage.getItem('auth');
    if(auth) {
      this.taskService.overDueTask();
      return true;
    }
    else return this.authenticate;
  }

  login(email:string, password: string) {
    const user = this.users.find(user => user.email === email);
    console.log(user)
    if(user) {
      if(user.password === password) {
        this.authenticate = true;
        localStorage.setItem('auth', JSON.stringify(email));
        this.taskService.overDueTask();
        this.router.navigate(['']);
        this.toaster.presentToastForSuccess('Logged in successfully.');
      }
    } else {
      this.toaster.presentToastForError("User not authenticated.")
    }
  }

  logout() {
    this.authenticate = false;
    this.toaster.presentToastForSuccess('Logged out.')
    localStorage.removeItem('auth');
    this.router.navigate(['auth'])
  }

  signup(email: string, password: string) {
    if(email && password){
      this.users.push({
        email: email,
        password: password,
      })
      this.authenticate = true;
      this.router.navigate([''])
      this.toaster.presentToastForSuccess('Signed up successfully.')
    } else {
      this.toaster.presentToastForError('Sorry, request cannot be completed.')
    }
  }
}
