import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MayormenorService {
  private http = inject(HttpClient);
  private baseUrl = 'https://deckofcardsapi.com/api/deck';


  public obtenerNuevoMazo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/new/shuffle/?deck_count=1`);
  }

  public extraerCarta(deckId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${deckId}/draw/?count=1`);
  }

  public obtenerValorCarta(valor: string): number {
    switch (valor) {
      case 'ACE': return 14;
      case 'KING': return 13;
      case 'QUEEN': return 12;
      case 'JACK': return 11;
      default: return parseInt(valor); // Cartas numéricas
    }
  }

}
