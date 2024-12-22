import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    NgIf,
    RouterLink
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogoutModalVisible = false; // Track modal visibility

  constructor(private authService: AuthService, private router: Router) {}

  openLogoutModal(): void {
    this.isLogoutModalVisible = true; // Show the modal
  }

  closeLogoutModal(): void {
    this.isLogoutModalVisible = false; // Hide the modal
  }

  confirmLogout(): void {
    this.isLogoutModalVisible = false; // Hide the modal
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
