import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ApiService } from '../../../common/api-service/api.service';
import { SendDataService } from '../../../common/api-service/send-data.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: []
})
export class HomeModule { }
