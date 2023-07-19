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
    this.baseUrl = 'http://localhost:8080/unite';
  }

  public findAll(): Observable<Unite[]> {
    return this.http.get<Unite[]>(`${this.baseUrl}`);
  }

  public createUnite(unite: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, unite);
  }

}
