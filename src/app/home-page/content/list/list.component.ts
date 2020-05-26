import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common/api-service/api.service';
import { TripModel } from '../../../common/models/trip-model';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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
  numberTicket: string = '0';
  mobilestart_date: string;
  mobileNumberTicket: string = '1';
  @ViewChild('expandMobile') expandMobile: MatExpansionPanel;

  // data search advance
  timeSort: string;
  priceSort: string;
  numberSeartSort: string;

  tripsTemp: any[] = [];
  trips: any[] = [];

  companys: any[] = [];
  trains: any[] = [];

  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    // load data trip  
    if (this.api.cookie.getCookie('trip') != null) {
      this.tripModel = this.api.toObject(this.api.cookie.getCookie('trip'));
      this.tripModel.start_date = new Date(this.tripModel.start_date);
    }

    // load data history from cookie 
    if (this.api.cookie.getCookie('numberTicket') != null) {
      this.numberTicket = this.api.cookie.getCookie('numberTicket'); 
    }

    // convert date for mobile
    this.mobilestart_date = this.api.formatDate(new Date(this.tripModel.start_date));

    // first search
    this.searchDataTrips();
  }

  /**
   * search Data Trips
   */
  searchDataTrips() {
    // fillter date
    this.getDataTrips();

    this.trips = this.tripsTemp; 
    const start_date = this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy'); 

    this.trips = this.trips.filter(trip => {
      if (trip.start_date == start_date
        && trip.type_ticket == this.tripModel.type_ticket) {
        return true;
      }
      return false;
    });

    // update number ticket for show in mobile expand
    this.mobileNumberTicket = (Number(this.numberTicket) + 1).toString();

    // close expand mobile  
    this.expandMobile.close();
  }

  /**
   * on time Sort Change
   */
  onTimeSortChange(event) {
    this.timeSort = event.value;
    this.trips = this.trips.sort((t1, t2) => {
      // sort asc
      if (this.timeSort == '0') {
        if (t1.start_time_train < t2.start_time_train) {
          return -1;
        } else {
          if (t1.start_time_train > t2.start_time_train) {
            return 1;
          } else {
            return 0;
          }
        }
      }

      // sort desc
      if (t1.start_time_train < t2.start_time_train) {
        return 1;
      } else {
        if (t1.start_time_train > t2.start_time_train) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  /**
   * on price Sort Change
   */
  onPriceSortChange(event) {
    this.priceSort = event.value;
    this.trips = this.trips.sort((t1, t2) => {
      // sort asc
      if (this.priceSort == '0') {
        if (t1.price < t2.price) {
          return -1;
        } else {
          if (t1.price > t2.price) {
            return 1;
          } else {
            return 0;
          }
        }
      }

      // sort desc
      if (t1.price < t2.price) {
        return 1;
      } else {
        if (t1.price > t2.price) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  /**
   * on Number Seat Sort Change
   */
  onnumber_seatSortChange(event) {
    this.numberSeartSort = event.value;
    this.trips = this.trips.sort((t1, t2) => {
      // sort asc
      if (this.numberSeartSort == '0') {
        if (t1.number_seat < t2.number_seat) {
          return -1;
        } else {
          if (t1.number_seat > t2.number_seat) {
            return 1;
          } else {
            return 0;
          }
        }
      }

      // sort desc
      if (t1.number_seat < t2.number_seat) {
        return 1;
      } else {
        if (t1.number_seat > t2.number_seat) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }

  /**
   * on All Company Click
   */
  onAllCompanyClick() {
    // fillter date and get all company
    this.trips = this.tripsTemp;
    this.trips = this.trips.filter(trip => {
      if (trip.start_date == this.api.transfromDate(this.tripModel.start_date, 'yyyy-MM-dd')
        && trip.type_ticket == this.tripModel.type_ticket) {
        return true;
      }
      return false;
    });
  }

  /**
   * on Chinh Nghia Click
   */
  onChinhNghiaClick() {
    // fillter date get chinh nghia company 

    this.trips = this.tripsTemp;
    this.trips = this.trips.filter(trip => {
      if (trip.start_date == this.api.transfromDate(this.tripModel.start_date, 'yyyy-MM-dd')
        && trip.type_ticket == this.tripModel.type_ticket
        && trip.company == '1') {
        return true;
      }
      return false;
    });
  }

  /**
   * on Supper Click
   */
  onSupperClick() {
    // fillter date get supper bien dong company
    this.trips = this.tripsTemp;
    this.trips = this.trips.filter(trip => {
      if (trip.start_date == this.api.transfromDate(this.tripModel.start_date, 'yyyy-MM-dd')
        && trip.type_ticket == this.tripModel.type_ticket
        && trip.company == '2') {
        return true;
      }
      return false;
    });
  }

  /**
   * on An Vinh Click
   */
  onAnVinhClick() {
    // fillter date get an vinh company
    this.trips = this.tripsTemp;
    this.trips = this.trips.filter(trip => {
      if (trip.start_date == this.api.transfromDate(this.tripModel.start_date, 'yyyy-MM-dd')
        && trip.type_ticket == this.tripModel.type_ticket
        && trip.company == '3') {
        return true;
      }
      return false;
    });
  }

  /**
   * sort Data Trips
   */
  sortDataTrips() {
    // fillter date
    this.trips = this.tripsTemp;
    this.trips = this.trips.sort((t1, t2) => {
      // sort 
      if (t1 > t2) return -1;
      return 0;
    });
  }

  /**
   * on click button search
   */
  onSearchClick() {
    // check input validate
    if (this.tripModel.start_date === '') {
      this.api.showError('Vui lòng chọn ngày đi!');
      return;
    }

    // save data search to cookie 
    this.tripModel.start_date = this.tripModel.start_date.toString();
    this.api.cookie.setCookie('trip', this.api.toJson(this.tripModel));
    this.tripModel.start_date = new Date(this.tripModel.start_date);

    this.api.cookie.setCookie('numberTicket', this.numberTicket);

    // create path for seo and go to list 
    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    const path = '/list/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    this.api.navigate(path);

    // research 
    this.searchDataTrips();
  }

  /**
   * onSelectClick in web
   */
  onSelectClickInWeb(trip: TripModel) {
    this.api.cookie.setCookie('trip', this.api.toJson(this.tripModel));
    this.api.cookie.setCookie('tripBook', this.api.toJson(trip)); 

    this.api.cookie.setCookie('numberTicket', this.numberTicket);

    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    const path = '/detail/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    setTimeout(() => {
      this.router.navigate([]).then(result => { window.open(path, '_blank'); });
    }, 300);
  }

  /**
   * onSelectClick in mobile
   */
  onSelectClickInMobile(trip: TripModel) {
    this.api.cookie.setCookie('trip', this.api.toJson(this.tripModel));
    this.api.cookie.setCookie('tripBook', this.api.toJson(trip));
    this.api.cookie.setCookie('numberTicket', this.numberTicket);

    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    const path = '/detail/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');
    this.api.navigate(path);
  }

  /**
   * get data trip from backend
   */
  getDataTrips() {
    this.api.excuteAllByWhat({}, 'readDataCompany').subscribe(data => {
      data = this.api.convertToData(data); 
      this.companys = data;
    });

    this.api.excuteAllByWhat({}, 'readDataTrain').subscribe(data => {
      data = this.api.convertToData(data); 
      this.trains = data;
    });

    this.api.excuteAllByWhat({
      'start_date': this.api.formatDate(this.tripModel.start_date),
      'type_ticket': this.tripModel.type_ticket
    }, 'findDataTripByDate').subscribe(data => {
      data = this.api.convertToData(data); 

      setTimeout(() => {
        // add name of company and train
        data.forEach(item => {
          item.company_name = this.companys.filter(x => x.id == item.company)[0].name;
        });

        data.forEach(item => {
          item.train_name = this.trains.filter(x => x.id == item.train)[0].name;
        }); 

        this.trips = data;
        this.tripsTemp = this.trips; 

        this.fillterDateExpired();
      }, 100);
    });
  }

  /**
   * fillter date expired
   */
  private fillterDateExpired() {
    let today = new Date();
    let searchDate = new Date(this.tripModel.start_date);
    let currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(); 

    // Nếu ngày mai thì chắc chắn không cần phải search làm gì 
    if (this.api.formatDate(today) == this.api.formatDate(searchDate)) { 
      this.trips = this.trips.filter(trip => {
        if (trip.start_time_train > currentTime) {
          return true;
        }
        return false;
      }); 
      this.tripsTemp = this.trips; 
    } 
  }

}
