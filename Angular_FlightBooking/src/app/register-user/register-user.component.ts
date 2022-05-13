import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  public userForm!:FormGroup;
  gender:string[]=['Male','Female'];
  //constructor(private formBuilder: FormBuilder,private http: HttpClient, private router:Router) { }
  constructor(public service : UserService,
    private fb: FormBuilder,
    private router:Router,
    private user:UserService,private toast:ToastrService){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      UserName:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Passwords : this.fb.group({
        Password:['',[Validators.required,Validators.minLength(5)]],
        ConfirmPassword:['',Validators.required]
      },{validator : this.comparePasswords}),
      Gender:['',Validators.required],
      IsAdmin:['false']
    })
  }

  


  comparePasswords(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if(confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if(fb.get('Password').value != confirmPasswordCtrl.value){
        confirmPasswordCtrl.setErrors({passwordMismatch:true});
      }
      else{
        confirmPasswordCtrl.setErrors(null);
      }
    }
  }



  addUser(){
    
    var body = {
      UserName: this.userForm.value.UserName,
      Email: this.userForm.value.Email,
      IsAdmin: this.userForm.value.IsAdmin,
      Gender: this.userForm.value.Gender,
      Password: this.userForm.value.Passwords.Password
   }
    //console.log(body);
    
    if(this.userForm.valid){
      this.user.PostUser(body)
      .subscribe({
        next:(res) =>{
          this.toast.success("User added successfully")
          alert("User added successfully");
          this.userForm.reset();
          this.router.navigate(['login']);
       },
       error:()=>{
        this.toast.error("Error occured")

       }
     })
      
    }
  }  
}