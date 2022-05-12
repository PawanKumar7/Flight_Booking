import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchairline',
  templateUrl: './searchairline.component.html',
  styleUrls: ['./searchairline.component.css']
})
export class SearchairlineComponent implements OnInit {

  constructor(private toast:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

}
