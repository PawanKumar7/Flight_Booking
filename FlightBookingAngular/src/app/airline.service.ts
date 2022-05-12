import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http:HttpClient) { }

  

GetAllAirlines(){
  return this.http.get<any>("http://localhost:9005/api/v1.0/flight/search");
}

BlockAirline(id:number){
  return this.http.put<any>("http://localhost:9005/api/v1.0/flight/BlockAirline/"+id,null)
}

UnblockAirline(id:number){
  return this.http.put<any>("http://localhost:9005/api/v1.0/flight/UnblockAirline/"+id,null)
}

}
