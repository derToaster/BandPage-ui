// import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTable } from '@angular/material/table';
// import { ExampleDataSource, ExampleItem } from './example-datasource';
//
// @Component({
//   selector: 'app-example',
//   templateUrl: './example.component.html',
//   styleUrls: ['./example.component.css']
// })
// export class ExampleComponent implements AfterViewInit, OnInit {
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   @ViewChild(MatSort) sort: MatSort;
//   @ViewChild(MatTable) table: MatTable<ExampleItem>;
//   dataSource: ExampleDataSource;
//
//   /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
//   displayedColumns = ['id', 'name'];
//
//   ngOnInit() {
//     this.dataSource = new ExampleDataSource();
//   }
//
//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//     this.table.dataSource = this.dataSource;
//   }
// }
