import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  
  isAdmin(){
    if(localStorage.getItem('isAdmin')==="true")
       return true;
    else   
       return false;
  }

  isUser(){
    console.log(localStorage.getItem('isAdmin'));
    if(localStorage.getItem('isAdmin')==="true")
       return false;
    else   
       return true;
  }

}
