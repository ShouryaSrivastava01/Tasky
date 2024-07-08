import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { AlertController } from '@ionic/angular';
import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  tasks : Task[] = [];
  constructor(private taskService: TaskService, private alertCtrl: AlertController, private toaster: ToasterService) {}
  ngOnInit() {
    const tasks = localStorage.getItem('tasks');
    if(tasks) {
      this.taskService.tasks = JSON.parse(tasks);
    }
    this.tasks = this.taskService.tasks
  }
  
  deleteTask(id:number) {
    const tasks = this.tasks.filter(task => task.id !== id);
    this.tasks = tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.toaster.presentToastForSuccess('Task deleted')

  }

  async presentAlert(id:number) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'This will delete this task permanently',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: () => {
            this.deleteTask(id);
          }
        }
      ],
    });
  
    await alert.present();
  }

  notify(){
    this.taskService.overDueTask();
  }
  }
