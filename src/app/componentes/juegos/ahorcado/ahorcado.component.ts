import { Component, OnDestroy, OnInit } from '@angular/core';
import { AhorcadoService } from '../../../servicio/ahorcado.service';
import { GuardarResultadoService } from '../../../servicio/guardar-resultado.service';
import { AutenticacionService } from '../../../servicio/autenticacion.service';
import { IUsuario } from '../../../models/interfaces/IUsuario';
import { refFromURL } from '@angular/fire/database';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent implements OnInit, OnDestroy {
  vidas = 3;
  palabraOculta: string = "";
  intentos: number = 0;
  gano: boolean = false;
  perdio: boolean = false;
  letras: string[] = [];
  puntosGanados = 0;
  letrasUsadas: string[] = [];
  intervalo : any;
  tiempoRestante = 5;
  constructor(public ahorcadoService: AhorcadoService,
    public resultadoServicio : GuardarResultadoService,
    public autenticacion : AutenticacionService
  ) {}

  ngOnInit(): void {
    this.iniciarJuego();
    this.puntosGanados =0;
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

  async comprobar(letra: string) {
    if (this.letrasUsadas.includes(letra)) return; // prevención doble clic
    this.letrasUsadas.push(letra);
  
    const acierto = this.ahorcadoService.comprobarLetra(letra);
    this.palabraOculta = this.ahorcadoService.obtenerPalabraOculta();
    this.intentos = this.ahorcadoService.obtenerIntentos();
  
    if (this.ahorcadoService.verificarGanador()) {
      this.gano = !this.palabraOculta.includes("_");
      this.perdio = this.intentos >= 9;
      this.iniciarTemporizador()
    }
  
    if (this.gano) {
      this.puntosGanados += 35;
    }
  
    if (this.perdio) {
      this.puntosGanados = await this.resultadoServicio.procesoGuardado(this.puntosGanados, "ahorcado");
      this.puntosGanados = 0;
      
    }
  }

  reiniciarJuego(): void {
    this.letrasUsadas = [];
    this.iniciarJuego();
  }

  iniciarTemporizador() {
    this.intervalo = setInterval(async() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        this.reiniciarJuego();
        this.tiempoRestante = 5;
      }
    }, 1000);
  }
  
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }
}