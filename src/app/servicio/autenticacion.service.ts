import { inject, Injectable } from '@angular/core';


import { collection, addDoc, setDoc, doc, getDoc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, fetchSignInMethodsForEmail, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { object } from '@angular/fire/database';
import { IUsuario } from '../models/interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private static readonly COLECCION_USUARIOS = "usuarios";

  private firestore: Firestore = inject(Firestore);
  private fireAuth: Auth = inject(Auth);
  
  async registrar(correo: string, clave: string): Promise<any> {
    try {
      const credencial = await createUserWithEmailAndPassword(this.fireAuth, correo, clave);
      const idUsuario = credencial.user.uid;
      const refDocumento = doc(this.firestore, AutenticacionService.COLECCION_USUARIOS, idUsuario);
      
      await setDoc(refDocumento, {
        FECHA_REGISTRO: serverTimestamp(),
        ULTIMA_CONEXION: serverTimestamp(),
        CORREO: correo
      });
  
      return credencial;
    } catch (error) {
      throw error;
    }
  }
  
  async iniciarSesion(correo: string, clave: string): Promise<any> {
    try {
      const credencial = await signInWithEmailAndPassword(this.fireAuth, correo, clave);
      const idUsuario = credencial.user.uid;
      const refDocumento = doc(this.firestore, AutenticacionService.COLECCION_USUARIOS, idUsuario);

      await updateDoc(refDocumento, { ULTIMA_CONEXION: serverTimestamp() });

      return credencial;
    } catch (error) {
      throw error;
    }
  }


  cerrarSesion(): Promise<void> {
    return signOut(this.fireAuth)
      .then(() => console.log("Sesión cerrada con éxito"))
      .catch(error => error);
  }
  

  public async obtenerDatosUsuario(): Promise<IUsuario | null> {
    const usuario = this.fireAuth.currentUser;
    if (!usuario) {
      return Promise.reject("No hay un usuario autenticado.");
    }
  
    const refDocumento = doc(this.firestore, AutenticacionService.COLECCION_USUARIOS, usuario.uid);
    const snapshotUsuario = await getDoc(refDocumento);
  
    return snapshotUsuario.exists() ? (snapshotUsuario.data() as IUsuario) : null;
  }
  
  public obtenerUsuario() : User  | null {
    return this.fireAuth.currentUser;
  }
}
