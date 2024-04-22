import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import bootstrap from '/bootstarp/dist/js/bootstrap.min.js'
@Component({
  selector: 'app-detailsCard',
  templateUrl: './detailsCard.component.html',
  styleUrls: ['./detailsCard.component.css'],
  providers: [NgbModalConfig, NgbModal],
})

export class DetailsCardComponent implements OnInit {
  /* 子组件接收父组件数据 */
  @Input() detailsCard: any;
  modelstate: boolean = true;/* 弹框显示隐藏 */
  state: any = null;/* 预定状态 */
  form = {
    businessname: '',
    email: "",
    Date: "",
    hour: "",
    minite: "",
  }
  nowDate = this.getday()
  modalRef: any = '';
  serveform: any = [];/* 本地存储的form列表数据 */

  /* reviews列表 */
  reviewsList: any = [{
    "id": "gkZpChlBHSrFkrBS2wE2eQ",
    "url": "https://www.yelp.com/biz/carminas-kitchen-los-angeles?adjust_creative=5rhuhfsDOwUsnXwcNsXvlw&hrid=gkZpChlBHSrFkrBS2wE2eQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=5rhuhfsDOwUsnXwcNsXvlw",
    "text": "Ok so this place is no joke, they have unlimited breadsticks so I guess it's pretty up there if you want to take ya girl on a dinner date. Uhm I think I got...",
    "rating": 4,
    "time_created": "2014-01-24 20:58:31",
    "user": {
      "id": "t6-LPVzKf8h3yWgMz80_-A",
      "profile_url": "https://www.yelp.com/user_details?userid=t6-LPVzKf8h3yWgMz80_-A",
      "image_url": "https://s3-media1.fl.yelpcdn.com/photo/Vmowm4hKAFQ38FAz8N8aTg/o.jpg",
      "name": "Richard L."
    }
  }];
  /* 地图 */
  apiLoaded: Observable<boolean> | undefined;
  center: any = null;
  // center: any = { lat: '', lng: '' };
  zoom = 14;
  markerOptions: any = { draggable: false };
  markerPositions: any = [];
  /* 地图打点 */
  addMarker(event: any) {
    this.markerPositions.push(event.latLng.toJSON());
    console.log(this.markerPositions)
  }

  constructor(config: NgbModalConfig, private modalService: NgbModal, httpClient: HttpClient) {
    // customize default values of modals used by this component tree
    /* 配置模态框 */
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
    /* 地图 */
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCHPeg-sW5K8LJUSpUrSeL5oJfY6NNdlXs', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );


  }

  ngOnInit() {
    console.log(this.detailsCard)

    if (this.detailsCard.message != undefined) {
      /* 地图 */
      /* this.detailsCard.message.location.display_address.join('') */
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + this.detailsCard.message.location.display_address[0] + '&key=AIzaSyCDJHOpT6euCZH1Z0dcghjxEigUxUj8oII';
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          if (response.results.length == 0) {
          } else {
            this.center = { lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng }
            console.log(this.center);
            this.markerOptions = { draggable: false };

            /* 地图添加坐标点 */
            this.markerPositions.push(this.center);
          }
        }).catch((err) => { console.log(err) })

      this.form.businessname = this.detailsCard.message.name;/* 渲染题目 */
      /* 判断用户是否已经预定了 */
      let localform: any = localStorage.getItem('form');
      let myserver = localform == null ? [] : JSON.parse(localform);
      if (myserver.length == 0) {
        // 代表没有预定
        this.state = false;
      } else {
        let index = myserver.findIndex((ele: any) => {
          return ele.businessname == this.form.businessname;
        })
        console.log(index)
        if (index == -1) {
          // 不存在，则没有预定
          this.state = false;
        } else {
          this.state = true;
        };
      }
      console.log(this.state);
      this.serveform = myserver;/* 渲染本地数据 */

