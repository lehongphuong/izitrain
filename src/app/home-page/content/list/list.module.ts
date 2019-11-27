import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import {
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatIconModule
} from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';

@NgModule({
  declarations: [ListComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ListComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,

    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatIconModule

  ],
  providers: [ApiService]
})
export class ListModule { }
