import { Component, inject, OnInit } from '@angular/core';
import { Usuario } from '../../models/clases/Usuario';
import { AutenticacionService } from '../../servicio/autenticacion.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EAutenticacion } from '../../models/enumerador/EAutenticacion';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public usuarioEncontrado : any;
  protected usuario : Usuario = inject(Usuario);

  private autenticacion : AutenticacionService = inject(AutenticacionService);
  private router : Router = inject(Router);
    private toastr : ToastrService = inject(ToastrService);

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
  cerrarSesion(){
    if (!this.autenticacion.obtenerUsuario()){
      console.log("No hay sesion iniciada");
      return;
    }

    this.autenticacion.cerrarSesion().then((resultado) =>{
      this.usuario.CORREO = "no sesión iniciada";
      this.usuario.UID = "";  
      this.usuarioEncontrado = null;  
      this.navegarA("/home");
      this.mostrarMensaje(true, "Se cerro la sesion sastifactoriamente.")
    }).catch((error) =>{
      console.log("(homeComponent.ts) error : ", error);
    });

  }
  navegarA(ruta: string) {
    this.router.navigate([ruta]);
  }

  private mostrarMensaje(exito : boolean, texto : string){
      exito ? 
        this.toastr.success(texto, "Sesión de usuario")
      :
        this.toastr.error(texto, EAutenticacion.INICIO_SESION_TITULO)
    }
}
