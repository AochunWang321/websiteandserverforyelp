import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-MyBookings',
  templateUrl: './MyBookings.component.html',
  styleUrls: ['./MyBookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  serverList: any = [];
  constructor() { }

  ngOnInit() {
    /* 判断用户是否已经预定了 */
    let localform: any = localStorage.getItem('form');
    let myserver = localform == null ? [] : JSON.parse(localform);
    this.serverList = myserver;
    console.log(this.serverList)
  }
  deleted(name: string) {
    alert('Reservation cancelled!')
    let result = this.serverList.filter((ele: any) => {
      return ele.businessname != name;
    })
    this.serverList = result;
    localStorage.setItem('form', JSON.stringify(result));
  }
}
