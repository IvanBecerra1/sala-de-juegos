import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPais } from '../models/interfaces/ipais';


@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {
  private http : HttpClient = inject(HttpClient);
  private URL_BASE : string = "https://restcountries.com/v3.1/all";

  /**
   * FUNCION
   * - PIPE: Para manipular el OBSERVABLE que devuelve el GET
   *        nos permite manipular con diferentes metodos slice, map, 
   *         (como filter, catchError, tap, switchMap, map etc.).
   *        Actua antes de llegar al HTTPS.
   * 
   * - MAP: es un operador para transformar Datos, en este caso el arreglo
   * 
   * 
   * @returns 
   */
  obtenerPais()  : Observable<IPais[]> {
    return this.http.get<any[]>(this.URL_BASE).pipe(
      map((pais)=> pais
                        .sort(() => 0.5 * Math.random()) // mezcla los paises 
                        .slice(0, 10) // corta la matriz a solo 10
                        .map((pais)=>({ // 
                            nombre : pais.name.common,
                            bandera : pais.flags.png
                        }))
                        
    ));
  }

}
