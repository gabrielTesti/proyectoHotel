import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent {
  isLoggedIn = false;
  userName = '';

  constructor(public dialog: MatDialog, private loginService: LoginService) {
    this.loginService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const user = JSON.parse(localStorage.getItem('datosUsuario') || '{}');
        this.userName = user.nombre;
      }
    });
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.isLoggedIn = true;
        this.userName = result.userName;
      }
    });
  }

  openRegister(): void {
    this.dialog.open(RegisterComponent, {
      width: '400px'
    });
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.userName = '';
  }
}