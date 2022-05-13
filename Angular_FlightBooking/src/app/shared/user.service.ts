import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http: HttpClient,private router:Router) { }
  readonly BaseURL = 'http://localhost:9006/api/users/RegisterUser';


  PostUser(data:any){
    return this.http.post<any>("http://localhost:9006/api/users/RegisterUser",data);
  }

  LoginUser(data:any){
    
    return this.http.post<any>("http://localhost:9005/api/authenticate",data);
  }    
}
