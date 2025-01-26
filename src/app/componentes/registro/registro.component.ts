import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../servicio/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { EAutenticacion } from '../../models/enumerador/EAutenticacion';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  correo! : string;
  clave! : string;
  enProceso : boolean = false;

  private autenticacionServicio : AutenticacionService = inject(AutenticacionService);
  private toastr: ToastrService = inject(ToastrService);
  private router: Router = inject(Router); 

  async registrar() {
    if (this.enProceso) return;
    this.enProceso = true;

    try {
      await this.autenticacionServicio.registrar(this.correo, this.clave);
      this.mostrarTastr(true, EAutenticacion.SESION_EXITO);

      await this.autenticacionServicio.iniciarSesion(this.correo, this.clave)
      console.log("Inicio de sesión automático exitoso");
      this.router.navigate(['/home']);

    } catch(error){
      console.error("(registro.component) Error en el proceso: ", error);
      this.manejarError(error);
    }
    finally{
      this.enProceso = false;
    }
  }
  
  private manejarError(error: any) {

    // MAPS CLAVE VALOR
    const mensajesError = new Map<string, EAutenticacion>([
      ["auth/email-already-in-use", EAutenticacion.CORREO_EN_USO],
      ["auth/weak-password", EAutenticacion.CLAVE_INVALIDO],
      ["auth/invalid-email", EAutenticacion.CORREO_INVALIDO],
      ["auth/missing-email", EAutenticacion.CAMPO_CORREO_VACIO],
      ["auth/missing-password", EAutenticacion.CAMPO_CLAVE_VACIO],
      ["auth/admin-restricted-operation", EAutenticacion.CAMPOS_VACIOS]
    ]);

    const mensaje = mensajesError.get(error.code) || EAutenticacion.ERROR_DESCONOCIDO;
    this.mostrarTastr(false, mensaje);
  
    console.error("(Registro.Component.ts): Error en el registro:", error.code);
    console.error("(Registro.Component.ts): Detalles del error:", JSON.stringify(error));
  }
  

  private mostrarTastr(exito : boolean, texto : string){
    exito ? 
      this.toastr.success(texto, EAutenticacion.REGISTRO_TITULO)
    : 
      this.toastr.error(texto, EAutenticacion.REGISTRO_TITULO);

  }

}
