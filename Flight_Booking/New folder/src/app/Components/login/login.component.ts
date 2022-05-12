import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  constructor(private formBuilder:FormBuilder,private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.createLoginFormControl();
    this.createLoginForm();
  }

  emailId:any;
  password:any;

  createLoginFormControl(){
    this.emailId=new FormControl('', [Validators.required, Validators.email]);
    this.password=new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
    
  }

  createLoginForm(){
    this.loginForm=new FormGroup({
        emailId: this.emailId,
        password: this.password,
          
    });
  }

  login(){
    this.http.get<any>("http://localhost:7001/api/v1.0/User/UserList")
.subscribe(result=> {
  const user=result.find((a:any)=>{
    return a.emailId === this.loginForm.value.emailId && a.password === this.loginForm.value.password
  });
  if(user){
    alert("Login Success!!");
    console.log("Login Success!!.", this.loginForm.value);
    this.loginForm.reset();
    this.router.navigate(['home']);
  } else {
    alert("User not found.");
    console.log("Login not successfull", this.loginForm.value);
    // this.loginForm.reset();
    }
  }, error=>{
    alert("Something went wrong.")
    console.log("Something went wrong.", this.loginForm.value);

  })
    // this.loginAuth
    // .loginUser([this.loginForm.value.emailId, this.loginForm.value.password])
    // .subscribe((result) => {
    //   if (result == 'Failure'){
    //     this.isUserValid=false;
    //     alert("Login Unsuccessful");
    //   console.log("Login Not Successful.");

    //   } else{
    //     this.isUserValid=false;
    //     alert("Login Successful");
    //   console.log("Login Successful.")
    //   }
    // });
  }

  // get emailId():FormControl{
  //   return this.loginForm.get('emailId') as FormControl;
  // }
  // get password():FormControl{
  //   return this.loginForm.get('password') as FormControl;
  // }
  


}
