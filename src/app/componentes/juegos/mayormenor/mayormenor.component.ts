import { Component, inject, OnInit } from '@angular/core';
import { MayormenorService } from '../../../servicio/mayormenor.service';
import { GuardarResultadoService } from '../../../servicio/guardar-resultado.service';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.scss'
})
export class MayormenorComponent implements OnInit{
  idCarta: string = '';
  cartaActual: any = null;
  nuevaCarta: any = null;
  nuevoValor : number = 0;
  mensaje: string = '';
  valorActual: number = 0;
  mostrarCargando : boolean = false;
  puntos : number = 0;
  intentos : number = 3;

  
  public cartaServicio = inject(MayormenorService);
  private resultadoServicio : GuardarResultadoService = inject(GuardarResultadoService);
  
  ngOnInit(): void {
    this.obtenerNuevoMazo();
  }

  obtenerNuevoMazo() {
    this.cartaServicio.obtenerNuevoMazo().subscribe( (data : any) => {
      this.idCarta = data.deck_id;
      this.extraerCarta();
    });
  }

  extraerCarta() {
    this.cartaServicio.extraerCarta(this.idCarta).subscribe( (data : any) => {
      this.cartaActual = data.cards[0];
      this.valorActual = this.cartaServicio.obtenerValorCarta(this.cartaActual.value);
      this.mensaje = '';
    });
  }

  adivinar(esMayor: boolean) {
    
      this.cartaServicio.extraerCarta(this.idCarta).subscribe( (data: any) => {
      this.nuevaCarta = data.cards[0];
      this.nuevoValor = this.cartaServicio.obtenerValorCarta(this.nuevaCarta.value);
      const resultado = 
        esMayor ? 
          (this.nuevoValor > this.valorActual) 
        : 
          (this.nuevoValor < this.valorActual);

      console.log("carta nueva:");
      console.log(this.nuevaCarta);
      console.log("carta anterior:");
      console.log(this.cartaActual);
      
      this.esperarTiempo(3000);

      if (this.intentos === 0){
        this.mensaje = 'Se te acabaron las vidas!!! tu mayor puntaje fue: ' + this.puntos;
            
        this.puntos = 0;
        this.intentos = 3;

        return;
      }
      if (resultado) {
        this.mensaje = 'Felicidades ganaste un punto por acertar';
        this.puntos++;
      } else {
        this.mensaje = 'Fallaste!!!!';
        this.intentos--;
      }
    });
  }

  async esperarTiempo(ms: number) {
    this.mostrarCargando = true;
    await this.iniciarTiempo(ms); 
    this.mostrarCargando = false;

    if (this.intentos === 0){
      this.puntos = await this.resultadoServicio.procesoGuardado(this.puntos, "mayorMenor");
      this.intentos = 3;
    }
    this.cartaActual = this.nuevaCarta;
    this.valorActual = this.nuevoValor;

    return false;
  }
  iniciarTiempo(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

}
