import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OperadorComponent } from './pages/operador/operador.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ReservaPageComponent } from './pages/reserva-page/reserva-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reserva-page', component: ReservaPageComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'operador', component: OperadorComponent },
  { path: '**', redirectTo: '' } // Redirige a la página de inicio si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
