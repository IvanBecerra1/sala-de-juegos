import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../servicio/autenticacion.service';

import { ToastrService } from 'ngx-toastr';
import { EAutenticacion } from '../../models/enumerador/EAutenticacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  public correo! : string;
  public clave! : string;
  public enProceso : boolean = false;
  private autenticacionServicio : AutenticacionService = inject(AutenticacionService);
  private toastr : ToastrService = inject(ToastrService);
  private router : Router = inject(Router);

  async iniciarSesion(){
    if (this.enProceso) return;
    this.enProceso = true;

    try {
      await this.autenticacionServicio.iniciarSesion(this.correo, this.clave);
      console.log("(inicio-sesion.component) Inicio sesion con exito; redirigiendo");

      this.mostrarMensaje(true, EAutenticacion.SESION_EXITO);
      this.router.navigate(["/home"]);

    } catch (error){
      console.log("error: ", error);
      this.mostrarError(error);
    }
    finally {
      this.enProceso = false;
    }
  }

  private mostrarError(error : any) {
    const mensajeError = new Map<string, EAutenticacion>([
      ["auth/email-already-in-use", EAutenticacion.CORREO_EN_USO],
      ["auth/weak-password", EAutenticacion.CLAVE_INVALIDO],
      ["auth/invalid-email", EAutenticacion.CORREO_INVALIDO],
      ["auth/missing-email", EAutenticacion.CAMPO_CORREO_VACIO],
      ["auth/missing-password", EAutenticacion.CAMPO_CLAVE_VACIO],
      ["auth/admin-restricted-operation", EAutenticacion.CAMPOS_VACIOS]
    ])

    const mensaje = mensajeError.get(error.code) || EAutenticacion.ERROR_DESCONOCIDO;
    this.mostrarMensaje(false, mensaje);

    console.error("(inicio-sesion.Component.ts): Error en el inicio-sesion:", error);
    console.error("(inicio-sesion.Component.ts): Detalles del error:", JSON.stringify(error));


  }

  private mostrarMensaje(exito : boolean, texto : string){
    exito ? 
      this.toastr.success(texto, EAutenticacion.INICIO_SESION_TITULO)
    :
      this.toastr.error(texto, EAutenticacion.INICIO_SESION_TITULO)
  }
  
  public llenarDatosRapidos(){
    this.correo = "becerraivan79@gmail.com";
    this.clave = "1234567890";
  }
}
