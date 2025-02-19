import { Usuario } from "./Usuario";

import { Injectable } from '@angular/core';

export class FormatoChat {
    usuario : Usuario;
    mensaje : string;
    fecha : Date;
    constructor(usuario: Usuario, mensaje: string) {
        this.usuario = usuario;
        this.mensaje = mensaje;
        this.fecha = new Date(); // Inicializa la fecha actual
    }
    
    toFirestore(): any {
        return {
          usuario: this.usuario.toFirestore(), // Asegúrate de que "usuario" también sea un objeto plano
          mensaje: this.mensaje,
          fecha: this.fecha.toISOString() // Convierte la fecha a un formato serializable
        };
      }

}
