import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Analyse } from '../models/Analyse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  private baseUrl: String;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8089/analyse';
   }

   public findAll(): Observable<Analyse[]> {
    return this.http.get<Analyse[]>(`${this.baseUrl}/listanalyses`);
  }

  public createAnalyse(analyse: Analyse) {
    return this.http.post(`${this.baseUrl}/addanalyse`, analyse);
  }

  public updateAnalyse(analyse: Analyse) {
    return this.http.put(`${this.baseUrl}/updateanalyse`, analyse);
  }

  public deleteAnalyse(analyseId: number) {
    return this.http.delete(`${this.baseUrl}/deleteanalyse?idanalyse=${analyseId}`);
  }
}
