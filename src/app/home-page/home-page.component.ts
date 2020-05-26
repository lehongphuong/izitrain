import { Component, OnInit } from '@angular/core';
import { ApiService } from '../common/api-service/api.service';

declare var paypal;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.api.cookie.clearAll(); 
    
  }

}
