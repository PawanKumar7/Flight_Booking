import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder,FormControl,FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css']
})
export class PassengerComponent {

  @Input()
  public passForm:FormGroup;
  constructor() { }

  static addPassItem():FormGroup{
      return new FormGroup({
        PassengerName:new FormControl(),
        Age:new FormControl(),
        SeatNo:new FormControl(),
        Gender:new FormControl()

      })
  }

}
