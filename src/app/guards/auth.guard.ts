import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../servicio/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { ERutas } from '../models/enumerador/ERutas';

export const authGuard: CanActivateFn = async (route, state) => {

  const autenticacionServicio = inject(AutenticacionService); 
  const toastr : ToastrService = inject(ToastrService);
  const logueado = autenticacionServicio.obtenerUsuario(); 
  const router = inject(Router);

  if (!logueado) {
    toastr.error("Debes iniciar Sesión, para acceder al chat", "Chat Online");  

    router.navigate([ERutas.HOME]); 
    return false; 
  }

  return true; 
};
/*


private mostrarMensaje(exito : boolean, texto : string){
    exito ? 
      this.toastr.success(texto, EAutenticacion.INICIO_SESION_TITULO)
    :
      this.toastr.error(texto, EAutenticacion.INICIO_SESION_TITULO)
  }
  */