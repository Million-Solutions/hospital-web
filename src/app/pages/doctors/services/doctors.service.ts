import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  BASE_URL: string;

  constructor( private http: HttpClient ) {
    this.BASE_URL = environment.API_URL;
  }

  getDoctor(){
    return this.http.get(`${this.BASE_URL}/api/medico`, {
      observe: 'response'
    })
  }
  postDoctor(form){
    return this.http.post(`${this.BASE_URL}/api/medico`, form,{
      observe: 'response'
    })
  }
  putDoctor(form, id){
    return this.http.put(`${this.BASE_URL}/api/medico/${id}`, form,{
      observe: 'response'
    })
  }
  deleteDoctor(id){
    return this.http.delete(`${this.BASE_URL}/api/medico/${id}`, {
      observe: 'response'
    })
  }
}
