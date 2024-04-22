import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})

export class SearchformComponent implements OnInit {
  /* 子传父 */
  @Output() changeMsg = new EventEmitter();
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  selectedMovie: any = "";/* 选中项 */
  errorMsg!: string;
  minLengthTerm = 3;
  keywordstate = false;
  locationstate = false;
  /* 经纬度 */
  lat = '';
  lng = '';
  constructor(private http: HttpClient) {
    this.isLoading = false;

    /* 获取用户当前经纬度 */
    fetch('https://ipinfo.io/?token=92851fd3cfa06e')
      .then((response) => response.json())
      .then((response) => {
        //document.getElementById("location").value = response.abuse.address;
        //console.log(response.loc);
        var loc = response.loc.split(",");
        this.lat = loc[0];
        this.lng = loc[1];
      })
  }
  /* 是否允许自动填充 */
  placeState = false;
  ngForm = {
    "keyword": "",/* Delivery */
    "Distance": 10,
    "Category": "Default",
    // "Location": "1600 Amphitheatre Parkway, Mountain View, CA",
    "Location": "",
    "check": false,
  }

  ngOnInit() {
    /* 默认初始化直接加载数据（测试） */
    // var submitdata = {
    //   "ret": 0,
    //   "message": {
    //     "businesses": [
    //       {
    //         "id": "oE0SY5qC4cNz7lihZoTmLQ",
    //         "alias": "carminas-kitchen-los-angeles",
    //         "name": "Carmina's Kitchen",
    //         "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/5xZq1D_SRxpKRI_MahLMow/o.jpg",
    //         "is_closed": false,
    //         "url": "https://www.yelp.com/biz/carminas-kitchen-los-angeles?adjust_creative=5rhuhfsDOwUsnXwcNsXvlw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5rhuhfsDOwUsnXwcNsXvlw",
    //         "review_count": 1,
    //         "categories": [
    //           {
    //             "alias": "desserts",
    //             "title": "Desserts"
    //           },
    //           {
    //             "alias": "weightlosscenters",
    //             "title": "Weight Loss Centers"
    //           },
    //           {
    //             "alias": "coffee",
    //             "title": "Coffee & Tea"
    //           }
    //         ],
    //         "rating": 4,
    //         "coordinates": {
    //           "latitude": null,
    //           "longitude": null
    //         },
    //         "transactions": [],
    //         "location": {
    //           "address1": "",
    //           "address2": "",
    //           "address3": "",
    //           "city": "Los Angeles",
    //           "zip_code": "",
    //           "country": "US",
    //           "state": "CA",
    //           "display_address": [
    //             "Los Angeles, CA"
    //           ]
    //         },
    //         "phone": "+12182233364",
    //         "display_phone": "(218) 223-3364",
    //         "distance": 4.049322216540503
    //       },
    //       {
    //         "id": "fnPGqkzovZB5WWSUZgnpjw",
    //         "alias": "belicious-green-smoothies-los-angeles-2",
    //         "name": "Belicious Green Smoothies",
    //         "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/HyEnwIlS5Yq9SspLNe29MQ/o.jpg",
    //         "is_closed": false,
    //         "url": "https://www.yelp.com/biz/belicious-green-smoothies-los-angeles-2?adjust_creative=5rhuhfsDOwUsnXwcNsXvlw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=5rhuhfsDOwUsnXwcNsXvlw",
    //         "review_count": 4,
    //         "categories": [
    //           {
    //             "alias": "foodstands",
    //             "title": "Food Stands"
    //           },
    //           {
    //             "alias": "juicebars",
    //             "title": "Juice Bars & Smoothies"
    //           }
    //         ],
    //         "rating": 2.5,
    //         "coordinates": {
    //           "latitude": 34.05349,
    //           "longitude": -118.24532
    //         },
    //         "transactions": [],
    //         "price": "$",
    //         "location": {
    //           "address1": "",
    //           "address2": "",
    //           "address3": "",
    //           "city": "Los Angeles",
    //           "zip_code": "",
    //           "country": "US",
    //           "state": "CA",
    //           "display_address": [
    //             "Los Angeles, CA"
    //           ]
    //         },
    //         "phone": "",
    //         "display_phone": "",
    //         "distance": 4.049322216540503
    //       }
    //     ],
    //     "total": 2,
    //     "region": {
    //       "center": {
    //         "longitude": -118.2437,
    //         "latitude": 34.0522
    //       }
    //     }
    //   }
    // }

    // let maindata = submitdata;
    // maindata.message.businesses = maindata.message.businesses.splice(0, 10);
    // this.changeMsg.emit(maindata)
    /* =============== */
    this.searchMoviesCtrl.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap(value => {
          return (
            this.http.get(`http://34.28.96.102:3022/autocomplete?text=${this.selectedMovie}`,
              {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              })
              .pipe(
                finalize(() => {
                  this.isLoading = false
                }),
              )
          )
        }
        )
      )
      .subscribe((data: any) => {
        console.log(data)
        data = data.message;
        console.log(data)
        let result = data.terms;
        let termsdata = [];
        if (result != undefined && data.categories != undefined) {
          termsdata = result.map((ele: any) => {
            return {
              alias: ele.text,
              title: ele.text
            }
          })
          this.filteredMovies = [...termsdata, ...data.categories];
        } else {
          this.filteredMovies = [];
        }

        // if (data['Search'] == undefined) {
        //   this.errorMsg = data['Error'];
        //   this.filteredMovies = [];
        // } else {
        //   this.errorMsg = "";

        //   this.filteredMovies = data['Search'];
        // }
        console.log(this.filteredMovies);
      });
  }
  /* 点击选中的数据 */
  onSelected() {
    console.log(this.selectedMovie);
    console.log(this.selectedMovie.alias);
    let result = this.ngForm;
    result.keyword = this.selectedMovie.alias;
    this.ngForm = result;
    this.selectedMovie = this.selectedMovie.alias;
    console.log(this.selectedMovie)
    console.log(this.ngForm)
  }
  displayWith(value: any) {
    console.log(value);
    this.selectedMovie = value;
    // return value?.alias;
    // return value == null ? '' : value.alias;
    if (value == null) {
      return ''
    } else if (value.alias != undefined) {
      this.filteredMovies = [];
      return value.alias
    } else {
      this.filteredMovies = [];
      return value
    }
    // return value == null ? '' : value;
  }
  /* 切换是否自动完成 */
  changeAutocomplete(e: any) {
    console.log(e.target.checked)
    if (e.target.checked == true) {
      this.placeState = true;
      this.ngForm.Location = ''
    } else {
      this.placeState = false;
    };
  }
  /* 表单提交 */
  onSubmit(f: NgForm) {
    // 提示错误信息，不往下执行
    if (this.selectedMovie == '') {
      this.keywordstate = true;
      return false;
    } else {
      this.keywordstate = false;
    }
    // 提示错误信息不往下执行
    if (this.ngForm.Location == '' && this.ngForm.check == false) {
      this.locationstate = true;
      return false;
    } else {
      this.locationstate = false;
    }
    /* 如果不是自动获取 */
    if (this.ngForm.check == false) {
      /* 根据位置信息获取数据 */
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.ngForm.Location + '&key=AIzaSyCDJHOpT6euCZH1Z0dcghjxEigUxUj8oII';
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if (response.results.length == 0) {
            /* 子传父 */
            this.changeMsg.emit({
              ret: 0,
              message: {
                businesses: [],
                categories: [],
                terms: [],
              }
            })
            // var ff = "<div class='nores'><p>No record has been found</p></div>";
            // document.getElementById('businesslist').innerHTML = ff;
          } else {
            var lat = response.results[0].geometry.location.lat;
            var lng = response.results[0].geometry.location.lng;
            let distanceNumber: any = this.ngForm.Distance * 1609.34
            fetch('http://34.28.96.102:3022/searchin?keyword=' + this.selectedMovie + '&distance=' + parseInt(distanceNumber) + '&category=' + this.ngForm.Category + '&lat=' + lat + '&lng=' + lng, {
              method: 'get'
            })
              .then((response) => response.json())
              .then((response) => {
                let maindata = response;
                maindata.message.businesses = maindata.message.businesses.splice(0, 10);

                /* 子传父 */
                this.changeMsg.emit(maindata)
                // if (response.ret == 400) {
                //   alert(response.message.message)
                // } else {
                //   //console.log(response.businesses.length);
                //   // var busi = document.getElementById('businesslist');
                //   // var tt = '';
                //   if (response.message.businesses.length == 0) {
                //     /* 子传父 */
                //     this.changeMsg.emit([])
                //   } else {
                //     /* 子传父 */
                //     this.changeMsg.emit(response.businesses)
                //   }
                // }


              })
          }
        })
    } else {
      var lat = this.lat;
      var lng = this.lng;
      let distanceNumber: any = this.ngForm.Distance * 1609.34;
      fetch('http://34.28.96.102:3022/searchin?keyword=' + this.selectedMovie + '&distance=' + parseInt(distanceNumber) + '&category=' + this.ngForm.Category + '&lat=' + lat + '&lng=' + lng, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((response) => {
          // response = submitdata;
          if (response.ret == 400) {
            alert(response.message.message)
          } else {
            /* 子传父 */
            this.changeMsg.emit(response)
            // if (response.message.businesses.length == 0) {
            //   /* 子传父 */
            //   this.changeMsg.emit([])
            // } else {
            //   /* 子传父 */
            //   this.changeMsg.emit(response.businesses)
            // }
          }


        })
    }
    console.log(f.value);  // { first: '', last: '' }
    return false;
  }
  /* 重置表单 */
  restdata(f: NgForm) {
    this.ngForm.keyword = "";
    this.selectedMovie = "";
    this.ngForm.Location = ''
    /* 子传父 */
    this.changeMsg.emit({
      ret: 404,
      message: {
        businesses: [],
        categories: [],
        terms: [],
      }
    })
    /* 重置商业搜索表 */
    // f.reset();
    this.keywordstate = false;
    this.locationstate = false;

    this.ngForm.Distance = 10
    this.ngForm.Category = "Default"
    this.placeState = false;
    this.ngForm.check = false;
  }
}
