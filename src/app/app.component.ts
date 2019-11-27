import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` 
      <ngx-loading-bar [color]="'sea-green'" [diameter]="'50px'" [height]="'2px'"></ngx-loading-bar>
      <router-outlet></router-outlet> 
  `,
  styles: [`
    
  `]
})
export class AppComponent { 
  constructor() {
  }
}
