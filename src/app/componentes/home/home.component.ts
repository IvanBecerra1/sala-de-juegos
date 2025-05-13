import { Component, inject, OnInit } from '@angular/core';
import { AutenticacionService } from '../../servicio/autenticacion.service';
import { Usuario } from '../../models/clases/Usuario';
import { Router } from '@angular/router';
import { ERutas } from '../../models/enumerador/ERutas';
import { user, User } from '@angular/fire/auth';
import { ChatService } from '../../servicio/chat.service';
import { FormatoChat } from '../../models/clases/formato-chat';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  public usuarioEncontrado : any;
  protected usuario : Usuario = inject(Usuario);

  private autenticacion : AutenticacionService = inject(AutenticacionService);
  private router : Router = inject(Router);
  private chatServicio : ChatService = inject(ChatService);
  imagenes = [
    { src: 'assets/ahorcado.png', ruta: 'ahorcado' },
    { src: 'assets/cartas.jpg', ruta: 'mayormenor' },
    { src: 'assets/quiz-matematica.jpg', ruta: 'matematicas' },
    { src: 'assets/quiz-paises.jpg', ruta: 'preguntados' }
  ];
  
  ngOnInit(): void {
    this.usuarioEncontrado = this.autenticacion.obtenerUsuario();

    if (this.usuarioEncontrado) {
      this.usuario.CORREO = this.usuarioEncontrado.email;
      this.usuario.UID = this.usuarioEncontrado.uid;
    }

    this.autenticacion.obtenerDatosUsuario().then( (resultado) =>{
      console.log("(home.component.ts) DATOS USUARIO: ", JSON.stringify(resultado));
    }).catch((error) =>{
      console.log("(home.component.ts) ERROR DATOS USUARIO: ", error);

    })

  }

  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  inicio(){
    this.router.navigate([ERutas.HOME]);
  }

  iniciarSesion(){
    this.router.navigate([ERutas.INICIO_SESION]);
  }
  registrarme(){
    this.router.navigate([ERutas.REGISTRO]);

  }
  ahorcado() {
    this.router.navigate(["ahorcado"]);
  }
  preguntados() {
    this.router.navigate(["preguntados"]);
  }
  mayorMenor() {
    this.router.navigate(["mayormenor"]);
  }
  matematicas() {
    this.router.navigate(["matematicas"]);
  }
  encuesta() {
    this.router.navigate(["envuesta-v2"]);
  }
  cerrarSesion(){
    if (!this.autenticacion.obtenerUsuario()){
      console.log("No hay sesion iniciada");
      return;
    }

    this.autenticacion.cerrarSesion().then((resultado) =>{
      this.usuario.CORREO = "no sesión iniciada";
      this.usuario.UID = "";  
      this.usuarioEncontrado = null;  
    }).catch((error) =>{
      console.log("(homeComponent.ts) error : ", error);
    });

  }
  jugar(rutaJuego: string) {
    this.router.navigate([rutaJuego]);
  }
  mostrarCerrarJuego() : boolean {
    return this.router.url !== "/" 

  }
  mostrarCarrusel(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
