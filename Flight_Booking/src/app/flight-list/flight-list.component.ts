import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightService } from '../flight.service';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class FlightListComponent implements OnInit {

  public flightForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private flight:FlightService,
    private dialogRef: MatDialogRef<FlightListComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any
    ) { }
  gender=['Male','Female'];
  date1:Date;
  date2:Date;
  str1:string;
  str2:string;
  actionBtn:string ='save';

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      name:[''],
      fromPlace:[''],
      toPlace:[''],
      startDateTime :[''],
      endDateTime:[''],
      sheduledDay:[''],
      instrumentType:[''],
      totalBusinessClassSeats:[''],
      totalNonBusinessClassSeats:[''],
      ticketCost:['']
    }),
    console.log("this"+this.editData);

    if(this.editData){
      this.actionBtn ='update';
      this.flightForm.controls['name'].setValue(this.editData.name);
      this.flightForm.controls['fromPlace'].setValue(this.editData.fromPlace);
      this.flightForm.controls['toPlace'].setValue(this.editData.toPlace);
      this.flightForm.controls['sheduledDay'].setValue(this.editData.sheduledDay);
      this.flightForm.controls['instrumentType'].setValue(this.editData.instrumentType);
      this.flightForm.controls['totalBusinessClassSeats'].setValue(this.editData.totalBusinessClassSeats);
      this.flightForm.controls['totalNonBusinessClassSeats'].setValue(this.editData.totalNonBusinessClassSeats);
      this.flightForm.controls['ticketCost'].setValue(this.editData.ticketCost);
      this.flightForm.controls['startDateTime'].setValue(this.editData.startDateTime);
      this.flightForm.controls['endDateTime'].setValue(this.editData.endDateTime);
    }

  }

  addFlight(){
    
    if(!this.editData){
    //console.log(this.flightForm.value);
    this.date1 = this.flightForm.get('startDateTime').value;
    this.flightForm.get('startDateTime').setValue(this.date1.toISOString());
    this.date2 = this.flightForm.get('endDateTime').value;
    this.flightForm.get('endDateTime').setValue(this.date2.toISOString());


    if(this.flightForm.valid){
      console.log(this.flightForm.value);
      this.flight.PostFlight(this.flightForm.value)
      .subscribe({
        next:(res) =>{
          console.log(res);
          alert("Flight added successfully");
          this.flightForm.reset();
          this.dialogRef.close('save');
       },
       error:()=>{
         alert("Error occured")
       }
     })
      }
    }
    else{
      
      // this.date1 =new Date(this.flightForm.get('startDateTime').value);
      // this.flightForm.get('startDateTime').setValue(this.date1.toISOString());
      // this.date2 = new Date(this.flightForm.get('endDateTime').value);
      // this.flightForm.get('endDateTime').setValue(this.date2.toISOString());

      // this.str1 = this.flightForm.get('startDateTime').value;
      // this.flightForm.get('startDateTime').setValue(new Date(Date.parse(this.str1)));
      // this.str2 = this.flightForm.get('endDateTime').value;
      // this.flightForm.get('endDateTime').setValue(new Date(Date.parse(this.str2)));
      console.log(this.flightForm);
      this.updateFlight();
    }
  //  console.log(this.flightForm.value);
  }
  updateFlight(){
    this.flight.UpdateFlights(this.flightForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("updated successfully");
        this.flightForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        console.log(err);
        alert("Error Occured");
      }
      
    })
  }

  

  //todayISOString : string = new Date().toISOString();
  

}
