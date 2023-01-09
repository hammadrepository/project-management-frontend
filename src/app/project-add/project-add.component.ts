import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from "../api.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent {

  /**
   * Project name form field
   */
  name = new FormControl('');

  /**
   *  Project description form field
   */
  description = new FormControl('');
  start_date = new FormControl('');
  end_date = new FormControl('');

  constructor(private storage: ApiService, private router: Router) {
  }

  /**
   * Create a project a redirect to the todo list
   */
  createProject() {
    console.log(this.name.value, this.description.value, this.start_date.value, this.end_date.value);
    this.storage.add(this.name.value, this.description.value, this.start_date.value, this.end_date.value
      );

    this.router.navigate(['/tasks'])
  }
}
