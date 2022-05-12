import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient) { }


PostFlight(data:any){
  return this.http.post<any>("http://localhost:9007/api/v1.0/flight/register/",data);
}

GetAllFlights(){
  return this.http.get<any>("http://localhost:9007/api/v1.0/flight/search");
}

UpdateFlights(data:any,id:number){
  return this.http.put<any>("http://localhost:9007/api/v1.0/flight/updateAirline/"+id,data);
}

DeleteFlights(id:number){
  return this.http.delete<any>("http://localhost:9007/api/v1.0/flight/RemoveAirline/"+id);
}

GetAllBooking(email:string){
  return this.http.get<any>("http://localhost:9007/api/Booking/BookingHistory/"+email);
}

AddBooking(id:number,data:any){
  return this.http.get<any>("http://localhost:9007/api/Booking/Shedulebooking/"+id,data);
}

}