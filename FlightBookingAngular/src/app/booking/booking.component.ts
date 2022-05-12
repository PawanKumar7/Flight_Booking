import {AfterViewInit, ViewChild,Component, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  
  displayedColumns: string[] = ['PNR','FlightId','EmailId','TotalCost','NoOfSeats',
  'BookingStatus','action'];
  dataSource: MatTableDataSource<any>;
  name:string;
  id:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private flight:FlightsheduleService,
    private router:Router,
    private toast:ToastrService) {
    this.name = localStorage.getItem('userName');
    this.id = localStorage.getItem('userId');
   }

  ngOnInit(): void {
    this.getBooking();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 

  getBooking(){
    
    this.flight.GetAllBooking(this.id)
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>
      {  
          this.toast.error("Something went wrong");
          
      }
    

    })
  }

  cancelTicket(id:number){
    this.flight.cancelTicket(id).subscribe({
      next:(res)=>
        {
          this.toast.info("Ticket Cancelled")
          this.getBooking();
      },
      error:(err)=>
      {  
          this.toast.error("Something went wrong, try again later");
          
      }

    })
    
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  

}
