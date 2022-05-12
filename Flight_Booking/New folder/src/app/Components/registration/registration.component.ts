import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { UserServicesService } from 'src/app/Services/user-services.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public registrationForm!: FormGroup;
  ConfirmPass: string = 'none';

  constructor(private userService: UserServicesService, private formBuilder: FormBuilder,private http: HttpClient, private router: Router) { }


  // Gender: string[]=['Male','Female','Others']

  ngOnInit(): void {
    this.createFormControl();
    this.createForm();
  }

  userName:any;
  firstName:any;
  lastName:any;
  admin:any;
  emailId:any;
  password:any;
  confirmPassword:any;
  mobileNo:any;
  // gender:any;

  createFormControl(){
    this.userName=new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.firstName=new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]);
    this.lastName=new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern("[a-zA-Z].*")]);
    // this.age=new FormControl('', [Validators.required,Validators.pattern("[0-9]*")]);
    // this.address=new FormControl('', [Validators.required, Validators.minLength(2)]);
    // this.admin=new FormControl('', [Validators.required]);
    this.emailId=new FormControl('', [Validators.required, Validators.email]);
    this.password=new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
    this.confirmPassword=new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
    this.mobileNo=new FormControl('',  [Validators.required,Validators.pattern("[0-9]*"), Validators.minLength(10)]);
    // this.gender=new FormControl('', [Validators.required]);

  }

  createForm(){
    this.registrationForm=this.formBuilder.group({
        userName:this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        // age: this.age,
        // address: this.address,
        // admin: this.admin,
        emailId: this.emailId,
        password: this.password,
        confirmPassword: this.confirmPassword,
        mobileNo: this.mobileNo,
        // gender: this.gender,

    });
  }

  register(){
    console.log("Register", this.registrationForm.value);

    this.userService.registerUser(this.registrationForm.value);
    // alert("SignUp Successfully!!");
    this.registrationForm.reset();

  }


  register1(){
    this.http.post<any>("http://localhost:7001/api/v1.0/User/RegisterUser", this.registrationForm.value)
    .subscribe(result=> {
    alert("SignUp Successfully!!");
    console.log("Registration completed.", this.registrationForm.value);
    this.registrationForm.reset();
    this.router.navigate(['login']);
    }, error=>{
      alert("Something went wrong.");
      console.log("Registration not completed.", this.registrationForm.value);
    });

    //Confirm Password Validation
      if (this.password.value==this.confirmPassword.value){
        console.log(this.registrationForm);
        this.ConfirmPass ='none'
        } else {
          this.ConfirmPass ='inline'
        }
  }

}
