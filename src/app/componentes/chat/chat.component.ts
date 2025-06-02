import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/clases/Usuario';
import { FormatoChat } from '../../models/clases/formato-chat';
import { ChatService } from '../../servicio/chat.service';
import { AutenticacionService } from '../../servicio/autenticacion.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  usuario: Usuario | null = new Usuario(); 
  mensaje: string = '';
  mensajes: FormatoChat[] = [];
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatServic: ChatService, private autenticacion : AutenticacionService) {}

  async ngOnInit() {
    /*
    this.usuario.CORREO = "test@test.com";
    this.usuario.UID = "asdasdasdas";
    this.usuario.FECHA_REGISTRO = new Date();
    this.usuario.ULTIMA_CONEXION = new Date();*/

    this.usuario = await this.autenticacion.obtenerDatosUsuario();
    
    console.log(this.usuario);
    this.chatServic.escucharMensajes((mensajes: FormatoChat[]) => {
      this.mensajes = mensajes;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  async enviarMensaje() {
    try {
      if (this.mensaje.trim() !== '' ) {
        let auxMensaje = this.mensaje;
        const formato = new FormatoChat(this.usuario!, auxMensaje);
        this.mensaje = ''; // Limpiar campo

        await this.chatServic.guardarMensaje(formato);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}