import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  minDate = new Date();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * onSelectClick in web
   */
  onSelectClickInWeb(){ 
    this.router.navigate([]).then(result => {  window.open('/detail', '_blank'); });
  }

  /**
   * onSelectClick in mobile
   */
  onSelectClickInMobile(){ 
    this.router.navigate(['/detail']);
  }

  onSearchClick(){
    
  }

}
