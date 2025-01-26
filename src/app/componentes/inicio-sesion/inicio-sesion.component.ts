import { Component, inject } from '@angular/core';
import { AutenticacionService } from '../../servicio/autenticacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  public correo! : string;
  public clave! : string;
  private autenticacionServicio : AutenticacionService = inject(AutenticacionService);


  iniciarSesion(){
    this.autenticacionServicio.inciarSesion(this.correo, this.clave);
  }
  
}
