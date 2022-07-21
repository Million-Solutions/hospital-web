import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FunctionsComponent } from '../../shared/functions/functions.component';
import { PatientsService } from './services/patients.service';
import { DoctorsService } from '../doctors/services/doctors.service';
import { Patient } from '../../shared/models/patient.model';
import { Doctor } from '../../shared/models/doctor.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  patients: Patient[]
  doctors: Doctor[]
  form
  formPatient: FormGroup
  patient

  constructor(
    private route: Router,
    private routeActive: ActivatedRoute,
    private patientSv: PatientsService,
    private doctorSv: DoctorsService
  ) {
    routeActive.queryParams.subscribe(data =>{
      this.form = data.form
      if(this.form) this.initFormPatient()
    })
  }

  ngOnInit(): void {
    this.listPatients()
    this.listDoctors()
  }

  initFormPatient(item?, i?){
    this.patient = null
    if(!this.form){
      this.route.navigate([], {queryParams: { form: i != undefined ? i : true }});
    }
    this.formPatient = new FormGroup({
      nombre: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required)
    })
    if(item){
      setTimeout(() => {
        this.formPatient.patchValue(item)
        this.patient = item
      }, 20);
    }
  }

  listPatients(text?){
    this.patientSv.getPatient().subscribe((data:any) =>{
      this.patients = data.body
      if(this.form) this.initFormPatient(this.patients[this.form])
    })
    if(text) FunctionsComponent.alert(text)
  }

  listDoctors(){
    this.doctorSv.getDoctor().subscribe((data:any) =>{
      this.doctors = data.body
    })
  }

  createOrEdit(form, id){
    if(this.formPatient.invalid) return this.formPatient.markAllAsTouched()
    if(id){
      this.patientSv.putPatient(form, id).toPromise().then(data =>{
        this.listPatients('Paciente editado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }else{
      this.patientSv.postPatient(form).toPromise().then(data =>{
        this.listPatients('Paciente creado')
        this.route.navigate([]);
      }).catch(error =>{
        FunctionsComponent.alert(error.error.message, true)
      })
    }
  }

  createDoctorPatient(doctor) {
    const formDoctorPatient = {
      paciente_id: this.patient.id,
      medico_id: doctor.value
    }
    this.patientSv.postDoctorPatient(formDoctorPatient).toPromise().then((data:any) =>{
      this.patient.paciente_medicos.push(data.body)
      FunctionsComponent.alert('Doctor agregado')
    }).catch(error =>{
      FunctionsComponent.alert(error.error.message, true)
    })
  }

  deleteDoctor(id, i){
    Swal.fire({
      position: 'center',
      text: '¿Seguro que desea eliminar este Dcotor?',
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
        this.patientSv.deleteDoctorPatient(id).subscribe(data =>{
          this.patient.paciente_medicos.splice(i ,1)
          FunctionsComponent.alert('Doctor Eliminado')
        })
      }
    })
  }

  delete(id){
    Swal.fire({
      position: 'center',
      text: '¿Seguro que desea eliminar este pedido?',
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

      }
    })
  }
}
