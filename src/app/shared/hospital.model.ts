// hospital.model.ts

export interface Doctor {
  DoctorId: number;
  DoctorName: string;
  Gender: string;
  Specilization: string;
  ContactNumber: string;
}

export interface patient {
  PatientId: number;
  Name: string;
  Gender: string;
  Age:number;
  Address: string;
}
