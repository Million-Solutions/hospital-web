import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients.routing';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PatientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
