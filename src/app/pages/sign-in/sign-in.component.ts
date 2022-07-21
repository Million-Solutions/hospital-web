import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from './services/sign-in.service';
import { LoggedService } from 'src/app/core/services/logged.service';
import Swal from 'sweetalert2';

declare var $: any
@Component({
  selector: 'app-reset-password',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  view = false

  constructor(
    private fb: FormBuilder,
    private SignInService: SignInService,
    private router: Router,
    private loggedService: LoggedService,
  ) {  }

  SignInForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    remember: [true]
  });

  ngOnInit(): void {
    this.SignInForm.controls.email.setValue(sessionStorage.getItem('email'))
    const token = sessionStorage.getItem('token') ?? null
    if(token){
      this.router.navigate(['/dash/home']);
    }
  }


  async login(){
    if(this.SignInForm.invalid) return this.SignInForm.markAllAsTouched()
    const body = {
      email: this.SignInForm.controls.email.value,
      password: this.SignInForm.controls.password.value
    };
    this.SignInService.login(body).toPromise().then((data:any) =>{
      if(this.SignInForm.controls.remember.value){
        sessionStorage.setItem('email', this.SignInForm.controls.email.value)
      }else{
        sessionStorage.setItem('email', '');
      }
      console.log(data)
      sessionStorage.setItem('token', data.token)
      this.router.navigate(['/dash/home']);
    }).catch(error =>{
      console.log(error)
      Swal.fire({
        position: 'top-right',
        title: 'Error',
        text: 'Los datos no coinciden con nuestros registros',
        showConfirmButton: false,
        backdrop: false,
        width: 300,
        timer: 1500,
        customClass: {
          title: 'title-alert',
          htmlContainer:'content-alert'
        }
      })
    })
  }
}
