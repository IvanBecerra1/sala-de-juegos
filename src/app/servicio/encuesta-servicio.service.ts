import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestaServicioService {

  private readonly COLECCION = 'encuestas';

  private firestore: Firestore = inject(Firestore)

  guardarEncuesta(encuesta: any) {
    const ref = collection(this.firestore, this.COLECCION);
    return addDoc(ref, encuesta);
  }
}
