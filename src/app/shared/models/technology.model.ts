export class Technology {
    id: number;
    name: string;
    project_id: number;

  
    constructor(id: number = null,name: string = '',project_id = null) 
    {
      this.id = id;
      this.name = name;
      this.project_id = project_id;
    }
  }
  