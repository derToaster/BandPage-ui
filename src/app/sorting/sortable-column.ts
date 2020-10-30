export class SortableColumn {
  id: string;
  name: string;
  title: string;
  direction: string;


  constructor(id: string, name: string, title: string, direction: string) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.direction = direction;
  }

  public toggleDirection(): void {
    if (this.direction === 'desc'){
      this.direction = null;
    }else if (this.direction === 'asc'){
      this.direction = 'desc';
    }else {
      this.direction = 'asc';
    }
  }
}
