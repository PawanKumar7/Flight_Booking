import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { UserListComponent } from './user-list/user-list.component';
import { FlightComponent } from './flight/flight.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FlightListComponent } from './flight-list/flight-list.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './booking/booking.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import { AirlineComponent } from './airline/airline.component';
import { FlightsheduleComponent } from './flightshedule/flightshedule.component';
import { FlightshedulelistComponent } from './flightshedulelist/flightshedulelist.component';
import { PassengerComponent } from './passenger/passenger.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    UserListComponent,
    FlightComponent,
    FlightListComponent,
    BookingComponent,
    BookingDialogComponent,
    AirlineComponent,
    FlightsheduleComponent,
    FlightshedulelistComponent,
    PassengerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,
    MatRadioModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    
  ],
  providers: [UserService,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
