import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../servicio/autenticacion.service';
import { errorContext } from 'rxjs/internal/util/errorContext';

import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  correo! : string;
  clave! : string;
  private autenticacionServicio : AutenticacionService = inject(AutenticacionService);

  registrar(){
    this.autenticacionServicio.registrar(this.correo, this.clave)
    .catch((exito) =>{
      console.log("Registro existoso: " + exito);
    })
    .catch((error) => {
      console.log("Registro error: " + error);
    });
  }

}
