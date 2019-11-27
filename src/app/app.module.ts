import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component'; 
import {TransferHttpCacheModule} from '@nguniversal/common';
import { HomePageModule } from './home-page/home-page.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common'; 
import { LoadingBarRouterModule } from '@ngx-loading-bar/router'; 
 
@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', loadChildren: './home-page/home-page.module#HomePageModule'}, 
    ]), 
    LoadingBarRouterModule,

    TransferHttpCacheModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule, 
    
    HomePageModule, 
    
    
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
