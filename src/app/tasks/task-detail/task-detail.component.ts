import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { ToasterService } from 'src/app/toaster.service';
@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent  implements OnInit {
 taskForm: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toaster: ToasterService,
  ) { }

  id: any;
  

   ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });
    this.route.paramMap.subscribe(async (params)=>{
      this.id = params.get('id');
      if(this.id) {
        const task: Task = await this.taskService.getTask(parseInt(this.id));
        console.log(task)
        if(task) {
          this.taskForm.patchValue({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority
          })

        }
     
      }
      
    })
    
  }
  submit() {
    const task: Task = {
      id: (this.id)? this.id : this.generateRandomId(),
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      dueDate: this.taskForm.value.dueDate,
      priority: this.taskForm.value.priority
    }
    if(this.id) {
      this.taskService.updateTask(task,parseInt(this.id))
      this.toaster.presentToastForSuccess('Task has been updated successfully.')
    } else {
      this.taskService.addTask(task);
      this.toaster.presentToastForSuccess('Task has been added successfully.')
    }
    this.router.navigate(['/'])
  }

   generateRandomId(): number{
    return new Date().getTime();
  }

}
