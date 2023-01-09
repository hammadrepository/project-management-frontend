import { Component, OnInit, Inject } from '@angular/core';
import {ApiService} from "../api.service";
import { MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-developers-dialog',
  templateUrl: './developers-dialog.component.html',
  styleUrls: ['./developers-dialog.component.css']
})
export class DevelopersDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage: ApiService) { 
  	console.log(data.data);
  }

  ngOnInit() {
  }

  deleteDeveloper(developer_id, project_id): void {
    this.storage.deleteDeveloper(developer_id,project_id);
  }

}

@Component({
  selector: 'app-developers-d',
  templateUrl: './developers-dialog.component.html'
})
export class AddDeveloperToProjectComponent implements OnInit {
  
  developer = new FormControl('');
  project = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage: ApiService) { 

  }
  
  ngOnInit() {
  }

  addDeveloperToProject(developer_id){
    // this.storage.createDeveloper(this.first_name.value,this.last_name.value,this.project.value);
  }
}
