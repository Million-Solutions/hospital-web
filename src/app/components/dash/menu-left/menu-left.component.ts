import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {
  window = window
  show = false

  constructor() {
  }

  ngOnInit() {
  }

}
