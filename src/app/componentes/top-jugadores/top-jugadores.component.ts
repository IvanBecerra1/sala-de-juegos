import { Component, OnInit } from '@angular/core';
import { GuardarResultadoService } from '../../servicio/guardar-resultado.service';
@Component({
  selector: 'app-top-jugadores',
  templateUrl: './top-jugadores.component.html',
  styleUrl: './top-jugadores.component.scss',
})
export class TopJugadoresComponent implements OnInit {
  juegoActual: string = 'ahorcado';
  listaTop15Ahorcado: any[] = [];
  listaTop15MayorMenor: any[] = [];
  listaTop15Preguntados: any[] = [];
  listaTop15Matematicas: any[] = [];

  constructor(private resultadoSrv: GuardarResultadoService) {}

    
  ngOnInit() {
    this.cargarTops();
  }

  async cargarTops() {
    this.cargarTop15Ahorcado();
    this.cargarTop15MayorMenor();
    this.cargarTop15Preguntados();
    this.cargarTop15Matematicas();
  }

  
  async cargarTop15Ahorcado() {
    this.listaTop15Ahorcado = await this.resultadoSrv.obtenerTop15PorJuego('ahorcado');
  }

  async cargarTop15MayorMenor() {
    this.listaTop15MayorMenor = await this.resultadoSrv.obtenerTop15PorJuego('mayorMenor');
  }

  async cargarTop15Preguntados() {
    this.listaTop15Preguntados = await this.resultadoSrv.obtenerTop15PorJuego('preguntados');
  }

  async cargarTop15Matematicas() {
    this.listaTop15Matematicas = await this.resultadoSrv .obtenerTop15PorJuego('matematicas');
  }
}
