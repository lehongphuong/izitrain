import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component'; 

import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule } from '@angular/material';
import { PaymeComponent } from '../payme/payme.component';

@NgModule({
  declarations: [PaymentComponent, PaymeComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: PaymentComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule, 
     
  ]
})
export class PaymentModule { }
