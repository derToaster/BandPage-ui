import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {IUser} from '../../models/IUser';
import { Observable, of as observableOf, merge } from 'rxjs';
import {BandService} from '../../services/band.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';


export class DataTableDatasource extends DataSource<IUser>{
  data: Observable<IUser[]> = this.userService.users;
  paginator: MatPaginator;
  sort: MatSort;


  constructor(private userService: BandService) {
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<IUser[] | ReadonlyArray<IUser>> {
    return this.data;
}
 disconnect(collectionViewer: CollectionViewer) {
}
  private getPagedData(data: IUser[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IUser[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(a.username, b.username, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'instrument': return compare(a.instrument, b.instrument, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

