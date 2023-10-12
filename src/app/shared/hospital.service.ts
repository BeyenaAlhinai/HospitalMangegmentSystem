// hospital.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor } from './hospital.model';
import { patient } from './hospital.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private apiUrl = 'http://localhost:5033/api';

 
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Observable to expose authentication state
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    // Assuming your API has an endpoint for login, adjust the URL accordingly
    const loginUrl = `${this.apiUrl}/login`;

    // Assuming the API returns an authentication token on successful login
    return this.http.post<any>(loginUrl, { username, password }).pipe(
      tap((response) => {
        // If login is successful, update the authentication state
        if (response && response.token) {
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  // Logout method
  logout(): void {
    // Assuming your API has an endpoint for logout, adjust the URL accordingly
    const logoutUrl = `${this.apiUrl}/logout`;

    // Assuming the API clears the authentication token on logout
    this.http.post(logoutUrl, {}).subscribe(() => {
      // Update the authentication state
      this.isAuthenticatedSubject.next(false);
    });
  }

  // Doctors

  getDoctors(): Observable<Doctor[]> {
    const doctorsUrl = `${this.apiUrl}/doctors`;
    return this.http.get<Doctor[]>(doctorsUrl);
  }

  addDoctor(doctor: Doctor): Observable<Doctor> {
    const doctorsUrl = `${this.apiUrl}/doctors`;
    return this.http.post<Doctor>(doctorsUrl, doctor);
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    const doctorUrl = `${this.apiUrl}/doctors/${doctor.DoctorId}`;
    return this.http.put<Doctor>(doctorUrl, doctor);
  }

  deleteDoctor(doctorId: number): Observable<any> {
    const url = `${this.apiUrl}/doctors/${doctorId}`;
    return this.http.delete<any>(url);
  }

  // Patients

  getPatients(): Observable<patient[]> {
    const patientsUrl = `${this.apiUrl}/patients`;
    return this.http.get<patient[]>(patientsUrl);
  }

  addPatient(patient: patient): Observable<patient> {
    const patientsUrl = `${this.apiUrl}/patients`;
    return this.http.post<patient>(patientsUrl, patient);
  }

  updatePatient(patient: patient): Observable<patient> {
    const patientUrl = `${this.apiUrl}/patients/${patient.PatientId}`;
    return this.http.put<patient>(patientUrl, patient);
  }

  deletePatient(patientId: number): Observable<any> {
    const patientUrl = `${this.apiUrl}/patients/${patientId}`;
    return this.http.delete<any>(patientUrl);
  }
}
