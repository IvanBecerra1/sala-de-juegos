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
import { DragonballzComponent } from './componentes/juegos/dragonballz/dragonballz.component';
import { MatematicasComponent } from './componentes/juegos/matematicas/matematicas.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';

const routes: Routes = [
  {
    path: ERutas.HOME, component: HomeComponent, children: [
      { path: ERutas.AHORCADO, component: AhorcadoComponent },
      { path: ERutas.PREGUNTADOS, component: PreguntadosComponent },
      { path: ERutas.MAYORMENOR, component: MayormenorComponent },
      { path: ERutas.MATEMATICAS, component: MatematicasComponent },
    ]
  },
  { path: ERutas.REGISTRO, component: RegistroComponent },
  { path: ERutas.INICIO_SESION, component: InicioSesionComponent },
  { path: ERutas.ENCUESTA, component: EncuestaComponent },
  { path: ERutas.QUIEN_SOY, component: QuienSoyComponent },
  { path: ERutas.CHAT, component: ChatComponent },
  { path: '**', redirectTo: ERutas.HOME, pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
