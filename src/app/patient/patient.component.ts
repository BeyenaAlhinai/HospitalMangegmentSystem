// patient.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../shared/hospital.service';
import { patient } from '../shared/hospital.model';
interface ApiResponse {
  success: boolean;
  message: string | null;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: any[] = [];
  patientForm: FormGroup;
  selectedPatientIndex: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService) {
    this.patientForm = this.fb.group({
      patientId: [null],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.hospitalService.getPatients().subscribe(
      (patients: any[]) => {
        this.patients = patients;
        this.clearMessages();
      },
      (error: any) => {
        console.error('Error fetching patients:', error);
        this.errorMessage = 'Error fetching patients';
      }
    );
  }
  addpatient() {
    if (this.patientForm.valid) {
      const newpatient = this.patientForm.value as patient;
      this.hospitalService.addPatient(newpatient).subscribe(
        () => {
          this.clearForm();
          this.loadPatients();
        },
        (error: any) => {
          console.error('Error adding patient:', error);
          this.errorMessage = 'Error adding patient';
        }
      );
    }
  }
  
  updatepatient() {
    if (this.selectedPatientIndex !== null && this.patientForm.valid) {
      const updatedDoctor = this.patientForm.value as patient;
      this.hospitalService.updatePatient(updatedDoctor).subscribe(() => {
        this.clearForm();
        this.loadPatients();
        this.selectedPatientIndex = null;
      });
    }
  }
  

  deletePatient(index: number) {
    const patientId = this.patients[index]?.patientId;
    if (patientId) {
      this.hospitalService.deletePatient(patientId).subscribe(
        (response: ApiResponse) => this.handleResponse(response, () => this.loadPatients()),
        (error: any) => this.handleErrorResponse('Error deleting patient', error)
      );
    } else {
      this.errorMessage = 'Error: Patient ID is undefined or null.';
    }
  }

  editPatient(index: number) {
    this.selectedPatientIndex = index;
    const selectedPatient = this.patients[index];
    this.patientForm.patchValue(selectedPatient);
    this.clearMessages();
  }

  clearForm() {
    this.patientForm.reset();
    this.selectedPatientIndex = null;
    this.clearMessages();
  }

  private handleResponse(response: ApiResponse, onSuccess: () => void) {
    if (response.success) {
      this.successMessage = response.message;
      onSuccess();
    } else {
      this.errorMessage = response.message;
    }
  }

  private handleErrorResponse(errorMessage: string, error: any) {
    console.error(errorMessage, error);
    this.errorMessage = errorMessage;
  }

  private clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
  }
}
