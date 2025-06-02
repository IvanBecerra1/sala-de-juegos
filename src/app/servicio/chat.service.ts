import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { docData, Firestore } from '@angular/fire/firestore'; 
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { FormatoChat } from '../models/clases/formato-chat';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private static readonly COLECCION_CHAT = "chat";
  private firestore : Firestore = inject(Firestore);


  public async guardarMensaje(chat : FormatoChat) : Promise<boolean> {
    try {
      const refDocumento = collection(this.firestore, ChatService.COLECCION_CHAT);

      await addDoc(refDocumento, chat.toFirestore());
      console.log("(chat.servuce) chat JSON: ", JSON.stringify(chat));

      return true;
    } catch (error) {
      throw error;
    }
  }

  public async cargarMensajes(): Promise<any[]> {
    try {
      const refColeccion = collection(this.firestore, ChatService.COLECCION_CHAT);
      const mensajesQuery = query(refColeccion, orderBy('fecha', 'asc')); // Ordena por fecha descendente

      const snapColeccion = await getDocs(mensajesQuery);
  
      const mensajes: any[] = []; // guardo los mensajes

      snapColeccion.forEach((doc) => {
        mensajes.push((doc.data()) as FormatoChat); 
      });
  
      return mensajes;
    } catch (error) {
      throw error;
    }
  }

  public escucharMensajes( callback: ( mensajes: FormatoChat[] ) => void ) : void {
    const refColeccion = collection(this.firestore, ChatService.COLECCION_CHAT);
    const mensajesQuery = query(refColeccion, orderBy('fecha', 'asc'));

    onSnapshot(mensajesQuery, (snapshot) => {
      const mensajes: FormatoChat[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        mensajes.push(data as FormatoChat);
      });

      callback(mensajes);
    });
  }
}
