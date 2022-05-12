import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, FormGroup,FormControl,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
//import { PassengerComponent } from '../passenger/passenger.component';


@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css']
})
export class BookingDialogComponent implements OnInit {

  public bookForm!:FormGroup;
  
  constructor(private router: Router,private fb:FormBuilder,private flight:FlightsheduleService) { }

  classtype:Array<string>=['NB-Class','B-Class'];
  gender:Array<string>=['Male','Female'];
  discount:Array<any>;

  public PassengerList:FormGroup;
  
  ngOnInit(): void {

    this.getDiscount();

    this.bookForm = this.fb.group({

      NoOfSeats:[''],
      ClassType:[''],
      JourneyType:[''],
      EmailId:[localStorage.getItem('email')],
      FlightId:[Number(localStorage.getItem('FlightId'))],
      UserId:[Number(localStorage.getItem('userId'))],
      DiscountId : [1],
      ReturnDate:[''],
      PNR:[''],
      PassengerList: this.fb.array([])

    })
  }

 
 

 get pass(){
   return this.bookForm.controls["PassengerList"] as FormArray;
 }

 addPass(){
    const form = this.fb.group({
      PassengerName:[''],
      Age:[''],
      Gender:[''],
      SeatNo:[''],
    });
    this.pass.push(form);
 }

 getFormGroup(control: AbstractControl) { return control as FormGroup; }

 submit(){
     console.log(this.bookForm.value);
    
     this.flight.Bookticket(this.bookForm.value).
     subscribe({
       next:()=>{
         alert("Booking done");
       },
       error:()=>
       {
           alert("some Error occured");
       }
       
     })
  }

  backToShedule(){
     this.router.navigate(['/flightshedule']);
  }



  removePass(id:number){
      this.pass.removeAt(id);
  }

  getDiscount(){
    this.flight.GetDiscountList().
     subscribe({
       next:(res)=>{
         console.log(res);
         this.discount = res;
       },
       error:()=>
       {
           alert("some Error occured");
       }
       
     })
  }

  addReturnDate(){
    let elem: HTMLElement= document.getElementById("date");
    elem.setAttribute("style", "display:inline;");
    
  }

  removeReturnDate(){
    let elem: HTMLElement= document.getElementById("date");
    elem.setAttribute("style", "display:none;");
    
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
