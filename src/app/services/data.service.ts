import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DireccionUrl } from '../model/DireccionUrl';
import { Neighborhood } from '../model/Neighborhood';
import { ApiService } from './api.service';
import { Geolocation } from '@capacitor/geolocation';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Coordenada } from '../model/Coordenada';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private HttpClient: HttpClient,
    private apiService: ApiService
    ) {
    }

  getMenuOpts() {
    return this.HttpClient.get<DireccionUrl[]>('/assets/data/menu-admin.json');
  }

  getCamino() {
    return this.HttpClient.get<Neighborhood[]>('/assets/data/tipo-camino.json');
  }
}
