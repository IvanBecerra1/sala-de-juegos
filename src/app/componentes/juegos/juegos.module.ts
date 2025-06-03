// juegos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { MatematicasComponent } from './matematicas/matematicas.component';
import { DragonballzComponent } from './dragonballz/dragonballz.component';
import { authJuegosGuard } from '../../guards/auth-juegos.guard';

const routes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent, canActivate: [authJuegosGuard] },
  { path: 'preguntados', component: PreguntadosComponent, canActivate: [authJuegosGuard] },
  { path: 'mayormenor', component: MayormenorComponent, canActivate: [authJuegosGuard] },
  { path: 'matematicas', component: MatematicasComponent, canActivate: [authJuegosGuard] }
];

@NgModule({
  declarations: [
    AhorcadoComponent,
    PreguntadosComponent,
    MayormenorComponent,
    MatematicasComponent,
    DragonballzComponent
  ],
  imports: [
    CommonModule,      // Importa módulos necesarios para el funcionamiento de Angular
    RouterModule.forChild(routes)  // Configura las rutas para este módulo
  ]
})
export class JuegosModule { }
