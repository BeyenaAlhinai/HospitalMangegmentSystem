// doctor.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../shared/hospital.service';
import { Doctor } from '../shared/hospital.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  doctorForm: FormGroup;
  selectedDoctorIndex: number | null = null;
errorMessage: any;
successMessage: any;
patients: any;

  constructor(private fb: FormBuilder, private hospitalService: HospitalService) {
    this.doctorForm = this.fb.group({
      doctorId: [null],
      doctorName: ['', Validators.required],
      gender: ['', Validators.required],
      specialization: ['', Validators.required],
      contactNumber: [''],
    });
  }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.hospitalService.getDoctors().subscribe(
      (doctors) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error loading doctors:', error);
      }
    );}

  addDoctor() {
    if (this.doctorForm.valid) {
      const newDoctor = this.doctorForm.value as Doctor;
      this.hospitalService.addDoctor(newDoctor).subscribe(() => {
        this.clearForm();
        this.loadDoctors();
      });
    }
  }

  updateDoctor() {
    if (this.selectedDoctorIndex !== null && this.doctorForm.valid) {
      const updatedDoctor = this.doctorForm.value as Doctor;
      this.hospitalService.updateDoctor(updatedDoctor).subscribe(() => {
        this.clearForm();
        this.loadDoctors();
        this.selectedDoctorIndex = null;
      });
    }
  }

  editDoctor(index: number) {
    this.selectedDoctorIndex = index;
    const selectedDoctor = this.doctors[index];

    this.doctorForm.patchValue({
      doctorId: selectedDoctor.DoctorId,
      doctorName: selectedDoctor.DoctorName,
      gender: selectedDoctor.Gender,
      specialization: selectedDoctor.Specilization,
      contactNumber: selectedDoctor.ContactNumber,
    });
  }

  deleteDoctor(index: number) {
    const doctorId = this.doctors[index]?.DoctorId;
  
    if (doctorId) {
      console.log('Deleting doctor with ID:', doctorId);
  
      this.hospitalService.deleteDoctor(doctorId).subscribe(() => {
        this.loadDoctors();
        this.clearForm();
      });
    } else {
      console.error('Error: Doctor ID is undefined or null.');
    }
  }

  clearForm() {
    this.doctorForm.reset({
      doctorId: null,
      doctorName: '',
      gender: '',
      specilization: '',
      contactNumber: '',
    });

    this.selectedDoctorIndex = null;
  }
}
