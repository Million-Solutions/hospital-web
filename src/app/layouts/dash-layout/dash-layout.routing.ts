import { Routes } from '@angular/router';

export const DashLayoutRoutes: Routes = [
    { path: 'home', loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule) },
    { path: 'hospitales', loadChildren: () => import('../../pages/hospital/hospital.module').then(m => m.HospitalModule) },
    { path: 'medicos', loadChildren: () => import('../../pages/doctors/doctors.module').then(m => m.DoctorsModule) },
    { path: 'pacientes', loadChildren: () => import('../../pages/patients/patients.module').then(m => m.PatientsModule) }
];
