import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common/api-service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  minDate = new Date();

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  onSearchClick() {
    this.api.navigate('/list');
  }

}
