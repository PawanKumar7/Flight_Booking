import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  baseServerUrl = "http://localhost:7001/api/v1.0/";

  // @CrossOrigin(origins = "http://localhost:4200")
  // @GetMapping("/yourPath")

//  header= new HttpHeaders()
//  header.Add("Access-Control-Allow-Origin", "*")
//  header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
//  header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
// .set('content-type', 'application/json')
// .set('Access-Control-Allow-Origin', '*');

// headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
//   'Authorization': 'Bearer key',
// });

// {'headers' : this.headers}

  registerUser(data:any){
    return this.http.post(this.baseServerUrl + "User/RegisterUser", data );
  }


  // loginUser(loginInfo: Array<string>){
  //   return this.http.post(
  //     this.baseServerUrl+ 'LoginUser', 
  //     {
  //     emailId: loginInfo[0],
  //     password: loginInfo[1],
  //     },
  //     {
  //       responseType: 'text',
  //     }
  //   );
  // }
}
