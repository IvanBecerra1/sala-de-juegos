import { inject, Injectable } from '@angular/core';

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, Timestamp, serverTimestamp, increment } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, fetchSignInMethodsForEmail, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { IUsuario } from '../models/interfaces/IUsuario';
import { timestamp } from 'rxjs';
import { ref } from '@firebase/database';
import { AutenticacionService } from './autenticacion.service';
@Injectable({
  providedIn: 'root'
})
export class GuardarResultadoService {
  private static readonly TABLA_RESULTADOS = "resultados" 
  private firestore : Firestore = inject(Firestore)
  private autenticacion : AutenticacionService = inject(AutenticacionService);

  public async procesoGuardado(puntos: number, juego : string) : Promise<number> {

    try{
      const usuario = await this.autenticacion.obtenerDatosUsuario();
      const correo = usuario?.CORREO;

      if (correo){
        await this.guardarResultado(correo, puntos, juego)
        console.log("procesoGuardado : OK");
      }

      return 0;
    } catch(error){
      console.log("procesoGuardado : Fallo");
      return -1;
    }
  }

  private async guardarResultado(correo: string, puntos: number, juego: string) {
    try {
      const idDocumento = `${correo}_${juego}`;
      const referencia = doc(this.firestore, 'acumulados_juegos', idDocumento);
  
      await setDoc(referencia, {
        correo: correo,
        juego: juego,
        puntos: increment(puntos),
        ultimaFecha: serverTimestamp()
      }, { merge: true }); // merge:true para que no borre lo anterior
  
      console.log("guardarResultado : OK");
  
    } catch (error) {
      throw error;
    }
  }
}
