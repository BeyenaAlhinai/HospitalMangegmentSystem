import { Component } from '@angular/core';
import { HospitalService } from './shared/hospital.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hospital';
  isLoggedIn: boolean = false;

  login(): void {
    // Implement your login logic here
    // Set isLoggedIn to true if login is successful
    this.isLoggedIn = true;
    alert('Logged in successfully!');
  }

  logout(): void {
    // Implement your logout logic here
    // Set isLoggedIn to false if logout is successful
    this.isLoggedIn = false;
    alert('Logged out successfully!');
  }
  }