      /* 显示返回review数据 */
      var url = 'http://34.28.96.102:3022/reviews?id=' + this.detailsCard.message.id;
      fetch(url, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res)
          if (res.ret == 0) {
            this.reviewsList = res.message.reviews.splice(0, 3);
          }

        }).catch((err) => {
          alert(err)
          let data = { "ret": 0, "message": { "reviews": [{ "id": "gkZpChlBHSrFkrBS2wE2eQ", "url": "https://www.yelp.com/biz/carminas-kitchen-los-angeles?adjust_creative=5rhuhfsDOwUsnXwcNsXvlw&hrid=gkZpChlBHSrFkrBS2wE2eQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_reviews&utm_source=5rhuhfsDOwUsnXwcNsXvlw", "text": "Ok so this place is no joke, they have unlimited breadsticks so I guess it's pretty up there if you want to take ya girl on a dinner date. Uhm I think I got...", "rating": 4, "time_created": "2014-01-24 20:58:31", "user": { "id": "t6-LPVzKf8h3yWgMz80_-A", "profile_url": "https://www.yelp.com/user_details?userid=t6-LPVzKf8h3yWgMz80_-A", "image_url": "https://s3-media1.fl.yelpcdn.com/photo/Vmowm4hKAFQ38FAz8N8aTg/o.jpg", "name": "Richard L." } }], "total": 1, "possible_languages": ["en"] } };
        })
      /* 轮播图 */
      // var myCarousel = document.querySelector('#carouselExampleIndicators')
      // var carousel = new bootstrap.Carousel(myCarousel)
      setTimeout(function () {
        let dom: any = document.querySelector('.carousel-control-next');
        if (dom) {
          dom.click();
        }
      }, 3000)
    }


  }
  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /* 表单提交 */
  formdata() {
    let index = this.serveform.findIndex((ele: any) => {
      return ele.businessname == this.form.businessname;
    })
    if (index == -1) {
      // 不存在（追加数据）
      if (this.form.email != '' && this.form.Date != '' && this.form.hour != '' && this.form.minite != '') {

        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(this.form.email)) {
          this.serveform.push(this.form);
          localStorage.setItem('form', JSON.stringify(this.serveform))
          alert('Reservation created');
          this.state = true;
          /* 如果提交成功触发关闭 */
          this.modalRef.close();
          this.form.email = ''
          this.form.Date = ''
          this.form.hour = ''
          this.form.minite = ''
          this.state = true;/* 代表预定*/
        } else {
          alert('Please re-enter the email format incorrectly')
        }

      } else {
        return;
      }

    } else {
      this.serveform.splice(index, 1);
      localStorage.setItem('form', JSON.stringify(this.serveform))
      alert('Reservation canceled!');
      this.state = false;
      /* 如果提交成功触发关闭 */
      this.modalRef.close();
    }



  }
  // close(content: any) {
  //   this.modalService.close(content);
  // }
  open(content: any) {
    // this.modalService.open(content);
    /* 实例化 */
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    /* 绑定提示信息 */
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event: any) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    /* 关闭回调 */
    this.modalRef.result.then(
      (result: any) => {
        console.log(result)
        /* 点击关闭按钮清空表格 */
        // this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }
  /* 推特跳转链接 */
  twitterUrl() {
    window.open(`https://twitter.com/intent/tweet?text=${this.detailsCard.message.name} on Yelp&url=${this.detailsCard.message.url}`, "_blank");
  }
  faceUrl() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.detailsCard.message.url}&quote=${this.detailsCard.message.name} on Yelp`, "_blank");
  }
  // moveMap(event: google.maps.MapMouseEvent) {
  //   this.center = (event.latLng.toJSON());
  // }

  // move(event: google.maps.MapMouseEvent) {
  //   this.display = event.latLng.toJSON();
  // }
  Cancelreservation() {
    let localform: any = localStorage.getItem('form');
    let myserver = localform == null ? [] : JSON.parse(localform);
    let result = myserver.filter((ele: any) => {
      return ele.businessname != this.form.businessname;
    })
    this.serveform = result;
    localStorage.setItem('form', JSON.stringify(result));
    this.state = false;
    alert('Reservation canceled!')
  }
  /* 显示当前时间 */
  getNow(s: any) {
    return s < 10 ? '0' + s : s;
  }
  getday() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var now = '';
    var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (isMac) {
      now = year + '/' + this.getNow(month) + "/" + this.getNow(date)
    } else {
      now = year + '-' + this.getNow(month) + "-" + this.getNow(date)
    }

    return now;
  }

}
