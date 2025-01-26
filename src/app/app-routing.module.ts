import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { ERutas } from './models/enumerador/ERutas';

const routes: Routes = [
    {path: ERutas.HOME, component:HomeComponent},
    {path: 'registro', component:RegistroComponent},
    {path: 'login', component:InicioSesionComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
