import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPersonajes } from '../models/interfaces/ipersonajes';

@Injectable({
  providedIn: 'root'
})
export class DragonballService {
  private https : HttpClient = inject(HttpClient);
  private URL_BASE : string = "https://dragonball-api.com/api/characters?page=2&limit=20";

  obtenerPersonajes(): Observable<IPersonajes[]> {
    return this.https.get<any>(this.URL_BASE).pipe(
      map(res => res.items), 
      map(personajes =>
        personajes.map((p: any) => ({
          id: p.id,
          name: p.name,
          image: p.image
        }))
      )
    );
  }
}
