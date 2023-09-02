import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activite } from '../models/Activite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8089/activite';
   }

   public findAll(): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.baseUrl}/listactivites`);
  }

  public createActivite(activite: Activite) {
    return this.http.post(`${this.baseUrl}/addactivite`, activite);
  }

  public updateActivite(activite: Activite) {
    return this.http.put(`${this.baseUrl}/updateactivite`, activite);
  }

  public deleteActivite(activiteId: number) {
    return this.http.delete(`${this.baseUrl}/deleteactivite?idActivite=${activiteId}`);
  }
}
