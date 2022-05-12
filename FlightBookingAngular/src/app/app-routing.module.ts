import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './booking/booking.component';
import { FlightComponent } from './flight/flight.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AirlineComponent } from './airline/airline.component';
import { FlightsheduleComponent } from './flightshedule/flightshedule.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightshedulelistComponent } from './flightshedulelist/flightshedulelist.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchairlineComponent } from './searchairline/searchairline.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},     //done -
  {path:'login',component:LoginComponent},          //done -
  {path:'homes', component:AdminHomeComponent,canActivate:[AuthGuard] },    //done -
  {path:'home', component:UserHomeComponent,canActivate:[AuthGuard] },      //done -
  // {path:'flight',component:FlightComponent},
  {path:'viewAirlines__Not_Working',component:FlightComponent,canActivate:[AuthGuard]},    //done -
  {path:'flightlist__Not_Working', component:FlightListComponent,canActivate:[AuthGuard]},   //done -
  {path:'signup',component:RegisterUserComponent},    //done -
  {path:'bookingHistory',component:BookingComponent,canActivate:[AuthGuard]}, //done -
  {path:'addbooking',component:BookingDialogComponent,canActivate:[AuthGuard]},   //done -
  // {path:'airline',component:AirlineComponent},
  {path:'manageAirline',component:AirlineComponent,canActivate:[AuthGuard]},  //done -
  // {path:'flightschedule',component:FlightsheduleComponent},
  {path:'viewAirlines',component:FlightsheduleComponent,canActivate:[AuthGuard]},
  {path:'flightlist',component:FlightshedulelistComponent},
  {path:'contacts',component:ContactsComponent,canActivate:[AuthGuard]},
  {path:'searchAirline',component:SearchairlineComponent,canActivate:[AuthGuard]},

  { path:'**', component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
