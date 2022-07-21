import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hospital } from 'src/app/shared/models/hospital.model';
import Swal from 'sweetalert2';
import { FunctionsComponent } from '../../shared/functions/functions.component';
import { HospitalService } from './services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {
  hospitals: Hospital[]
  form
  formHospital: FormGroup
  hospitalId: number | null

  constructor(
    private route: Router,
    private routeActive: ActivatedRoute,
    private hospitalSv: HospitalService
  ) {
    routeActive.queryParams.subscribe(data =>{
      this.form = data.form
      if(this.form) this.initFormHospital()
    })
  }

  ngOnInit(): void {
    this.listHospitals()
  }

  initFormHospital(item?, i?){
    this.hospitalId = null
    if(!this.form){
      this.route.navigate([], {queryParams: { form: i != undefined ? i : true }});
    }
    this.formHospital = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required)
    })
    if(item){
      setTimeout(() => {
        this.formHospital.patchValue(item)
        this.hospitalId = item.id
      }, 20);
    }
  }

  listHospitals(text?){
    this.hospitalSv.getHospitals().toPromise().then((data:any) =>{
      this.hospitals = data.body
      if(this.form) this.initFormHospital(this.hospitals[this.form])
    }).catch(error =>{
      FunctionsComponent.alert(error.error.message, true)
    })
    if(text) FunctionsComponent.alert(text)
  }

  createOrEdit(form, id){
    if(this.formHospital.invalid) return this.formHospital.markAllAsTouched()
    if(id){
      this.hospitalSv.putHospital(form, id).toPromise().then(data =>{
        this.listHospitals('Hospital editado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }else{
      this.hospitalSv.postHospital(form).toPromise().then(data =>{
        this.listHospitals('Hospital creado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }
  }

  delete(id){
    Swal.fire({
      position: 'center',
      text: '¿Seguro que desea eliminar este hospital?',
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
          this.listHospitals('Hospital eliminado')
        })
      }
    })
  }

}
