import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingComponent } from './booking.component';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule } from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: BookingComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [ApiService]
})
export class BookingModule { }
