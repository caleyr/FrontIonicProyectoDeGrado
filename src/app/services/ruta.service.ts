import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '../model/Route';
import { environment } from 'src/environments/environment';
import { Comentario } from '../model/Comentario';
import { AnyRecord } from 'dns';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private url : string = 'https://recifacappapi.azurewebsites.net/';
  private urlRoute: string = `${this.url}api/Routes`;

  constructor(private httpClient: HttpClient, private http : HttpService) { }

  obtenerListaRuta(page : number, size : number){
    return this.http.doGet(`${this.urlRoute}/${page}/${size}`);
  }

  obtenerRuta(id : number){
    return this.http.doGet(`${this.urlRoute}/${id}`);
  }

  obtenerRutaActiva(id : number){
    return this.http.doGet(`${this.urlRoute}/GetByIdRecycler/${id}`);
  }

  crearRuta(data : any){
    return this.http.doPost(`${this.urlRoute}`, data);
  }

  agregarComentario(id : number, data : Comentario){
    return this.http.doPost(`${this.urlRoute}/${id}`, data);
  }

  finalizarRuta(id : any){
    return this.http.doPut(`${this.urlRoute}/${id}`, {});
  }

  eliminarRuta(id : any){
    return this.http.doDelete(`${this.urlRoute}/${id}`);
  }
}
