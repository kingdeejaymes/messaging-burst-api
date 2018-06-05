import { Component, OnInit } from '@angular/core';
import { SmsService } from '../../providers/sms.service';

@Component({
  selector: 'app-sms-send',
  templateUrl: './sms-send.component.html',
  styleUrls: ['./sms-send.component.css']
})
export class SmsSendComponent implements OnInit {

  to: string = null;
  message: string = '';
  isEmptyMessage: boolean = false;
  isEmptyTo: boolean = false;
  sendBtnWasClicked: boolean = false;
  smsSent:boolean = false;

  constructor(private smsService: SmsService) { }

  ngOnInit() {
  }

  sendSMS() {
    this.sendBtnWasClicked = true;
    this.smsSent = false;
    if (this.isValidFields()) {
      this.smsService.send_sms(this.to, this.message).subscribe(response => {
        console.log('Response =====> ', response);
        this.sendBtnWasClicked = false;
        if (response['error'].code === 'SUCCESS') {
          this.smsSent = true; // flag to show the confirmation message
        }
      });
    }

  }

  isValidFields() {
    this.isEmptyMessage = false;
    this.isEmptyTo = false;
    if (this.message === '') {
      this.sendBtnWasClicked = false;
      this.isEmptyMessage = true;
      return false;
    }
    if (this.to == null) {
      this.sendBtnWasClicked = false;
      this.isEmptyTo = true;
      return false;
    }
    return true;
  }

}
