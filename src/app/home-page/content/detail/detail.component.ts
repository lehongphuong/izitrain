import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common/api-service/api.service';
import { TripModel } from '../../../common/models/trip-model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

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

  tripsTemp: any[] = [];
  trips: any[] = [];
  numberTicket: number = 1;
  totalPrice: number = 0;
  tripBook: any = {
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

  constructor(private api: ApiService) { }

  ngOnInit() {
    // load data history from cookie 
    if (this.api.cookie.getCookie('trip') != null) {
      this.tripModel = this.api.toObject(this.api.cookie.getCookie('trip'));
      this.tripModel.start_date = new Date(this.tripModel.start_date);
      console.log('a', this.tripModel);
    }

    // load data history from cookie 
    if (this.api.cookie.getCookie('numberTicket') != null) {
      this.numberTicket = Number(this.api.cookie.getCookie('numberTicket')) + 1;
      console.log('b', this.numberTicket);
    }

    // load data history from cookie  
    console.log('phuong',this.api.cookie.getCookie('tripBook'));
    
    if (this.api.cookie.getCookie('tripBook') != null) {
      this.tripBook = this.api.toObject(this.api.cookie.getCookie('tripBook'));
      console.log('c', this.tripBook);
      // calculator money
      this.totalPrice = this.numberTicket * Number(this.tripBook.price);
    }

    // create data trip mock
    // this.createMockTrips();

    console.log('phuong oi',this.trips); 

    // get list trip of train
    this.trips = this.trips.filter(trip => {
      if (trip.start_date == this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy')
        && trip.type_ticket == this.tripModel.type_ticket
        && trip.company == this.tripBook.idCompany) {
        return true;
      }
      return false;
    }); 

    console.log('phuong oi',this.trips); 
  }


  /**
   * on Booking Click
   */
  onBookingClick() {
    // update number ticket
    this.api.cookie.setCookie('numberTicket', this.numberTicket);

    // create path for seo and go to list 
    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    const path = '/booking/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    this.api.navigate(path);
  }

  /**
   * on Booking Click
   */
  onSelectClick() {
    // this.api.navigate('/booking');
  }

  /**
   * on change number ticket
   */
  onChangeNumberTicket() {
    // calculator money
    this.totalPrice = this.numberTicket * Number(this.tripBook.price);
  }


  createMockTrips() {
    // mock data
    this.trips = [
      {
        id: '1',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '08:00',
        end_time_train: '08:30',
        type_ticket: '0',
        price_origin: '140',
        price: '178000',
        number_seat: 14,
        totalSeat: 152
      },
      {
        id: '2',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '09:00',
        end_time_train: '09:30',
        type_ticket: '0',
        price_origin: '140',
        price: '178000',
        number_seat: 14,
        totalSeat: 139
      },
      {
        id: '3',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '10:00',
        end_time_train: '10:30',
        type_ticket: '0',
        price_origin: '140',
        price: '178000',
        number_seat: 14,
        totalSeat: 139
      },
      {
        id: '4',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '08:30',
        end_time_train: '09:10',
        type_ticket: '1',
        price_origin: '140',
        price: '170000',
        number_seat: 114,
        totalSeat: 152
      },
      {
        id: '5',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '09:30',
        end_time_train: '10:05',
        type_ticket: '1',
        price_origin: '140',
        price: '170000',
        number_seat: 44,
        totalSeat: 152
      },
      {
        id: '6',
        idCompany: '1',
        company_name: 'Chính Nghĩa',
        idTrain: '1',
        train_name: 'Chính Nghĩa Express',
        start_date: '09-12-2019',
        start_time_train: '10:30',
        end_time_train: '11:15',
        type_ticket: '1',
        price_origin: '140',
        price: '170000',
        number_seat: 46,
        totalSeat: 138
      },
      {
        id: '7',
        idCompany: '2',
        company_name: 'SUPPER BIỂN ĐÔNG',
        idTrain: '1',
        train_name: 'Super Biển Đông 2',
        start_date: '09-12-2019',
        start_time_train: '10:30',
        end_time_train: '11:15',
        type_ticket: '1',
        price_origin: '140',
        price: '170000',
        number_seat: 123,
        totalSeat: 140
      },
      {
        id: '8',
        idCompany: '2',
        company_name: 'SUPPER BIỂN ĐÔNG',
        idTrain: '1',
        train_name: 'Super Biển Đông 2',
        start_date: '09-12-2019',
        start_time_train: '08:10',
        end_time_train: '08:40',
        type_ticket: '0',
        price_origin: '140',
        price: '178000',
        number_seat: 114,
        totalSeat: 152
      },
      {
        id: '9',
        idCompany: '2',
        company_name: 'SUPPER BIỂN ĐÔNG',
        idTrain: '1',
        train_name: 'Super Biển Đông 2',
        start_date: '09-12-2019',
        start_time_train: '09:10',
        end_time_train: '09:40',
        type_ticket: '0',
        price_origin: '140',
        price: '165000',
        number_seat: 24,
        totalSeat: 152
      },
      {
        id: '10',
        idCompany: '2',
        company_name: 'SUPPER BIỂN ĐÔNG',
        idTrain: '1',
        train_name: 'Super Biển Đông 2',
        start_date: '09-12-2019',
        start_time_train: '10:05',
        end_time_train: '10:30',
        type_ticket: '0',
        price_origin: '140',
        price: '178000',
        number_seat: 14,
        totalSeat: 152
      },
      {
        id: '11',
        idCompany: '2',
        company_name: 'SUPPER BIỂN ĐÔNG',
        idTrain: '1',
        train_name: 'Super Biển Đông 2',
        start_date: '09-12-2019',
        start_time_train: '08:35',
        end_time_train: '09:10',
        type_ticket: '1',
        price_origin: '140',
        price: '170000',
        number_seat: 54,
        totalSeat: 152
      },
      {
        id: '12',
        idCompany: '3',
        company_name: 'An Vĩnh Express',
        idTrain: '1',
        train_name: 'AN VĨNH',
        start_date: '09-12-2019',
        start_time_train: '09:30',
        end_time_train: '10:05',
        type_ticket: '0',
        price_origin: '140',
        price: '165000',
        number_seat: 24,
        totalSeat: 122
      },
      {
        id: '13',
        idCompany: '3',
        company_name: 'An Vĩnh Express',
        idTrain: '1',
        train_name: 'AN VĨNH',
        start_date: '09-12-2019',
        start_time_train: '10:30',
        end_time_train: '11:15',
        type_ticket: '0',
        price_origin: '140',
        price: '160000',
        number_seat: 14,
        totalSeat: 132
      },
    ];

    this.tripsTemp = this.trips;
  }

}
