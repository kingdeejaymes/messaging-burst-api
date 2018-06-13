import { Component, OnInit } from '@angular/core';
import { SmsService } from '../../providers/sms.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  lists: any = [];

  constructor(private smsService: SmsService) { }

  ngOnInit() {
    this.retrieveLists();
  }

  retrieveLists() {
    this.smsService.get_lists().subscribe((response) => {
      console.log('Response =========> ', response);
      if (response['error'].code === 'SUCCESS') {
        this.lists = response['lists'];
        console.log('Lists ===> ', this.lists);
      }
    });
  }

}
