import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HospitalService } from './hospital.service';

describe('HospitalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HospitalService],
    });
  });

  it('should be created', () => {
    const service: HospitalService = TestBed.inject(HospitalService);
    expect(service).toBeTruthy();
  });
});
