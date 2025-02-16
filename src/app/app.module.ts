import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; 
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInput, MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatIcon, MatIconModule} from '@angular/material/icon';










import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderMainComponent } from './shared/layout/header-main/header-main.component';
import { HeaderWelcomeComponent } from './shared/layout/header-welcome/header-welcome.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ReservaPageComponent } from './pages/reserva-page/reserva-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OperadorComponent } from './pages/operador/operador.component';
import { CheckinCheckoutComponent } from './pages/operador/checkin-checkout/checkin-checkout.component';
import { ReservarComponent } from './pages/operador/reservar/reservar.component';
import { ModificarUsuarioComponent } from './pages/operador/modificar-usuario/modificar-usuario.component';
import { ModificarDatosPersonalesComponent } from './pages/modificar-datos-personales/modificar-datos-personales.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    HeaderWelcomeComponent,
    FooterComponent,
    HomeComponent,
    ReservaPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    OperadorComponent,
    CheckinCheckoutComponent,
    ReservarComponent,
    ModificarUsuarioComponent,
    ModificarDatosPersonalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
