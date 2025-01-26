import { Injectable } from '@angular/core';


import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { object } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  constructor(private firestore: Firestore, private fireAuth: Auth) { }

  
  registrar(correo : string, clave : string) : Promise<any>{
    return createUserWithEmailAndPassword(this.fireAuth, correo, clave)
            .then(async (credencial) => {
              console.log("Credenciales del usuario: " + JSON.stringify(credencial));
              
              let indentificadorUsuario = credencial.user.uid;
              const documento = doc(this.firestore, "usuarios", indentificadorUsuario);
              await setDoc(documento,{
                "FECHA_REGISTRO" : new Date(),
                "CORREO" : correo
              })

              return credencial;
            })
            .catch((error) => {
              console.log("No se encontro nada; error: " + error);
              throw error;
            })
  }

  inciarSesion(correo : string, clave : string) : Promise<any>{
    return signInWithEmailAndPassword(this.fireAuth, correo, clave)
            .then((credencial) => {
              console.log("Usuario encontrado; " + credencial);
              return credencial;
            })
            .catch((error) =>{
              console.log("error: " + error);
              throw error;
            })
  }

  cerrarSesion() : Promise<void>{
    return signOut(this.fireAuth)
            .then((usuario) =>{
              console.log("Sesion cerrada con exito");
            })
            .catch((error) => {
              console.log("error: " + error);
              throw error;
            })
  }

  actualizarFechaSesion(){

  }

}
