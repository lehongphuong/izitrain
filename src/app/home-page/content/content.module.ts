import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { RouterModule } from '@angular/router'; 
import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [ContentComponent],
  imports: [ 
    TransferHttpCacheModule,  
    CommonModule,  
    RouterModule.forChild([ 
      {
        path: '', component: ContentComponent, children: [
          { path: '', loadChildren: './home/home.module#HomeModule' }, 
          { path: 'list/:id', loadChildren: './list/list.module#ListModule' }, 
          { path: 'detail/:id', loadChildren: './detail/detail.module#DetailModule' }, 
          { path: 'booking/:id', loadChildren: './booking/booking.module#BookingModule' }, 
          { path: 'payment/:id', loadChildren: './payment/payment.module#PaymentModule' }, 
          { path: 'confirm/:id', loadChildren: './confirm/confirm.module#ConfirmModule' }, 
          { path: 'account', loadChildren: './account/account.module#AccountModule' }, 
          { path: 'history', loadChildren: './history/history.module#HistoryModule' }, 
        ],
      } 
    ]),
  ]
})
export class ContentModule { }
