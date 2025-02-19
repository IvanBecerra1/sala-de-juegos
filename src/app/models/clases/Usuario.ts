
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class Usuario implements IUsuario {
    UID: any;
    FECHA_REGISTRO: any;
    ULTIMA_CONEXION: any;
    CORREO!: string;

    public Usuario(){

    }


    toFirestore(): any {
      return {
        ID : this.UID,
        CORREO : this.CORREO,
        FECHA_REGISTRO : this.FECHA_REGISTRO,
        ULTIMA_CONEXION : this.ULTIMA_CONEXION,
      };
    }
}