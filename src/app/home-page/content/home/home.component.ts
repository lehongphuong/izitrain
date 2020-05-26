import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../common/api-service/api.service';
import { TripModel } from '../../../common/models/trip-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

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

  constructor(
    private api: ApiService,
  ) { }

  /**
   * ngOnInit
   */
  ngOnInit() {
    // load data history 
    if (this.api.cookie.getCookie('trip') != null) {
      this.tripModel = this.api.toObject(this.api.cookie.getCookie('trip'));
      this.tripModel.start_date = new Date(this.tripModel.start_date);
    }
  }

  /**
   * on Search Click
   */
  onSearchClick() {
    console.log('this.tripModel', this.tripModel);

    // check input validate
    if (this.tripModel.start_date === '') {
      this.api.showError('Vui lòng chọn ngày đi!');
      return;
    }

    // save data search to cookie 
    this.tripModel.start_date = this.tripModel.start_date.toString();
    this.api.cookie.setCookie('trip', this.api.toJson(this.tripModel));
    this.tripModel.start_date = new Date(this.tripModel.start_date);

    // create path for seo and go to list 
    const lichTrinh = (this.tripModel.type_ticket == '0') ? 'cang-sa-ky-di-dao-ly-son' : 'dao-ly-son-di-cang-sa-ky';
    const path = '/list/ve-tau-' + lichTrinh + '-ngay-' + this.api.transfromDate(this.tripModel.start_date, 'dd-MM-yyyy');

    this.api.navigate(path);
  }

}
