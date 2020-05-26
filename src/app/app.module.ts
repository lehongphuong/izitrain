import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HomePageModule } from './home-page/home-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CommonModule, DatePipe } from '@angular/common';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { CookieService } from 'ngx-cookie-service';
import { CRUDCookieService } from './common/api-service/cookie-service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    RouterModule.forRoot([
      { path: '', loadChildren: './home-page/home-page.module#HomePageModule' },
    ]),
    LoadingBarRouterModule,
    TransferHttpCacheModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule,
    HomePageModule,

    ToastrModule.forRoot(), // ToastrModule added 

  ],
  providers: [CookieService, CRUDCookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
