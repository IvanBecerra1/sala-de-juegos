import { CanActivateChildFn, Route, Router } from '@angular/router';
import { AutenticacionService } from '../servicio/autenticacion.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { ERutas } from '../models/enumerador/ERutas';

export const authJuegosGuard: CanActivateChildFn = (childRoute, state) => {
  const autenticacionServicio = inject(AutenticacionService); 
  const toastr : ToastrService = inject(ToastrService);
  const logueado = autenticacionServicio.obtenerUsuario(); 
  const router = inject(Router);

  if (!logueado) {
    toastr.error("Debes iniciar Sesión, para acceder a los juegos", "Juegos Online");  

    router.navigate([ERutas.HOME]); 
    return false; 
  }
  return true; 
};
