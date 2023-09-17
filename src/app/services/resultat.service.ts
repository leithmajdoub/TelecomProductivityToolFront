import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultat } from '../models/Resultat';

@Injectable({
  providedIn: 'root'
})
export class ResultatService {

  private baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:8089/resultat';
  }

  public findAll(): Observable<Resultat[]> {
    return this.http.get<Resultat[]>(`${this.baseUrl}/listresultat`);
  }

  public createResultat(resultat: Resultat) {
    return this.http.post(`${this.baseUrl}/addresultat`, resultat);
  }

  public deleteResultat(idResultat: number) {
    return this.http.delete(`${this.baseUrl}/deleteunite?idResultat=${idResultat}`);
  }

  public updateResultat(resultat: Resultat) {
    return this.http.put(`${this.baseUrl}/updateresultat`, resultat);
  }

  getResultatById(id: number): Observable<Resultat> {
    return this.http.get<Resultat>(`${this.baseUrl}/findresultat`, {
      params: { idResultat: id.toString() }
    });
  }

}
