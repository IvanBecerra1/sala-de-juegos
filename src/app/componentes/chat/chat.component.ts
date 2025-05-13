import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/clases/Usuario';
import { FormatoChat } from '../../models/clases/formato-chat';
import { ChatService } from '../../servicio/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  usuario: Usuario = new Usuario(); 
  mensaje: string = '';
  mensajes: FormatoChat[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatServic: ChatService) {}

  ngOnInit(): void {

    // cargar datos del usuario!
    
    this.cargarMensajes();
  }

  async cargarMensajes() {
    try {
      this.mensajes = await this.chatServic.cargarMensajes();
    } catch (error) {
      console.error("Error al cargar mensajes:", error);
    }
  }

  async enviarMensaje() {
    try {
      if (this.mensaje.trim() !== '') {

        this.usuario.CORREO = "test@test.com";

        this.usuario.UID = "asdasdasdas";
        this.usuario.FECHA_REGISTRO = new Date();
        this.usuario.ULTIMA_CONEXION = new Date();
        let formato : FormatoChat = new FormatoChat(this.usuario, this.mensaje);
        await this.chatServic.guardarMensaje(formato);
        this.mensaje = ''; 
        await this.cargarMensajes();

      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}