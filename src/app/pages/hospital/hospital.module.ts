import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalRoutingModule } from './hospital.routing';
import { HospitalComponent } from './hospital.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HospitalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HospitalRoutingModule
  ]
})
export class HospitalModule { }
