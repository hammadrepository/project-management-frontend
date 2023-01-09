import { Component, OnInit, Inject } from '@angular/core';
import {ApiService} from "../api.service";
import { Developer } from "../shared/models/developer.model";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material';
import {Project} from "../shared/models/project.model";
import { DatePipe } from '@angular/common';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
})
export class DevelopersComponent implements OnInit {

  constructor(private storage: ApiService,private dialog: MatDialog) { }

  developers: Developer[];
  private developer: Developer;
  projects: Project[];
  ngOnInit() {
    this.developers = this.storage.getDevelopers();
    this.projects = this.storage.getProjects();
  }

  createDeveloper(){
    this.dialog.open(DevelopersAddDialogComponent,{
      data : {
        projects : this.projects
      }
    });
  }

  editDeveloper(id){

    this.dialog.open(DevelopersEditDialogComponent,{
      data : {
        developer : this.developers.find(x => x.id === id)
      }
    });
    this.developer = this.developers.find(x => x.id === id);
  }

  deleteDeveloper(developer_id): void {

    this.storage.deleteDeveloper(developer_id);
    this.developers = this.storage.getDevelopers();
  }
}

// Add component

@Component({
  selector: 'app-developers-d',
  templateUrl: './developers-dialog.component.html'
})
export class DevelopersAddDialogComponent implements OnInit {
  
  first_name = new FormControl('');
  last_name = new FormControl('');
  project = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage: ApiService) { 

  }
  
  ngOnInit() {
  }

  createDeveloper(){
    this.storage.createDeveloper(this.first_name.value,this.last_name.value,this.project.value);
  }
}

// Edit componenet

@Component({
  selector: 'app-developers-edit-component',
  templateUrl: './developers-edit-dialog.component.html',
  providers: [ DatePipe ] 
})
export class DevelopersEditDialogComponent implements OnInit {
  developers: Developer[];
  devData : any;
  first_name = new FormControl('');
  last_name = new FormControl('');
  editForm: FormGroup;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,
   private storage: ApiService,private formBuilder: FormBuilder) { 
    this.devData = data;
  }
  
  ngOnInit() {
    this.editForm = new FormGroup({

      first_name: new FormControl('', [Validators.required]),

      last_name: new FormControl('', Validators.required)

    });
    console.log(this.editForm.value.first_name);
  }
  updateDeveloper(id){
    console.log(this.editForm.value);
    this.storage.updateDeveloper(id,this.editForm.value.first_name,this.editForm.value.last_name);
    this.dialog.closeAll();
  }

}
