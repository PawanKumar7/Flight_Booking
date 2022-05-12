import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedError:boolean =false;
  constructor(private fb: FormBuilder,
  private user:UserService,
  private router: Router,
  private toast:ToastrService){}
      
  
  public loginForm!:FormGroup;
  ngOnInit(): void {

    this.loginForm = this.fb.group({
        UserName:[''],
        Password:['']
    })
  }

  UserLogin(){
    
    var body = {
      UserName: this.loginForm.value.UserName,
      Password: this.loginForm.value.Password
   }
    console.log(body);
    
    if(this.loginForm.valid){
      this.user.LoginUser(body)
      .subscribe({
        next:(res:any) =>{
          //console.log(res);
          localStorage.setItem('userToken',res.token);
          localStorage.setItem('userName',res.username);
          localStorage.setItem('userId',res.userId);
          localStorage.setItem('email',res.email);
          localStorage.setItem('isAdmin',res.isAdmin);
          //console.log(localStorage.getItem('email'));
          //alert("Login Success");
          console.log(localStorage.getItem('isAdmin'));
          
          if(localStorage.getItem('isAdmin')==="true"){
            this.toast.success("Login success")
            this.router.navigate(['/airline'])
          }
          else{
            this.toast.success("Login success")
            this.router.navigate(['/flightshedule'])
          }
          

          
       },
       error:(err:HttpErrorResponse)=>{
         this.isLoggedError = true;
         //alert("Incorrect username or password")
          this.toast.error("Enter valid credentials")
       }
     })
      
    }
  }

}
