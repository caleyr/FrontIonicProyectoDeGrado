import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoleccionService {

  apiKey = environment.ApiKeyGoogleMaps;
  mapsLoaded = false;

  constructor() { }
}
