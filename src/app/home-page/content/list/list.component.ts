import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common/api-service/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  minDate = new Date();

  constructor(private router: Router, private api: ApiService) { }

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
    this.api.navigate('/detail'); 
  }

  onSearchClick() {

  }

}
