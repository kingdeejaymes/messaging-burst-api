import { Injectable } from '@angular/core';
import { HttpParams} from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class SmsService {

  constructor(private apiService: ApiService) {}

  send_sms(to:string, msg: string) {

    let params = new HttpParams()
      .set('to', to)
      .set('message', msg);

    return this.apiService.call('/send-sms.json', 'POST', params);

  }

}
