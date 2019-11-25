import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  minDate = new Date();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * onSelectClick in web
   */
  onSelectClickInWeb() {
    this.router.navigate([]).then(result => { window.open('/detail', '_blank'); });
  }

  /**
   * onSelectClick in mobile
   */
  onSelectClickInMobile() {
    this.router.navigate(['/detail']);
  }

  /**
   * on Booking Click
   */
  onBookingClick() {
    this.router.navigate(['/booking']);
  }

  /**
   * on Booking Click
   */
  onSelectClick() {
    this.router.navigate(['/booking']);
  } 

}
