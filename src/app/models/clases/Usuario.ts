
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class Usuaro implements IUsuario {
    UID: any;
    FECHA_REGISTRO: any;
    ULTIMA_CONEXION: any;
    CORREO!: string;
}