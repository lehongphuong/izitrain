import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm.component';
import { MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatExpansionModule } from '@angular/material';
import { ApiService } from '../../../common/api-service/api.service';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ConfirmComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule

  ],
  providers: [ApiService]
})
export class ConfirmModule { }
