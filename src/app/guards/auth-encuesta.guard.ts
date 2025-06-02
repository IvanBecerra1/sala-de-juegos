import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AutenticacionService } from '../servicio/autenticacion.service';
import { ERutas } from '../models/enumerador/ERutas';

export const authEncuestaGuard: CanActivateFn = (route, state) => {
  const autenticacionServicio = inject(AutenticacionService); 
  const toastr : ToastrService = inject(ToastrService);
  const logueado = autenticacionServicio.obtenerUsuario(); 
  const router = inject(Router);

  if (!logueado) {
    toastr.error("Debes iniciar Sesión, para acceder a la encuesta", "Encuesta");  

    router.navigate([ERutas.HOME]); 
    return false; 
  }

  return true; 
};
