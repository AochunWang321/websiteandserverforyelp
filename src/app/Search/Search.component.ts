import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.css']
})
export class SearchComponent implements OnInit {
  isShowsearchform = true;
  /* 主弹框显示 */
  isShowresultstable = false;
  isShowreservationForm = false;
  /* 详情 */
  isShowdetailsCard = false;
  /* 表格数据 */
  resultstableList = [];
  /* 表格提示显示隐藏 */
  resultstableState = false;
  /* 详情列表 */
  detailsCardList: any = undefined;
  constructor() { }

  ngOnInit() {
    console.log(this.isShowresultstable)
  }
  onChangeMsg(res: any) {
    /* 表单显示 */
    console.log(res);
    if (res.ret == 0) {
      this.isShowresultstable = true;
      this.resultstableList = res.message.businesses
      if (res.message.businesses.length == 0) {
        this.resultstableState = true;
      } else {
        this.resultstableState = false;
      }
    } else if (res.ret == 404) {
      this.isShowresultstable = false;
      this.isShowdetailsCard = false;
    }
  }
  /* resultsTable列表点击事件 */
  onresultsTable(id: any) {
    this.detailsCardList = undefined;
    console.log(id)
    // if (id == 'oE0SY5qC4cNz7lihZoTmLQ') {
    //   var result = {
    //     "ret": 0,
    //     "message": {
    //       "id": "oE0SY5qC4cNz7lihZoTmLQ",
    //       "alias": "gary-danko-san-francisco",
    //       "name": "Carmina's Kitchen",
    //       "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",
    //       "is_claimed": true,
    //       "is_closed": false,
    //       "url": "https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg",
    //       "phone": "+14157492060",
    //       "display_phone": "(415) 749-2060",
    //       "review_count": 5296,
    //       "categories": [
    //         {
    //           "alias": "newamerican",
    //           "title": "American (New)"
    //         },
    //         {
    //           "alias": "french",
    //           "title": "French"
    //         },
    //         {
    //           "alias": "wine_bars",
    //           "title": "Wine Bars"
    //         }
    //       ],
    //       "rating": 4.5,
    //       "location": {
    //         "address1": "800 N Point St",
    //         "address2": "",
    //         "address3": "",
    //         "city": "San Francisco",
    //         "zip_code": "94109",
    //         "country": "US",
    //         "state": "CA",
    //         "display_address": [
    //           "800 N Point St",
    //           "San Francisco, CA 94109"
    //         ],
    //         "cross_streets": ""
    //       },
    //       "coordinates": {
    //         "latitude": 37.80587,
    //         "longitude": -122.42058
    //       },
    //       "photos": [
    //         "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",
    //         "https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg",
    //         "https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg"
    //       ],
    //       "price": "$$$$",
    //       "hours": [
    //         {
    //           "open": [
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 0
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 1
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 2
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 3
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 4
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 5
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 6
    //             }
    //           ],
    //           "hours_type": "REGULAR",
    //           "is_open_now": false
    //         }
    //       ],
    //       "transactions": [],
    //       "special_hours": [
    //         {
    //           "date": "2019-02-07",
    //           "is_closed": null,
    //           "start": "1600",
    //           "end": "2000",
    //           "is_overnight": false
    //         }
    //       ]
    //     }
    //   }
    //   this.detailsCardList = result;
    // } else {
    //   var result = {
    //     "ret": 0,
    //     "message": {
    //       "id": "WavvLdfdP6g8aZTtbBQHTw",
    //       "alias": "gary-danko-san-francisco",
    //       "name": "Belicious Green Smoothies",
    //       "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",
    //       "is_claimed": true,
    //       "is_closed": false,
    //       "url": "https://www.yelp.com/biz/gary-danko-san-francisco?adjust_creative=wpr6gw4FnptTrk1CeT8POg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=wpr6gw4FnptTrk1CeT8POg",
    //       "phone": "+14157492060",
    //       "display_phone": "(415) 749-2060",
    //       "review_count": 5296,
    //       "categories": [
    //         {
    //           "alias": "newamerican",
    //           "title": "American (New)"
    //         },
    //         {
    //           "alias": "french",
    //           "title": "French"
    //         },
    //         {
    //           "alias": "wine_bars",
    //           "title": "Wine Bars"
    //         }
    //       ],
    //       "rating": 4.5,
    //       "location": {
    //         "address1": "800 N Point St",
    //         "address2": "",
    //         "address3": "",
    //         "city": "San Francisco",
    //         "zip_code": "94109",
    //         "country": "US",
    //         "state": "CA",
    //         "display_address": [
    //           "800 N Point St",
    //           "San Francisco, CA 94109"
    //         ],
    //         "cross_streets": ""
    //       },
    //       "coordinates": {
    //         "latitude": 37.80587,
    //         "longitude": -122.42058
    //       },
    //       "photos": [
    //         "https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg",
    //         "https://s3-media4.fl.yelpcdn.com/bphoto/FmXn6cYO1Mm03UNO5cbOqw/o.jpg",
    //         "https://s3-media4.fl.yelpcdn.com/bphoto/HZVDyYaghwPl2kVbvHuHjA/o.jpg"
    //       ],
    //       "price": "$$$$",
    //       "hours": [
    //         {
    //           "open": [
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 0
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 1
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 2
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 3
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 4
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 5
    //             },
    //             {
    //               "is_overnight": false,
    //               "start": "1730",
    //               "end": "2200",
    //               "day": 6
    //             }
    //           ],
    //           "hours_type": "REGULAR",
    //           "is_open_now": false
    //         }
    //       ],
    //       "transactions": [],
    //       "special_hours": [
    //         {
    //           "date": "2019-02-07",
    //           "is_closed": null,
    //           "start": "1600",
    //           "end": "2000",
    //           "is_overnight": false
    //         }
    //       ]
    //     }
    //   }
    //   this.detailsCardList = result;
    // }


    /* 改变显示窗口 */
    // this.detailsCardList = result;
    // this.isShowsearchform = false;
    this.isShowresultstable = false;
    this.isShowdetailsCard = true;
    /* 让2个组件隐藏，显示详情组件 */
    var url = 'http://34.28.96.102:3022/busi?id=' + id;
    fetch(url, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((res) => {

        console.log(res)
        if (res.ret == 0) {
          /* 先模拟数据 */
          this.detailsCardList = res;
          // this.isShowsearchform = false;
          this.isShowresultstable = false;
          this.isShowdetailsCard = true;
        } else {
          // this.detailsCardList = result.message;
          // this.isShowsearchform = false;
          // this.isShowresultstable = false;
          // this.isShowdetailsCard = true;
        }
      })
  }
  /* 详情点击关闭后退 */
  backdetail() {
    this.isShowsearchform = true;
    this.isShowresultstable = true;
    this.isShowdetailsCard = false;
    this.detailsCardList = undefined;
  }
}
