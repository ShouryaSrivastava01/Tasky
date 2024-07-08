import { Injectable} from '@angular/core';
import { Task } from './task.model';
import {ScheduleOptions, LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  counter: number = 5;

  tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for task 1',
      dueDate: new Date('2024-05-10'),
      priority: 'High'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for task 2',
      dueDate: new Date('2024-07-15'),
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for task 3',
      dueDate: new Date('2024-07-20'),
      priority: 'Low'
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for task 4',
      dueDate: new Date('2024-06-25'),
      priority: 'High'

    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description for task 5',
      dueDate: new Date('2024-07-25'),
      priority: 'High'

    }]


    getTask (id: number): Task {
      return this.tasks.filter(task => task.id === id)[0]
    }

    addTask(task: Task) {
      this.tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    updateTask(update:Task, id:number) {
      let task = this.tasks.find(task => task.id === id);
      if(task) {
        task.title = update.title
        task.description = update.description
        task.dueDate = update.dueDate
        task.priority = update.priority
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }

   async overDueTask() {
      const task = this.tasks.filter(task => new Date(task.dueDate) < new Date());
      if(task) {
        console.log(`You've ${task.length} overdue.`)
        let options: ScheduleOptions = {
          notifications: [
            {
              id: Math.random()*100,
              title: "Task Overdue",
              body: `You've ${task.length} overdue.`,
            }
          ]
          
        }
        
        try {
          await LocalNotifications.schedule(options);
        } catch(ex) {
          console.log('error');
        }
      }
    }
}
