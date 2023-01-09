import {Injectable} from '@angular/core';
import {Project} from "./shared/models/project.model";
import {Developer} from "./shared/models/developer.model";
import { Technology  } from "./shared/models/technology.model";

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url: String = "http://127.0.0.1:3000";
  projects: Project[] = [];
  developers: Developer[] = [];
  technologies: Technology[] = [];

  /**
   * Whether data have already been loaded from storage
   */
  initialized: boolean = false;

constructor(private http: HttpClient){}

  /**
   * Returns all projects
   */
  getProjects(): Project[] {
    this.projects = [];
    this.http.get(this.base_url+'/projects').subscribe(data => {
          // console.log(data);

    for (let i = 0; i < Object.keys(data).length; i++) {
      this.projects.push(
        new Project(
          data[i]['id'],
          data[i]['name'],
          data[i]['description'],
          data[i]['start_date'],
          data[i]['end_date'],
          data[i]['developers'],
          data[i]['technologies'],

     ) );
    }
        },

    error => {
        console.log('Log the error here: ', error);
    });

    return this.projects;
      }

  
    getDevelopers(): Developer[] {
        this.developers = [];
        this.http.get(this.base_url+'/developers').subscribe(data => {
              // console.log(data);
    
        for (let i = 0; i < Object.keys(data).length; i++) {
          this.developers.push(
            new Developer(
              data[i]['id'],
              data[i]['first_name'],
              data[i]['last_name']
         ) );
        }
            },
    
        error => {
            console.log('Log the error here: ', error);
        });
    
        return this.developers;
    }

    getTechnologies(): Technology[] {
      this.technologies = [];
      this.http.get(this.base_url+'/technologies').subscribe(data => {
            // console.log(data);
  
      for (let i = 0; i < Object.keys(data).length; i++) {
        this.technologies.push(
          new Technology(
            data[i]['id'],
            data[i]['name']
       ) );
      }
          },
  
      error => {
          console.log('error ', error);
      });
  
      return this.technologies;
  }

  /**
   * Add Developer to Project
   *
   * @param developer developer id to add
   * @param project developer id to add
   */
  //  addDeveloperToProject(developer,project) {
  //   return this.http.post<Developer>(this.base_url+'/projects/',).subscribe(data => {
  //         console.log(data);
  //   }
  // }
  /**
   * Remove the Project
   *
   * @param id project id to remove
   */
  delete(id) {
    return this.http.delete(this.base_url+'/projects/'+ id).subscribe(data => {
        this.projects = this.getProjects();
          alert("Project Deleted!");
    },
    error => {
        console.log('Log the error here: ', error);
        alert(error.errors.error[0]);
    });;
  }


  /**
   * Remove the Developer
   *
   * @param id project id to remove
   */
   deleteDeveloper(developer_id, project_id = null) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        project_id: project_id,
      },
    };
    return this.http.delete(this.base_url+'/developers/'+ developer_id,options).subscribe(data => {
          console.log(data);
          alert("Developer Deleted!");
    },
    error => {
        console.log('error: ', error.error.errors[0].title);
        if(error.error.errors[0].status== 409){
          alert(error.error.errors[0].title + "\n" + error.error.errors[0].detail);
        }else{
          alert("Something went wrong!");
        }

    });;
  }

    /**
   * Remove the Technology 
   *
   * @param id project id to remove
   */
     deleteTechnology(technology_id, project_id = null) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          project_id: project_id,
        },
      };
      return this.http.delete(this.base_url+'/technologies/'+ technology_id,options).subscribe(data => {
            console.log(data);
            alert("Technology Deleted!");
      },
      error => {
          console.log('error: ', error.error.errors[0].title);
          if(error.error.errors[0].status== 409){
            alert(error.error.errors[0].title + "\n" + error.error.errors[0].detail);
          }else{
            alert("Something went wrong!");
          }
  
      });;
    }

  /**
   * Return the task based in the given id
   *
   * @param id
   */
  get(id): Project {

    for (let i = 0; i < this.projects.length; i++) {
      let task = this.projects[i];
      // we found the task to remove, we do not include it in our new array
      if (task.id != id) {
        continue;
      }
      return task;
    }

    return null;
  }

  // getDeveloper(id): Developer {

  //   this.http.get(this.base_url+'/developers/'+id).subscribe(data => {
  //         // console.log(data);

  //     this.developers.push(
  //       new Developer(
  //         data[i]['id'],
  //         data[i]['first_name'],
  //         data[i]['last_name'],
  //    ) );
    
  //       },

  //   error => {
  //       console.log('Log the error here: ', error);
  //   });

  //   return this.developers;

  // }

  updateDeveloper(id,first_name,last_name){
    let developer = new Developer(id,first_name, last_name);
    this.http.put<Developer>(this.base_url+'/developers/'+id, developer).subscribe(data => {
      console.log(data);
      alert("Developer Updated!");
    },
  error => {
    console.log('Error: ', error);
    alert(error.error.errors[0].details);
  });
  }


  /**
   * Create a new task based on the given data (+ generate a new id)
   * @param id
   * @param name
   * @param description   
   * @param start_date
   * @param end_date
   */
  add(name, description, start_date, end_date) {
    let task = new Project(null,name, description, start_date, end_date);
     this.http.post<Project>(this.base_url+'/projects', task).subscribe(data => {
          console.log(data);

    for (let i = 0; i < Object.keys(data).length; i++) {
      this.projects.push(
        new Project(
          data[i]['id'],
          data[i]['name'],
          data[i]['description'],
          data[i]['start_date'],
          data[i]['end_date'],
          data[i]['developers'],
          data[i]['technologies'],

     ));
    }
        },

    error => {
        console.log('Log the error here: ', error);
    });;
    // this.projects.push(task);
  }

  /**
   * Create a new developer
   * @param id
   * @param first_name
   * @param last_name   
   * @param project_id   
   */
   createDeveloper(first_name, last_name, project_id) {
    let developer = new Developer(null,first_name, last_name, project_id);
     this.http.post<Developer>(this.base_url+'/developers', developer).subscribe(data => {
          console.log(data);
          alert("Developer Created!");
          this.getDevelopers();
        },
    error => {
        console.log('Log the error here: ', error);
        alert(error.error.errors[0].detail);
    });;
    // this.projects.push(task);
  }

  /**
   * Create a new technology
   * @param id
   * @param name
   * @param project_id   
   */
   createTechnology(name, project_id) {
    let technology = new Technology(null,name, project_id);
     this.http.post<Technology>(this.base_url+'/technologies', technology).subscribe(data => {
          console.log(data);
          alert("Technology Created!");
        },
    error => {
        console.log('Error: ', error);
        alert(error);
    });
  }


  /**
   * Update the task and return it
   *
   * @param id
   * @param name
   * @param description
   * @param start_date
   * @param end_date
   *
   * @return Project
   */
  update(id, name: string, description: string, start_date: string, end_date: string): Project {

    let project = new Project(id,name, description,null,end_date);
    this.http.put<Project>(this.base_url+'/projects/'+id, project).subscribe(data => {
      console.log(data);
      alert("Project Updated!");
    },
  error => {
    console.log('Error: ', error);
    alert(error.error.errors[0].details);
  });

    return project;
  }

  /**
   * Load tasks from json file
   */
  init() {

    this.initialized = true;
  }

}
