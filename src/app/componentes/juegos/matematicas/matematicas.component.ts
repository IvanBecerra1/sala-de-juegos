import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GuardarResultadoService } from '../../../servicio/guardar-resultado.service';

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.component.html',
  styleUrl: './matematicas.component.scss'
})
export class MatematicasComponent implements OnInit, OnDestroy {

  numero1: number = 0;
  numero2: number = 0;
  operador: string = '+';
  respuestaUsuario: number | null = null;
  puntos: number = 0;
  tiempoRestante: number = 30;
  intervalo: any;
  juegoFinalizado: boolean = false;
  bloqueado: boolean = false;
  mensajeError: string = '';
  opciones: number[] = [];
  private resultadoServicio : GuardarResultadoService  = inject(GuardarResultadoService);

  ngOnInit(): void {
    this.nuevaPregunta();
    this.iniciarTemporizador();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  iniciarTemporizador() {
    this.intervalo = setInterval(async() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        this.juegoFinalizado = true;

        await this.resultadoServicio.procesoGuardado(this.puntos, "matematicas");
      }
    }, 1000);
  }

  nuevaPregunta() {
    const operadores = ['+', '-', '*'];
    this.numero1 = this.obtenerNumeroAleatorio();
    this.numero2 = this.obtenerNumeroAleatorio();
    this.operador = operadores[Math.floor(Math.random() * operadores.length)];

    const resultadoCorrecto = this.calcularResultado();
    let resultadoIncorrecto = resultadoCorrecto;

    while (resultadoIncorrecto === resultadoCorrecto) {
      resultadoIncorrecto = resultadoCorrecto + (Math.floor(Math.random() * 10) - 5);
    }

    this.opciones = [resultadoCorrecto, resultadoIncorrecto].sort(() => Math.random() - 0.5);
  }

  obtenerNumeroAleatorio(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  calcularResultado(): number {
    switch (this.operador) {
      case '+': return this.numero1 + this.numero2;
      case '-': return this.numero1 - this.numero2;
      case '*': return this.numero1 * this.numero2;
      default: return 0;
    }
  }

  
  verificarRespuesta(respuestaSeleccionada: number) {
    if (respuestaSeleccionada === this.calcularResultado()) {
      this.puntos += 10;
      this.mensajeError = '';
      this.nuevaPregunta();
    } else {
      this.mensajeError = '❌ Fallaste, debes esperar 5 segundos';
      this.bloqueado = true;

      setTimeout(() => {
        this.bloqueado = false;
        this.mensajeError = '';
        this.nuevaPregunta();
      }, 5000);
    }
  }


  reiniciarJuego() {
    this.puntos = 0;
    this.tiempoRestante = 30;
    this.juegoFinalizado = false;
    this.nuevaPregunta();
    this.iniciarTemporizador();
  }
}
