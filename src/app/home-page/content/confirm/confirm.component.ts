import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { TripModel } from '../../../common/models/trip-model';
import { UserModel } from '../../../common/models/user-model';
import { ApiService } from '../../../common/api-service/api.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  minDate = new Date();

  paymentWith: string = '0';
  tripModel: TripModel = {
    id: '',
    idCompany: '',
    idTrain: '',
    start_date: '',
    start_time_train: '',
    end_time_train: '',
    type_ticket: '0',
    price_origin: '',
    price: '',
  };

  userModel: UserModel = {
    name: '',
    cmnd: '',
    phone: '',
    email: '',
    born: '',
    address: '',
  };

  tripsTemp: any[] = [];
  trips: any[] = [];
  numberTicket: number = 1;
  totalPrice: number = 0;
  tripBook: any;
  start_date: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    // load data history from cookie 
    if (this.api.cookie.getCookie('trip') != null) {
      this.tripModel = this.api.toObject(this.api.cookie.getCookie('trip'));
      console.log(this.tripModel);
      this.start_date = this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    }

    // load data history from cookie 
    if (this.api.cookie.getCookie('numberTicket') != null) {
      this.numberTicket = Number(this.api.cookie.getCookie('numberTicket')) + 1;
      console.log(this.numberTicket);
    }

    // load data history from cookie 
    console.log('c');
    if (this.api.cookie.getCookie('tripBook') != null) {
      this.tripBook = this.api.toObject(this.api.cookie.getCookie('tripBook'));
      console.log(this.tripBook);

      // calculator money
      this.totalPrice = this.numberTicket * Number(this.tripBook.price);
    }

    // load data user
    if (this.api.cookie.getCookie('user') != null) {
      this.userModel = this.api.toObject(this.api.cookie.getCookie('user'));
      console.log('userModel', this.userModel);

    }
  }
}
