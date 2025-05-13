import { Component, inject, OnInit } from '@angular/core';
import { PreguntadosService } from '../../../servicio/preguntados.service';
import { IPais } from '../../../models/interfaces/ipais';
import { GuardarResultadoService } from '../../../servicio/guardar-resultado.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
  
})
export class PreguntadosComponent implements OnInit {
  private resultadosServicios : GuardarResultadoService = inject(GuardarResultadoService);
  private paisServicio : PreguntadosService = inject(PreguntadosService);

  public preguntas : any[] = [];
  public preguntaActual : number = 0;
  public respuestaSeleccionada : string | null = null;
  public puntos : number = 0;
  public mostrarResultado : boolean = false;
  public vidas = 3;

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


  async seleccionarOpcion(opcion : string){
    this.respuestaSeleccionada = opcion;

    if (opcion === this.preguntas[this.preguntaActual].pais.nombre) {
      this.puntos++;
    }
    else {
      this.vidas--;

      await this.mostrarResultados();
    }
    setTimeout(() => this.siguientePregunta(), 1000); 

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

  async mostrarResultados(){
    if (this.vidas){
      return;
    }
    await this.resultadosServicios.procesoGuardado(this.puntos, "preguntados");;
    this.mostrarResultado = true;
    this.vidas = 3;
    console.log("puntos guardados: " + this.puntos);
  }
  async reiniciarJuego(){
    this.mostrarResultado = false;
    this.puntos = 0;
    this.preguntaActual = 0;
    this.respuestaSeleccionada = null;
    this.iniciarPreguntados();
  }

  obtenerClaseBoton(opcion: string): string {
    if (!this.respuestaSeleccionada) {
      return 'btn btn-primary';
    }
  
    if (opcion === this.preguntas[this.preguntaActual].pais.nombre) {
      return 'btn btn-success';
    }
  
    if (opcion === this.respuestaSeleccionada && opcion !== this.preguntas[this.preguntaActual].pais.nombre) {
      return 'btn btn-danger';
    }
  
    return 'btn btn-secondary'; 
  }
}
