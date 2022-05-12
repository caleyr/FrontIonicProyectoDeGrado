import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/User';
import { environment } from 'src/environments/environment';
import { Address } from '../model/Address';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Storage } from '@capacitor/storage';
import { Shop } from '../model/Shop';
import { Recycler } from '../model/Recycler';
import { Resident } from '../model/Resident';
import { Order } from 'src/app/model/Order';
import { Historial } from '../model/Historial';
import { HttpService } from './http.service';
import { Image } from '../model/Image';
import { EmailValidator } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private _refresh$ = new Subject<void>();
   private _refreshComment$ = new Subject<void>();

   private url : string ='https://recifacappapi.azurewebsites.net/api/'

   private urlUser: string = `${this.url}users`;

   private urlResidente: string = `${this.url}residents`;
   private urlReciclador: string = `${this.url}recyclers`;
   private urlTienda: string = `${this.url}shops`;
   private urlMaterial: string = `${this.url}orders`;

   private urlDireccion: string = `${this.url}address`;

   private urlRegistro: string = `${this.url}accounts`;

   private urlComentario: string = `${this.url}Comments`;


   usuarioResidente : Resident;   
   usuarioReciclador : Recycler;   
   usuarioTienda : Shop;
   direccion : Address;
   listaMaterial : Order[];
   historial : Historial[] = [];
   material : Order;

  constructor(
    private http: HttpClient,
    private htt : HttpService
    ) {
  }

  get refresh$(){
    return this._refresh$;
  }

  get refreshComment$(){
    return this._refreshComment$;
  }

  //USUARIO

  obtenerListaUsuario(){
    return this.htt.doGet(`${this.urlUser}`);
  }

  obtenerUsuario(idUsuario : number){
    return this.htt.doGet(`${this.urlUser}/${idUsuario}`);
  }

  cambiarEstado(email : string, estado : boolean){
    return this.htt.doPutEstado(`${this.urlUser}/Activate/${email}/${estado}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  verificarCorreo(email : string, code : string){
    return this.htt.doPostUser(`${this.urlRegistro}/ConfirmEmail/${email}/${code}`);
  }

  actualizarContraseña(code : string, data : any){
    return this.htt.doPost(`${this.urlRegistro}/ChangePassword/${code}`, data);
  }

  recuperarPasswordEmail(email : any){
    return this.htt.doPostUser(`${this.urlRegistro}/SendPasswordChangeCode/${email}`);
  }

  verificarCorreoExistente(email : any){
    return this.htt.doGet(`${this.urlUser}/VerifyIsPresent/${email}`);
  }


  //COMENTARIO

  obtenerListaComentario(id : number){
    return this.htt.doGet(`${this.urlComentario}/${id}`);
  }

  obtenerListaNotificacion(){
    this._refreshComment$.next();
  }

  crearComentario(data : {description : string, userId : number}){
    return this.htt.doPost(`${this.urlComentario}`, data);
  }

  eliminarComentario(id: number){
    return this.htt.doDelete(`${this.urlComentario}/${id}`);
  }



  //RESIDENTE


  obtenerResident(id : number){
    return this.htt.doGet(`${this.urlResidente}/GetById/${id}`);
  }


  obtenerResidente(idUsuario : number){
    return this.htt.doGet(`${this.urlResidente}/GetUserById/${idUsuario}`);
  }

  obtenerInfoResidente(correo : string){
    return this.htt.doGet(`${this.urlResidente}/GetByEmail/${correo}`);
  }

  guardarResident(resident : Resident){
    return this.htt.doPost(`${this.urlResidente}`, resident);
  }

  updateResident(resident : Resident, idUsuario : number) : Observable<any>{
    return this.htt.doPut(`${this.urlResidente}/${idUsuario}`, resident).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }


  //RECICLADOR


  obtenerReciclador(idUsuario : number){
    return this.htt.doGet(`${this.urlReciclador}/GetById/${idUsuario}`);
  }

  obtenerRecicladorUser(idUsuario : number){
    return this.htt.doGet(`${this.urlReciclador}/GetUserById/${idUsuario}`);
  }

  guardarRecycler(recycler : Recycler){
    return this.htt.doPost(`${this.urlReciclador}`, recycler);
  }

  obtenerInfoReciclador(correo : string){
    return this.htt.doGet(`${this.urlReciclador}/GetUserByEmail/${correo}`);
  }

  updateResycler(reciclador : Recycler, idUsuario : number) : Observable<any>{
    return this.htt.doPut(`${this.urlReciclador}/${idUsuario}`, reciclador).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }


  //TIENDA


  obtenerTienda(idUsuario : number){
    return this.htt.doGet(`${this.urlTienda}/GetUserById/${idUsuario}`);
  }  

  obteneListaTienda(){
    return this.htt.doGet(`${this.urlTienda}/GetAllList`);
  }

  guardarShop(shop : Shop){
    return this.htt.doPost(`${this.urlTienda}/Insert`, shop);
  }

  obtenerInfoTienda(correo : string){
    return this.htt.doGet(`${this.urlTienda}/GetByEmail/${correo}`);
  }

  updateShop(shop : Shop, idUsuario : number) : Observable<any>{
    return this.htt.doPut(`${this.urlTienda}/${idUsuario}`, shop).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  agregarImage(id : number, extension : string, img : Image) : Observable<any>{
    return this.htt.doPutImg(`${this.urlTienda}/UpdateImageJson/${id}/${extension}`, img).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }


  //DIRECCION

  obtenerDireccion(idUsuario : number){
    return this.htt.doGet(`${this.urlUser}/address/${idUsuario}`);
  }

  guardarDireccionResidente(idResidente : number, direccion : Address): Observable<any>{
    return this.htt.doPost(`${this.urlDireccion}/AddAddressToResident/${idResidente}`, direccion)
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      )
  }

  guardarDireccionTienda(idTienda : number, direccion : Address) : Observable<any>{
    return this.htt.doPost(`${this.urlDireccion}/AddAddressToShop/${idTienda}`, direccion)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  actualizarDireccion(id: number, direccion : Address) : Observable<any>{
    return this.htt.doPut(`${this.urlDireccion}/${id}`, direccion).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }
  
  eliminarDireccion(id: number){
    return this.htt.doDelete(`${this.urlDireccion}/${id}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  //MATERIAL

  guardarMaterial(idTienda : number, material : Order) : Observable<any>{
    let or : Order[] = [];
    or.push(material)
    return this.htt.doPost(`${this.urlMaterial}/${idTienda}`, or)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  actualizarMaterial(id : number, material : Order) : Observable<any>{
    return this.htt.doPut(`${this.urlMaterial}/${id}`, material)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }

  eliminarMaterial(id: number) : Observable<any>{
    return this.htt.doDelete(`${this.urlMaterial}/${id}`)
    .pipe(
      tap(() => {
        this._refresh$.next();
      })
    )
  }
}
