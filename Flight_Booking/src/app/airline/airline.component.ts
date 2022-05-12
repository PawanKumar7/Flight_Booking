import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AirlineService } from '../airline.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {

  constructor(private airline :AirlineService) { }

  ngOnInit(): void {
    this.GetAllAirline();
  }
  displayedColumns: string[] = ['name','contact','address','status','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetAllAirline(){
      this.airline.GetAllAirlines()
    .subscribe({
      next:(res:any)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(res);
        //console.log(res[0].startDateTime);
      },
      error:(err)=>
      {
        alert("something went wrong");
      }
      })
  }

  BlockAirline(id:number){
     this.airline.BlockAirline(id)
    .subscribe({
      next:(res)=>{
        alert("Airline Blocked");
          this.GetAllAirline();
      },
      
      error:(err)=>
      {
        alert("something went wrong");
      }
      })
  }

  UnblockAirline(id:number){
     this.airline.UnblockAirline(id)
    .subscribe({
      next:(res)=>{
        alert("Airline Unlocked successful");
          this.GetAllAirline();
      },
      
      error:(err)=>
      {
        alert("something went wrong");
      }
      })
  }

}
