import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Project} from "../shared/models/project.model";
import { DevelopersDialogComponent } from '../developers-dialog/developers-dialog.component';
import { TechnologiesDialogComponent } from '../technologies-dialog/technologies-dialog.component';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-todo',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];

  constructor(private storage: ApiService,private dialog: MatDialog) {
  }

  openDialog(){
    this.dialog.open(DevelopersDialogComponent,{
      data: {
        developers : this.projects.find(x => x.id == 1)
      }
    });

  }

  /**
   * Load projects on init
   */
  ngOnInit() : void{
    this.projects = [];
    this.projects = this.storage.getProjects();
    console.log(this.projects);
    console.log("Projects loaded!");
  }

  /**
   * Load project developers
   */
  projectDevelopers(project_id): void {
    this.dialog.open(DevelopersDialogComponent,{
      data: {
        data : this.projects.find(x => x.id == project_id).developers,
        project_id : project_id
      },
        height: '400px',
        width: '600px',
    });
    console.log(this.projects.find(x => x.id == project_id).developers)
  } 

  /**
   * Load project technologies
   */
   projectTechnologies(project_id): void {
    this.dialog.open(TechnologiesDialogComponent,{
      data: {
        data : this.projects.find(x => x.id == project_id).technologies
      },
        height: '400px',
        width: '600px',
    });
  }


  deleteProject(id): void {

    this.storage.delete(id);
    this.projects = this.storage.getProjects();
  }

  /**
   * Remove the projects from the list
   *
   * @param id project index to remove
   */
  delete(id): void {
    this.storage.delete(id);
    this.projects = this.storage.getProjects();
  }
}

