import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

constructor(private http: HttpClientModule,private dialog: MatDialog){};
  title = 'project-list';
}
