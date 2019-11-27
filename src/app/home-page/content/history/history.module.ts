import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { ApiService } from '../../../common/api-service/api.service';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    TransferHttpCacheModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: HistoryComponent, children: [
        ],
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApiService]
})
export class HistoryModule { }
