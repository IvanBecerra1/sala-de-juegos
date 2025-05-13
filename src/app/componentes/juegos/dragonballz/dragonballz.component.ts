import { Component, OnInit } from '@angular/core';
import { DragonballService } from '../../../servicio/dragonball.service';
import { IPersonajes } from '../../../models/interfaces/ipersonajes';

@Component({
  selector: 'app-dragonballz',
  templateUrl: './dragonballz.component.html',
  styleUrl: './dragonballz.component.scss'
})
export class DragonballzComponent implements OnInit {
  personajes: IPersonajes[] = [];
  personajeActual!: IPersonajes;
  opciones: string[] = [];
  respuestaSeleccionada: string | null = null;
  mostrarRespuesta: boolean = false;
  puntos: number = 0;

  constructor(private dbService: DragonballService) {}

  ngOnInit(): void {
    this.dbService.obtenerPersonajes().subscribe((data) => {
      this.personajes = data;
      console.log(this.personajes);
      this.nuevaRonda();
    });
  }

  nuevaRonda() {
    this.respuestaSeleccionada = null;
    this.mostrarRespuesta = false;

    // Elegimos personaje al azar
    this.personajeActual = this.personajes[Math.floor(Math.random() * this.personajes.length)];

    // Generamos opciones (1 correcta + 2 aleatorias)
    const opcionesSet = new Set<string>();
    opcionesSet.add(this.personajeActual.name);

    while (opcionesSet.size < 3) {
      const nombreAleatorio = this.personajes[Math.floor(Math.random() * this.personajes.length)].name;
      opcionesSet.add(nombreAleatorio);
    }

    this.opciones = Array.from(opcionesSet).sort(() => 0.5 - Math.random());
  }

  seleccionar(opcion: string) {
    this.respuestaSeleccionada = opcion;
    this.mostrarRespuesta = true;

    if (opcion === this.personajeActual.name) {
      this.puntos++;
    }

    setTimeout(() => this.nuevaRonda(), 3000); // pasa a la siguiente después de 3 segundos
  }
}
