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

  // formModel = this.fb.group({
  //   UserName :['',Validators.required],
  //   Email:['',[Validators.required,Validators.email]],
  //   Passwords : this.fb.group({
  //     Password:['',[Validators.required,Validators.minLength(5)]],
  //     ConfirmPassword:['',Validators.required]
  //   },{validator : this.comparePasswords}),
  //   Gender:[''],
  //   IsAdmin:['true']
  // })

  // comparePasswords(fb: FormGroup){
  //   let confirmPasswordCtrl = fb.get('ConfirmPassword');
  //   if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
  //     if(fb.get('Password').value != confirmPasswordCtrl.value){
  //       confirmPasswordCtrl.setErrors({passwordMismatch:true});
  //     }
  //     else{
  //       confirmPasswordCtrl.setErrors(null);
  //     }
  //   }
  // }

  // OnSubmit(e:any){
  //   this.formModel.get('Gender').setValue(e.target.value);
  // }

  // register() 
  // {
  //     var body = {
  //     UserName: this.formModel.value.UserName,
  //     Email: this.formModel.value.Email,
  //     IsAdmin: this.formModel.value.IsAdmin,
  //     Gender: this.formModel.value.Gender,
  //     Password: this.formModel.value.Passwords.Password
  //   };
  //   return this.http.post(this.BaseURI, body);
  // }
  //     .subscribe(res=> {
  //         alert("signup success");
  //       this.formModel.reset;
  //       this.router.navigate(['login']);
  //     },err=>{
  //       alert("something went wrong")
  //     })
  // }
    //signUp(){
      //   this.http.post<any>("http://localhost:9006/api/users/RegisterUser",this.signupForm.value)
      //   .subscribe(res=> {
      //     alert("signup success");
      //   this.signupForm.reset;
      //   this.router.navigate(['login']);
      // },err=>{
      //   alert("something went wrong")
      // })
    
}
