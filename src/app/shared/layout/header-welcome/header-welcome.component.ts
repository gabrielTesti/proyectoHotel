import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';

@Component({
  selector: 'app-header-welcome',
  templateUrl: './header-welcome.component.html',
  styleUrls: ['./header-welcome.component.css']
})
export class HeaderWelcomeComponent {

  constructor(public dialog: MatDialog) {}

  openRegisterModal() {
    this.dialog.open(RegisterComponent, {
      width: "400px",
    });
  }

  openLoginModal() {
    this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }
}