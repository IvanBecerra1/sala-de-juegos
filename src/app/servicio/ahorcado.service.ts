import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService {
  private palabra: string = "";
  private palabraOculta: string = "";
  private intentos: number = 0;
  private perdidas: number = 0;
  private puntosGanados: number = 0;

  private LISTA_PALABRAS: string[] = ["messi"];
  private LETRAS: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); 

  constructor() {}

  public iniciarJuego() {
    this.palabra = this.obtenerPalabraAleatoria().toUpperCase();
    this.palabraOculta = "_".repeat(this.palabra.length); // Se crea la palabra oculta sin espacios
    this.intentos = 0;
  }

  private obtenerPalabraAleatoria(): string {
    return this.LISTA_PALABRAS[Math.floor(Math.random() * this.LISTA_PALABRAS.length)];
  }

  public comprobarLetra(letra: string): boolean {  
    if (this.verificarGanador()) return false;

    if (this.palabra.indexOf(letra) === -1) { // Si la letra no está
      this.intentos++;
      return false;
    }

    let palabraArray = this.palabraOculta.split(""); 
    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraArray[i] = letra;
      }
    }

    this.palabraOculta = palabraArray.join("");
    this.puntosGanados++;
    
    return true;
  }

  public verificarGanador(): boolean {
    // si ya no hay espacios "_" se da como ganado
    return !this.palabraOculta.includes("_") || this.intentos >= 9;
  }

  public obtenerPalabraOculta(): string {
    return this.palabraOculta;
  }

  public obtenerIntentos(): number {
    return this.intentos;
  }

  public obtenerLetras(): string[] {
    return this.LETRAS;
  }

  public obtenerPuntos(): number {
    return this.puntosGanados;
  }

  public obtenerPalabra(): string {
    return this.palabra;
  }
}
