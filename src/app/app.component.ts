import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-osmos';
  constructor(private spinner: NgxSpinnerService) {}
  ngOnInit() {

  }

    // Dark-Theme //
    isDarkTheme = false;
    toggleTheme(){
      this.isDarkTheme = !this.isDarkTheme;
    }
}
