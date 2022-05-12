import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FlightsheduleService } from '../flightshedule.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-flightshedulelist',
  templateUrl: './flightshedulelist.component.html',
  styleUrls: ['./flightshedulelist.component.css'],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class FlightshedulelistComponent implements OnInit {

  public flightForm!:FormGroup;
  constructor(private fb:FormBuilder,
    private router:Router,
    private toast:ToastrService,
    private flight:FlightsheduleService,
    private dialogRef: MatDialogRef<FlightshedulelistComponent>,
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
      airlineId:[''],
      fromPlace:[''],
      toPlace:[''],
      startDateTime :[''],
      endDateTime:[''],
      sheduledDay:[''],
      instrumentUsed:[''],
      totalBCSeats:[''],
      totalNBCSeats:[''],
      bcTicketCost:[''],
      nBcTicketCost:[''],
      mealType:['']
    }),
    console.log(this.editData);

    if(this.editData!=null){
      console.log("yes");
      this.actionBtn ='update';
      this.flightForm.controls['airlineId'].setValue(this.editData.airlineId);
      this.flightForm.controls['fromPlace'].setValue(this.editData.fromPlace);
      this.flightForm.controls['toPlace'].setValue(this.editData.toPlace);
      this.flightForm.controls['sheduledDay'].setValue(this.editData.sheduledDay);
      this.flightForm.controls['instrumentUsed'].setValue(this.editData.instrumentUsed);
      this.flightForm.controls['totalBCSeats'].setValue(this.editData.totalBCSeats);
      this.flightForm.controls['totalNBCSeats'].setValue(this.editData.totalNBCSeats);
      this.flightForm.controls['bcTicketCost'].setValue(this.editData.bcTicketCost);
      this.flightForm.controls['nBcTicketCost'].setValue(this.editData.nBcTicketCost);
      this.flightForm.controls['startDateTime'].setValue(this.editData.startDateTime);
      this.flightForm.controls['endDateTime'].setValue(this.editData.endDateTime);
      this.flightForm.controls['mealType'].setValue(this.editData.mealType);
    }

  }

  
  addFlight(){
    console.log(this.editData);
    if(!this.editData){
    //console.log(this.flightForm.value);
    this.date1 = this.flightForm.get('startDateTime').value;
    this.flightForm.get('startDateTime').setValue(this.date1.toISOString());
    this.date2 = this.flightForm.get('endDateTime').value;
    this.flightForm.get('endDateTime').setValue(this.date2.toISOString());


    if(this.flightForm.valid){
      this.flight.PostFlight(this.flightForm.value)
      .subscribe({
        next:(res) =>{
          console.log(res);
          //alert("Flight added successfully");
          this.toast.success("Flight added successfully")
          this.flightForm.reset();
          this.dialogRef.close('save');
       },
       error:()=>{
         //alert("Error occured")
         this.toast.error("Error occured")
       }
     })
      }
    }
    else{
      
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

  


}
