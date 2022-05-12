import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FlightListComponent } from '../flight-list/flight-list.component';
import { FlightService } from '../flight.service';
import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  
  displayedColumns: string[] = ['name','fromPlace','toPlace','startDateTime','endDateTime','sheduledDay','instrumentType',
  'totalBusinessClassSeats','totalNonBusinessClassSeats','ticketCost','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private toast:ToastrService, 
    private dialog:MatDialog,
    private flight:FlightService,
    private router:Router) { }

  ngOnInit(): void {
    this.getAllFlights();
  }

  openDialog() {
    this.dialog.open(FlightListComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllFlights();
      }
    });
  }

  editFlight(row:any){
    this.dialog.open(FlightListComponent,{
        width:'30%',
        data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllFlights();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllFlights(){
    this.flight.GetAllFlights()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(res);
        //console.log(res[0].startDateTime);
      },
      error:(err)=>
      {
        this.toast.error("something went wrong")
        // alert("something went wrong");
      }

    })
  }
  deleteFlight(id:number){
    this.flight.DeleteFlights(id)
    .subscribe({
      next:(res)=>
      {
        this.toast.error("Deleted successfully")
        this.getAllFlights();
      },
      error:()=>
      {
        this.toast.error("something went wrong")
      }

    })
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  openBooking(){
    this.router.navigate(['/bookingHistory']);
  }

  isAdmin(){
    if(localStorage.getItem('isAdmin')==="true")
       return true;
    else   
       return false;
  }

  isUser(){
    console.log(localStorage.getItem('isAdmin'));
    if(localStorage.getItem('isAdmin')==="true")
       return false;
    else   
       return true;
  }

  addBooking(id:string){
    console.log(id);
    localStorage.setItem('FlightId',id);
    this.router.navigate(['/addbooking']);
    
  }

  bookFlight(id:number){

  }
  

}
