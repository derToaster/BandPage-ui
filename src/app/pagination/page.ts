import {Pageable} from './pageable';
import {Sort} from './sort';

export class Page<T> {
  content: Array<T>;
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort;
  numberOfElements: number;
  size: number;
  number: number;


  constructor() {
    this.pageable = new Pageable(20, 12);
  }
}
