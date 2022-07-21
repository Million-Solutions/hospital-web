import { Patient } from "./patient.model"
import { Hospital } from './hospital.model';

export interface Doctor {
  "id": number,
  "nombre": string,
  "telefono": string,
  "ciudad": string,
  "correo": string,
  "cargo": string,
  "hospital_id": number,
  "created_at": Date,
  "updated_at": Date,
  "medico_pacientes": Patient[],
  "hospital": Hospital
}
