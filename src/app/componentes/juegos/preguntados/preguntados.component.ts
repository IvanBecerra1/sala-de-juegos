import { Component, inject, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../servicio/preguntados.service';
import { IPais } from '../../../models/interfaces/ipais';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
  
})
export class PreguntadosComponent implements OnInit {

  private paisServicio : PreguntadosService = inject(PreguntadosService);

  public preguntas : any[] = [];
  public preguntaActual : number = 0;
  public respuestaSeleccionada : string | null = null;
  public puntos : number = 0;
  public mostrarResultado : boolean = false;


  ngOnInit(): void {
    this.iniciarPreguntados();
  }

  iniciarPreguntados() {

    this.paisServicio.obtenerPais().subscribe(pais =>{
      this.preguntas = this.generarPreguntas(pais);
    });
  }

  generarPreguntas(paises : IPais[]) : any[]{
    return paises.map((pais)=>{
      const opciones = this.generarOpciones(pais, paises)

      return {
        pais,
        opciones
      }
    })
  }

  generarOpciones(correcto : IPais, todos : IPais[]) : string[] {
    const opciones = [correcto.nombre];

    while (opciones.length < 3){
      let aleatorio = todos[Math.floor(Math.random() * todos.length)].nombre;

      if (!opciones.includes(aleatorio)){
        opciones.push(aleatorio); 
      }
    }
    return opciones.sort(() => 0.5 - Math.random());
  }


  seleccionarOpcion(opcion : string){
    this.respuestaSeleccionada = opcion;

    if (opcion === this.preguntas[this.preguntaActual].pais.nombre) {
      this.puntos++;
    }
    setTimeout(() => this.siguientePregunta(), 1000); // Puse 1000ms (1s) por ejemplo

  }

  siguientePregunta(){
    if (this.preguntaActual < this.preguntas.length - 1 ){
      this.preguntaActual++;
      this.respuestaSeleccionada = null;
    }
    else {
      this.mostrarResultado = true;
    }

    
  }

  reiniciarJuego(){
    this.preguntaActual = 0;
    this.puntos = 0;
    this.mostrarResultado = false;
    
    this.respuestaSeleccionada = null;
    this.iniciarPreguntados();
  }
}
