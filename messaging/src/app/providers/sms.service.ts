import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class SmsService {

  constructor(private apiService: ApiService) {}

  send_sms(to: string, msg: string) {

    const params = new HttpParams()
      .set('to', to)
      .set('message', msg);

    return this.apiService.call('/send-sms.json', 'POST', params);
    // Commented as this is for bitly api initially
    // return this.apiService.call('/send-sms.json?to=' + to + '&message=' + msg, 'POST');

  }

  get_lists() {
    return this.apiService.call('/get-lists.json', 'GET', null);
  }

}
