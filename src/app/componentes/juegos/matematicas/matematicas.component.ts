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

  verificarRespuesta() {
    if (this.respuestaUsuario === this.calcularResultado()) {
      this.puntos += 10;
    }
    this.respuestaUsuario = null;
    this.nuevaPregunta();
  }

  reiniciarJuego() {
    this.puntos = 0;
    this.tiempoRestante = 30;
    this.juegoFinalizado = false;
    this.nuevaPregunta();
    this.iniciarTemporizador();
  }
}
