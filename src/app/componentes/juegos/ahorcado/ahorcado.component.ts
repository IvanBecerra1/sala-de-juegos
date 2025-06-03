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
  rondaActual: number = 1;
  rondasTotales: number = 3;
  bonificacion: number = 100;

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
    console.log("Palabra a buscar:", this.ahorcadoService.obtenerPalabra());
  }

  async comprobar(letra: string) {
    if (this.letrasUsadas.includes(letra)) return; 
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
      this.puntosGanados += 30; 
    /*  if (this.rondaActual === this.rondasTotales) {
        console.log("BONIFICACION POR GANAR 100 PTS");
        this.puntosGanados += this.bonificacion; 
      }*/
      await this.resultadoServicio.procesoGuardado(this.puntosGanados, "ahorcado");
      console.log("PUNTOS GUARDADOS", this.puntosGanados);
      this.rondaActual++; 
    }
  
    if (this.perdio) {
      await this.resultadoServicio.procesoGuardado(this.puntosGanados, "ahorcado");
      console.log("PUNTOS GUARDADOS");
      this.puntosGanados = 0;
      this.rondaActual = 0;
    }
    console.log("RONDA = " + this.rondaActual)
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