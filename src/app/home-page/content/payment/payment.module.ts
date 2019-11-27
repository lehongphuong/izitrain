import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment.component';

import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule, MatRadioModule } from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';

@NgModule({
  declarations: [PaymentComponent],
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
    MatRadioModule,
  ],
  providers: [ApiService]
})
export class PaymentModule { }
