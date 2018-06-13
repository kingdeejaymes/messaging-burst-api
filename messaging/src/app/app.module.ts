import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListingsComponent } from './components/listings/listings.component';
import { SmsSendComponent } from './components/sms-send/sms-send.component';
import { ApiService } from './providers/api.service';
import { SmsService } from './providers/sms.service';

@NgModule({
  declarations: [
    AppComponent,
    SmsSendComponent,
    ListingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [SmsService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
