export class Developer {
    id: number;
    first_name: string;
    last_name: string;
    project_id: number;
  
    constructor(id: number = null,first_name: string = '', last_name: string = '',project_id = null) 
    {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.project_id = project_id;
    }
  }
  