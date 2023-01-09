export class Project {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  developers: object;
  technologies: object;

  constructor(id: number = null,name: string = '', description: string = '', start_date: string = '',
   end_date: string = '', developers: object = [],technologies: object = []) 
  {
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
    this.id = id;
    this.developers = developers;
    this.technologies = technologies;
  }
}
