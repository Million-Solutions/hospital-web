import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  BASE_URL: string;

  constructor( private http: HttpClient ) {
    this.BASE_URL = environment.API_URL;
  }

  getHospitals(){
    return this.http.get(`${this.BASE_URL}/api/hospital`, {
      observe: 'response'
    })
  }
  postHospital(form){
    return this.http.post(`${this.BASE_URL}/api/hospital`, form,{
      observe: 'response'
    })
  }
  putHospital(form, id){
    return this.http.put(`${this.BASE_URL}/api/hospital/${id}`, form,{
      observe: 'response'
    })
  }
  deleteHospital(id){
    return this.http.delete(`${this.BASE_URL}/api/hospital/${id}`, {
      observe: 'response'
    })
  }
}
