import { inject, Injectable } from '@angular/core';

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, Timestamp, serverTimestamp, increment } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AutenticacionService } from './autenticacion.service';
import {  query, where, orderBy, limit, getDocs } from '@angular/fire/firestore';
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

 async obtenerTop15PorJuego(nombreJuego: string): Promise<any[]> {
    const resultadosRef = collection(this.firestore, 'acumulados_juegos');
    const consulta = query(
      resultadosRef,
      where('juego', '==', nombreJuego),
      orderBy('puntos', 'desc'),
      limit(15)
    );

    const snapshot = await getDocs(consulta);

    return snapshot.docs.map(doc => ({
      usuario: doc.data()["correo"].split('@')[0],
      puntos: doc.data()["puntos"],
      fecha: doc.data()["ultimaFecha"]?.toDate().toLocaleDateString("es-AR") ?? 'Sin fecha'
    }));
  }
  

}
