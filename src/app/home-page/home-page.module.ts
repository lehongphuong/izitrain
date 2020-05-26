import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';  
import { RouterModule } from '@angular/router'; 
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ApiService } from '../common/api-service/api.service';
import { SendDataService } from '../common/api-service/send-data.service';

@NgModule({
  declarations: [HomePageComponent, MenuComponent, FooterComponent],
  imports: [  
    TransferHttpCacheModule,  
    CommonModule,
    RouterModule.forChild([ 
      {
        path: '', component: HomePageComponent, children: [
          { path: '', loadChildren: './content/content.module#ContentModule' },
        ],
      } 
    ]), 
  ],
  providers: [ApiService, SendDataService]
})
export class HomePageModule { }
