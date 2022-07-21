import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FunctionsComponent } from '../../shared/functions/functions.component';
import { DoctorsService } from './services/doctors.service';
import { HospitalService } from '../hospital/services/hospital.service';
import { Doctor } from '../../shared/models/doctor.model';
import { Hospital } from '../../shared/models/hospital.model';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  doctors: Doctor[]
  hospitals: Hospital[]
  form
  formDoctor: FormGroup
  doctorId: number | null

  constructor(
    private route: Router,
    private routeActive: ActivatedRoute,
    private doctorSv: DoctorsService,
    private hospitalSv: HospitalService
  ) {
    routeActive.queryParams.subscribe(data =>{
      this.form = data.form
      if(this.form) this.initFormDoctor()
    })
  }

  ngOnInit(): void {
    this.listDoctors()
    this.listHospitals()
  }

  initFormDoctor(item?, i?){
    this.doctorId = null
    if(!this.form){
      this.route.navigate([], {queryParams: { form: i != undefined ? i : true }});
    }
    this.formDoctor = new FormGroup({
      nombre: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      cargo: new FormControl('', Validators.required),
      hospital_id: new FormControl(null, Validators.required)
    })
    if(item){
      setTimeout(() => {
        this.formDoctor.patchValue(item)
        this.doctorId = item.id
      }, 20);
    }
  }

  listDoctors(text?){
    this.doctorSv.getDoctor().subscribe((data:any) =>{
      this.doctors = data.body
      if(this.form) this.initFormDoctor(this.doctors[this.form])
    })
    if(text) FunctionsComponent.alert(text)
  }

  listHospitals(){
    this.hospitalSv.getHospitals().subscribe((data:any) =>{
      this.hospitals = data.body
    })
  }

  createOrEdit(form, id){
    if(this.formDoctor.invalid) return this.formDoctor.markAllAsTouched()
    if(id){
      this.doctorSv.putDoctor(form, id).toPromise().then(data =>{
        this.listDoctors('Medico editado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }else{
      this.doctorSv.postDoctor(form).toPromise().then(data =>{
        this.listDoctors('Medico creado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }
  }

  delete(id){
    Swal.fire({
      position: 'center',
      text: '¿Seguro que desea cancelar este medico?',
      width: 350,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      reverseButtons: true,
      customClass: {
        actions: 'mt-1',
        confirmButton: 'btn-danger'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalSv.deleteHospital(id).subscribe(data =>{
          this.listDoctors('Hospital eliminado')
        })
      }
    })
  }

}
