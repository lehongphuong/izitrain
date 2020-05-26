import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './detail.component';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule
} from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';
import { SendDataService } from '../../../common/api-service/send-data.service';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: DetailComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [ApiService, SendDataService]
})
export class DetailModule { }
