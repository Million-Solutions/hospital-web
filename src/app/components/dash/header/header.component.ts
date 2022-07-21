import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-dash-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private route: Router
    ) {
  }

  ngOnInit() {
  }


  logout(){
    sessionStorage.removeItem('token');
    this.route.navigate(['/auth/sign-in'])
  }


}
