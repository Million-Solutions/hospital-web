import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  BASE_URL: string;

  constructor( private http: HttpClient ) {
    this.BASE_URL = environment.API_URL;
  }

  getPatient(){
    return this.http.get(`${this.BASE_URL}/api/paciente`, {
      observe: 'response'
    })
  }
  postPatient(form){
    return this.http.post(`${this.BASE_URL}/api/paciente`, form,{
      observe: 'response'
    })
  }
  putPatient(form, id){
    return this.http.put(`${this.BASE_URL}/api/paciente/${id}`, form,{
      observe: 'response'
    })
  }
  deletePatient(id){
    return this.http.delete(`${this.BASE_URL}/api/paciente/${id}`, {
      observe: 'response'
    })
  }

  postDoctorPatient(form){
    return this.http.post(`${this.BASE_URL}/api/medico-paciente`, form,{
      observe: 'response'
    })
  }
  deleteDoctorPatient(id){
    return this.http.delete(`${this.BASE_URL}/api/medico-paciente/${id}`, {
      observe: 'response'
    })
  }
}
