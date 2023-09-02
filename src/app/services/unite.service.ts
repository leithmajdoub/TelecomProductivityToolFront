import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unite } from '../models/Unite';

@Injectable({
  providedIn: 'root'
})

export class UniteService {

  private baseUrl: String;

  constructor(private http: HttpClient) { 
    this.baseUrl = 'http://localhost:8089/unite';
  }

  public findAll(): Observable<Unite[]> {
    return this.http.get<Unite[]>(`${this.baseUrl}/listunites`);
  }

  public createUnite(unite: Unite) {
    return this.http.post(`${this.baseUrl}/addunite`, unite);
  }

  public deleteUnite(uniteId: number) {
    return this.http.delete(`${this.baseUrl}/deleteunite?idUnite=${uniteId}`);
  }

  public updateUnite(unite: Unite) {
    return this.http.put(`${this.baseUrl}/updateunite`, unite);
  }

  getUniteById(id: number): Observable<Unite> {
    return this.http.get<Unite>(`${this.baseUrl}/findunite`, {
      params: { idUnite: id.toString() }
    });
  }
}

