import { Component, OnInit, Inject } from '@angular/core';
import {ApiService} from "../api.service";
import { Technology } from "../shared/models/technology.model";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material';
import {Project} from "../shared/models/project.model";
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  constructor(private storage: ApiService,private dialog: MatDialog) { }
  technologies: Technology[];
  projects: Project[];
  
  ngOnInit() {

    this.technologies = this.storage.getTechnologies();
    this.projects = this.storage.getProjects();
  }

  createTechnology(){
    this.dialog.open(TechnologiesAddDialogComponent,{
      data : {
        projects : this.projects
      }
    });
  }

  deleteTechnology(techology_id, project_id): void {
    this.storage.deleteTechnology(techology_id,project_id);
  }

}

@Component({
  selector: 'app-technologies-d',
  templateUrl: './technologies-dialog.component.html'
})
export class TechnologiesAddDialogComponent implements OnInit {
  
  name = new FormControl('');
  project = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage: ApiService,private dialog: MatDialog) { }
  
  ngOnInit() {
  }

  createTechnology(){
  
    this.storage.createTechnology(this.name.value,this.project.value);
    this.dialog.closeAll();
  }
}
