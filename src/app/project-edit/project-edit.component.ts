import {Component, OnInit} from '@angular/core';
import {Project} from "../shared/models/project.model";
import {ApiService} from "../api.service";
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [ DatePipe ] 
})
export class ProjectEditComponent implements OnInit {

  project: Project;

  /**
   * Task id form field
   */
  id;

  /**
   * Task title form field
   */
  name = new FormControl('');
  description = new FormControl('');
  start_date = new FormControl('');
  end_date = new FormControl('');

  /**
   *  Task note form field
   */
  note = new FormControl('');

  editForm: FormGroup;

  constructor(private storage: ApiService, private route: ActivatedRoute,
     private router: Router,private formBuilder: FormBuilder,
   private datePipe: DatePipe) 
  {
  }

  /**
   * Load Projects on init
   */
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.project = this.storage.get(params.get('id'));
      this.project.start_date = this.datePipe.transform(this.project.start_date,'yyyy-MM-dd');
      this.project.end_date = this.datePipe.transform(this.project.end_date,'yyyy-MM-dd');
      this.id = this.project.id;
      console.log(this.project);

    });

    this.editForm = new FormGroup({

      name: new FormControl('', [Validators.required]),

      description: new FormControl('', Validators.required),

      start_date: new FormControl('', Validators.required),

      end_date: new FormControl('', Validators.required),

    });
    console.log(this.datePipe.transform(this.project.start_date,'dd/MM/yyyy'));
  }

  /**
   * Update the task and return to the list
   */
  updateProject() {
    this.project = this.storage.update(this.id, this.editForm.get('name').value, this.editForm.get('description').value,null,this.editForm.get('end_date').value);
    this.router.navigate(['/tasks'])
  }
}
