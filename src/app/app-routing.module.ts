import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componentes/home/home.component';
import { ERutas } from './models/enumerador/ERutas';
import { ChatComponent } from './componentes/chat/chat.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { MayormenorComponent } from './componentes/juegos/mayormenor/mayormenor.component';

const routes: Routes = [
  { 
    path: ERutas.HOME, component: HomeComponent, 
  },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'chat', component: ChatComponent },

  { path: 'ahorcado', component:AhorcadoComponent},
  { path: 'preguntados', component:PreguntadosComponent},
  { path: 'mayormenor', component:MayormenorComponent},

  { path: '**', redirectTo: ERutas.HOME, pathMatch: 'full' } // Redirige a HOME en cualquier otra ruta
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
