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
          { path: 'list', loadChildren: './list/list.module#ListModule' }, 
          { path: 'detail', loadChildren: './detail/detail.module#DetailModule' }, 
          { path: 'booking', loadChildren: './booking/booking.module#BookingModule' }, 
          { path: 'payment', loadChildren: './payment/payment.module#PaymentModule' }, 
          { path: 'confirm', loadChildren: './confirm/confirm.module#ConfirmModule' }, 
          { path: 'account', loadChildren: './account/account.module#AccountModule' }, 
          { path: 'history', loadChildren: './history/history.module#HistoryModule' }, 
        ],
      } 
    ]),
  ]
})
export class ContentModule { }
