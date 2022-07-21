import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-functions',
  templateUrl: './functions.component.html',
  styleUrls: ['./functions.component.scss']
})
export class FunctionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static alert(text, error?){
    Swal.fire({
      position: 'top-right',
      title: error ? 'Error!' : 'Hecho!',
      text: text,
      showConfirmButton: false,
      backdrop: false,
      width: 300,
      timer: 1500,
      customClass: {
        title: error ? 'title-alert' : 'title-done',
        htmlContainer:'content-alert'
      }
    })
  }

}
