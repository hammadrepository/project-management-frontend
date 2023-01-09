import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-technologies-dialog',
  templateUrl: './technologies-dialog.component.html',
  styleUrls: ['./technologies-dialog.component.css']
})
export class TechnologiesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private storage: ApiService) { 
  	console.log(data.data);
  }

  ngOnInit() {
  }

  deleteTechnology(techology_id, project_id): void {
    this.storage.deleteTechnology(techology_id,project_id);
  }
}
