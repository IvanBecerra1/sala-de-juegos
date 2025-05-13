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
          usuario: this.usuario.toFirestore(), 
          mensaje: this.mensaje,
          fecha: this.fecha.toISOString()
        };
      }

}
