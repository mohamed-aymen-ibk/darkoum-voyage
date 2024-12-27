import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from "../../auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    RouterLink,
    NgIf
  ]
})
export class NavbarComponent {
  isLogoutModalVisible = false;
  isMenuOpen = false; // Track menu visibility for mobile

  constructor(private authService: AuthService, private router: Router) {}

  openLogoutModal(): void {
    this.isLogoutModalVisible = true;
  }

  closeLogoutModal(): void {
    this.isLogoutModalVisible = false;
  }

  confirmLogout(): void {
    this.isLogoutModalVisible = false;
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
