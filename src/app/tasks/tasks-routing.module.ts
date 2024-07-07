import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksPage } from './tasks.page';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: 'task/:id',
    component: TaskDetailComponent
  },
  {
    path: 'add',
    component: TaskDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {}
