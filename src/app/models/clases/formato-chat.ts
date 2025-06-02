import { Usuario } from "./Usuario";

import { Injectable } from '@angular/core';

export class FormatoChat {
    usuario : Usuario;
    mensaje : string;
    fecha : Date;
    constructor(usuario: Usuario, mensaje: string) {
        this.usuario = usuario;
        this.mensaje = mensaje;
        this.fecha = new Date(); 
    }
    
    toFirestore(): any {
        return {
          usuario: {
            CORREO: this.usuario.CORREO,
            UID: "test",
            FECHA_REGISTRO: this.usuario.FECHA_REGISTRO,
            ULTIMA_CONEXION: this.usuario.ULTIMA_CONEXION
          }, 
          mensaje: this.mensaje,
          fecha: this.fecha.toISOString()
        };
      }

}
