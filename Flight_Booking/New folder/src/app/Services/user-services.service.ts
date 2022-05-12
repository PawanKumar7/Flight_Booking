import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  // baseURL="http://localhost:7000/User/RegisterUser"
  baseURL="http://localhost:7000/User/UserRegister"

  constructor(private http:HttpClient) { }

  
  registerUser(data:any){
    let headers= new HttpHeaders()
.set('content-type', 'application/json')
.set('Access-Control-Allow-Origin', '*');
    return this.http.post(this.baseURL, data, {'headers' : headers} ).subscribe((result) =>{
      alert("SignUp 12 Successfully!!");
      console.log("Register", result);
      
    }, error=>{
      alert("Something went wrong.");
      console.log("Registration not completed.", data);
    });
    
  }

}
