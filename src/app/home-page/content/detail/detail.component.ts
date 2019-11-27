import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common/api-service/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  minDate = new Date();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }


  /**
   * on Booking Click
   */
  onBookingClick() {
    this.api.navigate('/booking');
  }

  /**
   * on Booking Click
   */
  onSelectClick() {
    this.api.navigate('/booking');
  }

}
