import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AhorcadoComponent } from './componentes/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './componentes/chat/chat.component';
import { MayormenorComponent } from './componentes/juegos/mayormenor/mayormenor.component';
import { HttpClientModule } from '@angular/common/http';
import { DragonballzComponent } from './componentes/juegos/dragonballz/dragonballz.component';
import { MatematicasComponent } from './componentes/juegos/matematicas/matematicas.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CerrarJuegoComponent } from './componentes/cerrar-juego/cerrar-juego.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ModalResultadoComponent } from './componentes/modal-resultado/modal-resultado.component';
import { TopJugadoresComponent } from './componentes/top-jugadores/top-jugadores.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    InicioSesionComponent,
    RegistroComponent,
    AhorcadoComponent,
    PreguntadosComponent,
    ChatComponent,
    MayormenorComponent,
    DragonballzComponent,
    MatematicasComponent,
    EncuestaComponent,
    CerrarJuegoComponent,
    ModalResultadoComponent,
    TopJugadoresComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"utn-juegos-2025","appId":"1:791436188633:web:1b93df6350919f8b6817c8","storageBucket":"utn-juegos-2025.firebasestorage.app","apiKey":"AIzaSyB3igy4Iq4oE_ISio4Gp4P9cobka9I8S8c","authDomain":"utn-juegos-2025.firebaseapp.com","messagingSenderId":"791436188633"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
