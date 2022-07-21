import { Doctor } from './doctor.model';

export interface Patient{
  "id": number,
  "nombre": string,
  "cedula": string,
  "direccion": string,
  "telefono": string,
  "ciudad": string,
  "correo": string,
  "created_at": "2022-07-20T23:10:13.000000Z",
  "updated_at": "2022-07-20T23:10:22.000000Z",
  "paciente_medicos": Doctor[]
}
