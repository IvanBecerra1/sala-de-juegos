import { Component, OnInit } from '@angular/core';
import { AhorcadoService } from '../../../servicio/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit {
  palabraOculta: string = "";
  intentos: number = 0;
  gano: boolean = false;
  perdio: boolean = false;
  letras: string[] = [];

  constructor(public ahorcadoService: AhorcadoService) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.ahorcadoService.iniciarJuego();
    this.palabraOculta = this.ahorcadoService.obtenerPalabraOculta();
    this.intentos = this.ahorcadoService.obtenerIntentos();
    this.gano = false;
    this.perdio = false;
    this.letras = this.ahorcadoService.obtenerLetras();

    console.log(this.palabraOculta);
  }

  comprobar(letra: string): void {
    const acierto = this.ahorcadoService.comprobarLetra(letra);
    this.palabraOculta = this.ahorcadoService.obtenerPalabraOculta();
    this.intentos = this.ahorcadoService.obtenerIntentos();

    if (this.ahorcadoService.verificarGanador()) {
      this.gano = !this.palabraOculta.includes("_");
      this.perdio = this.intentos >= 9;
    }
  }

  reiniciarJuego(): void {
    this.iniciarJuego();
  }
}