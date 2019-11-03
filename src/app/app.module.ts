import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component'; 
import {TransferHttpCacheModule} from '@nguniversal/common';
import { HomePageModule } from './home-page/home-page.module'; 

@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', loadChildren: './home-page/home-page.module#HomePageModule'}, 
    ]),
    TransferHttpCacheModule,
    HomePageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
