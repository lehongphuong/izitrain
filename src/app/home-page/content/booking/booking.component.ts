import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';
import { TripModel } from '../../../common/models/trip-model';
import { UserModel } from '../../../common/models/user-model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]*')
  ]);

  cmndFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{9}')
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  bornFormControl = new FormControl('', [
    Validators.required
  ]);

  addressFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  minDate = new Date();
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
      this.numberTicket = Number(this.api.cookie.getCookie('numberTicket'));
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
    if (this.api.cookie.getCookie('userModel') != null) {
      this.userModel = this.api.toObject(this.api.cookie.getCookie('userModel'));
      this.userModel.born = new Date(this.userModel.born);
    }

  }

  /**
   * onPaymentClick
   */
  onPaymentClick() {
    if (this.nameFormControl.status == "VALID"
      && this.cmndFormControl.status == "VALID"
      && this.phoneFormControl.status == "VALID"
      && this.emailFormControl.status == "VALID"
      && this.bornFormControl.status == "VALID"
      && this.addressFormControl.status == "VALID"
    ) {
      // save data user to cookie
      this.userModel.born = this.userModel.born.toString();
      this.api.cookie.setCookie('userModel', this.api.toJson(this.userModel));
      this.userModel.born = new Date(this.userModel.born);

      // create path for seo and go to list 
      const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
      const path = '/payment/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
      this.api.navigate(path);
    }
  }

}
