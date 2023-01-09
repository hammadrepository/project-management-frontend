import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectComponent} from './project/project.component';
import {ProjectAddComponent} from "./project-add/project-add.component";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import { DevelopersComponent } from './developers/developers.component';
import { TechnologiesComponent } from './technologies/technologies.component';
const routes: Routes = [
  {
    // contains the whole todo list
    path: 'projects',
    component: ProjectComponent
  },
  {
    // display the form to add a new project
    path: 'projects/add',
    component: ProjectAddComponent,
    data: {title: 'Add new project'}
  },
  {
    // display the form to add a new project
    path: 'projects/:id/edit',
    component: ProjectEditComponent,
    data: {title: 'Project edition'}
  },

  {
    // contains the whole developers list
    path: 'developers',
    component: DevelopersComponent
  },  

  {
    // contains the whole developers list
    path: 'technologies',
    component: TechnologiesComponent
  }, 
  // Always go on /tasks path
  { path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
