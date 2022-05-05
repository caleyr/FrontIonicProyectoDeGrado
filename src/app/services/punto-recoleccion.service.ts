import { Injectable } from '@angular/core';
import { CollectionPoint } from '../model/CollectionPoint';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Address } from '../model/Address';
import { LocalFile } from '../model/LocalFile';
import { tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PuntoRecoleccionService {

  private _refresh$ = new Subject<void>();

  punto = new CollectionPoint();
  format : string = null;
  id = null;

  listaRecoleccion: CollectionPoint[] = [];

  origin = { lat: 0, lng: 0 };
  destino = { lat: 0, lng: 0 };

  private url : string = 'https://recifacappapi.azurewebsites.net/api/'; 
  private urlPunto: string = `${this.url}CollectionPoints`;

  constructor(private HttpClient: HttpClient, private http : HttpService) { }

  get refresh$(){
    return this._refresh$;
  }

  setImagen(imgUrlPunto : any){
    this.punto.image = imgUrlPunto;
  }

  setClasificacion(clasificacion : string){
    this.punto.typeOfMaterial = clasificacion;
  }

  setDescripcion(descripcion : string){
    this.punto.description = descripcion;
    console.log(this.punto);
  }

  setDireccion(direccion : Address){
    this.punto.address = direccion;
  }

  setResidente(id : number){
    this.punto.resident = id;
  }

  setEstado(estado : string){
    this.punto.state = estado;
  }

  agregarCollectionPoint(form : CollectionPoint, format : string) : Observable<any>{
    return this.http.doPostPunto(`${this.urlPunto}/${format}`, form).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  actualizarPunto(data : any, stade : any){
    return this.http.doPut(`${this.urlPunto}/AssignToRoute/${stade}`, data);
  }

  eliminarPunto(id : number) : Observable<any>{
    return this.http.doDelete(`${this.urlPunto}/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  
  listaPaginada(pagina : number, cantidad : number, estado : string){
    return this.http.doGet(`${this.urlPunto}/GetByState/${pagina}/${cantidad}/${estado}`);
  }

  listaPaginadaResidente(pagina : number, cantidad : number, id : number, estado : string){
    return this.http.doGet(`${this.urlPunto}/GetByIdResident/${pagina}/${cantidad}/${id}/${estado}`);
  }

  getCollectionPoint(id : number){
    return this.http.doGet(`${this.urlPunto}/${id}`);
  }

  getCollectionPointMaterial(page : number, cantidad : number, estado : string, material : string){
    return this.http.doGet(`${this.urlPunto}/GetByStateAndType/${page}/${cantidad}/${estado}/${material}`);
  }
}

