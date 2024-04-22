import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resultstable',
  templateUrl: './resultstable.component.html',
  styleUrls: ['./resultstable.component.css']
})
export class ResultstableComponent implements OnInit {
  /* 子组件接收父组件数据 */
  @Input() tableList: any;
  /* 子传父 */
  @Output() changeMsg = new EventEmitter();
  /* 列表 */
  resultstableList = []
  constructor() { }

  ngOnInit() {
    console.log(this.tableList)
  }
  /* 显示详情 */
  busi(id: any) {
    /* 子传父 */
    console.log(id)
    this.changeMsg.emit(id)
  }
}
