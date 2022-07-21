import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors.routing';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
