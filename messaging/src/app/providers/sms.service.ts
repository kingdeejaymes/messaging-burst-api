import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable()
export class SmsService {

  constructor(private apiService: ApiService) {}

  send_sms(to: string, msg: string) {
    return this.apiService.call('/send-sms.json?to=' + to + '&message=' + msg, 'POST');
  }

}
