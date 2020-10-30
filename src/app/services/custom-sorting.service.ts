import { Injectable } from '@angular/core';
import {SortableColumn} from '../sorting/sortable-column';

@Injectable({
  providedIn: 'root'
})
export class CustomSortingService {

  constructor() { }
  public getSortableColumn(sortableColumns: SortableColumn[]): SortableColumn{
    return sortableColumns.find(
      column => column.direction != null
    );
  }
  public clearPreviousSorting(chosenColumn: SortableColumn, sortableColumns: SortableColumn[]): void{
    sortableColumns.filter(
      column => column !== chosenColumn
    ).forEach(
      column => column.direction = null
    );
  }
}
