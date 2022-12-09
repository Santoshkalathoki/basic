import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutRequest } from 'src/app/auth/login/LogoutRequet';
import { AuthService } from 'src/app/client-side/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  logoutRequest: LogoutRequest = new LogoutRequest();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    console.log('Logout method called');
    const logoutEndpoint = '/users/logout';

    this.logoutRequest.email = localStorage.getItem('Name') as string;
    console.log('get email from localstorage ', this.logoutRequest.email);
    this.authService.logout(this.logoutRequest).subscribe(
      (response: any) => {
        console.log('logout success');

        this.router.navigate(['/auth/login']);

        localStorage.removeItem('Name');
        localStorage.removeItem('userId');
      },
      (error: any) => {
        console.log('Error on sending the data');
        console.error(error);
      }
    );
  }

  onProfile() {
    this.router.navigate(['/client-side/profile']);
  }
}
