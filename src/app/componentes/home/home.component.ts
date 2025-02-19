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
}
