import { inject, Injectable } from '@angular/core';


import { collection, addDoc, setDoc, doc, getDoc, updateDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, fetchSignInMethodsForEmail, User } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { object } from '@angular/fire/database';
import { IUsuario } from '../models/interfaces/IUsuario';
import { Usuario } from '../models/clases/Usuario';
import { onAuthStateChanged } from '@firebase/auth';

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
  

  public async obtenerDatosUsuario(): Promise<Usuario | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, (firebaseUser) => {
        if (firebaseUser) {
          const usuario = new Usuario();
          usuario.UID = firebaseUser.uid;
          usuario.CORREO = firebaseUser.email ?? '';
          usuario.FECHA_REGISTRO = new Date();
          usuario.ULTIMA_CONEXION = new Date();
          resolve(usuario);
        } else {
          reject("No hay un usuario autenticado.");
        }
      });
    });
  }
  public obtenerUsuario() : User  | null {
    return this.fireAuth.currentUser;
  }
}
