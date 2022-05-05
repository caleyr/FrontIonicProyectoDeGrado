import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Storage } from '@capacitor/storage';
import { switchMap, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { ToastController, ToastOptions } from '@ionic/angular';
const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';
const NOTIFICATION = 'notify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url : string = `https://recifacappapi.azurewebsites.net/api/accounts`;

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  emailUser = null;
  roleUser = null;
  

  constructor(
    private http: HttpClient, 
    private router: Router,
    private httpService : HttpService,
    private userService : UserService,
    private toastController : ToastController
    ) {
  }

  async cargarToken() {
    const token = await Storage.get({ key: ACCESS_TOKEN_KEY });
    if (token && token.value) {
      this.currentAccessToken = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getEmail (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return this.emailUser = JSON.parse(jsonPayload).email;
  }

  getNotificacionRecycler(){
    let datos : Comment[] = [];
    this.userService.obtenerInfoReciclador(this.emailUser).subscribe(data =>{      
      const id = data.data.user.id;
      this.userService.obtenerListaComentario(id).subscribe(data=>{
        if(data.status === 200){
          datos = data.data;      
          Storage.set({key: NOTIFICATION, value: datos.length.toString()});
          if(datos.length !== 0){     
            this.presentToast();
          } 
        }
      })
    });
  }

  getNotificacionResident(){
    let datos : Comment[] = [];
    this.userService.obtenerInfoResidente(this.emailUser).subscribe(data =>{      
      const id = data.data.user.id;
      this.userService.obtenerListaComentario(id).subscribe(data=>{
        if(data.status === 200){
          datos = data.data;
          Storage.set({key: NOTIFICATION, value: datos.length.toString()});
          if(datos.length !== 0){
            this.presentToast();
          }    
        }
      })
    });
  }

  comprobarNotificacion(){
    setTimeout(() => {
      if(this.roleUser === "Reciclador"){
        this.cargarNotificacionRecycler();
        this.comprobarNotificacion();
      }else if(this.roleUser === "isResident"){
        this.cargarNotificacionResident();
        this.comprobarNotificacion();
      }
    }, 10000);
  }

  cargarNotificacionRecycler(){
    let datos : Comment[] = [];
    Storage.get({ key: NOTIFICATION }).then((notificacion) =>{
      this.userService.obtenerInfoReciclador(this.emailUser).subscribe(data =>{
        this.userService.obtenerListaComentario(data.data.user.id).subscribe(data=>{
          if(data.status === 200){
            datos = data.data;
            if(parseInt(notificacion.value) !== datos.length && notificacion.value !== undefined){
              Storage.set({key: NOTIFICATION, value: datos.length.toString()});              
              this.presentToast();
              if(this.router.url === '/reciclador/ver-comentario-reciclador'){
                this.userService.obtenerListaNotificacion();
              }         
            }
          }
        });
      });
    });
  }

  cargarNotificacionResident(){
    let datos : Comment[] = [];
    Storage.get({ key: NOTIFICATION }).then((notificacion) =>{
      this.userService.obtenerInfoResidente(this.emailUser).subscribe(data =>{
        this.userService.obtenerListaComentario(data.data.user.id).subscribe(data=>{
          if(data.status === 200){
            datos = data.data;
            if(parseInt(notificacion.value) !== datos.length && notificacion.value !== undefined){
              Storage.set({key: NOTIFICATION, value: datos.length.toString()}); 
              this.presentToast();
              if(this.router.url === '/residente/ver-comentario-residente'){
                this.userService.obtenerListaNotificacion();
              }
            }
          }
        });
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 
      'Tienes notificaciones nuevas.',
      duration: 3000,      
    });
    toast.present();
  }

  getRole (token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return this.roleUser = JSON.parse(jsonPayload).role;
  }
  
  login(UserCredentials: {email, password}): Observable<any> {
    return this.httpService.doPost(`${this.url}/Login`, UserCredentials).pipe(
      switchMap(async (tokens : any) => {
        this.currentAccessToken = tokens.data.token;
        await this.getEmail(this.currentAccessToken);
        const comprobar = await this.getRole(this.currentAccessToken);
        if(comprobar === 'Reciclador'){
          this.getNotificacionRecycler();
        }else if(comprobar === 'isResident'){
          this.getNotificacionResident();
        }
        const storeAccess = Storage.set({key: ACCESS_TOKEN_KEY, value: tokens.data.token});
        const storeRefresh = Storage.set({key: REFRESH_TOKEN_KEY, value: tokens.data.token});
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
    /*return this.http.post(`${this.url}/Login` , UserCredentials).pipe(
      switchMap((tokens: {token}) => {
        this.currentAccessToken = tokens.token;
        this.getEmail(this.currentAccessToken);
        this.getRole(this.currentAccessToken);
        const storeAccess = Storage.set({key: ACCESS_TOKEN_KEY, value: tokens.token});
        const storeRefresh = Storage.set({key: REFRESH_TOKEN_KEY, value: tokens.token});
        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )*/
  }

  getNewAccessToken() {    
    const refreshToken = from(Storage.get({ key: REFRESH_TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: `Bearer ${token.value}`
            })
          }
          return this.http.get(`${this.url}/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    //this.parseJwt(this.currentAccessToken);
    return from(Storage.set({key: ACCESS_TOKEN_KEY, value: accessToken}));
  }
  
  cerrarSesion() {
    return this.http.post(`${this.url}/logout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        this.emailUser = null;
        this.roleUser = null;
        // Remove all stored tokens
        const deleteAccess = Storage.remove({key: ACCESS_TOKEN_KEY});
        const deleteRefresh = Storage.remove({key: REFRESH_TOKEN_KEY});
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      })
    ).subscribe();
  }

  async logOut(){
    this.currentAccessToken = null;
    this.emailUser = null;
    this.roleUser = null;
    Storage.remove({key: ACCESS_TOKEN_KEY});
    Storage.remove({key: REFRESH_TOKEN_KEY});
    Storage.remove({key: NOTIFICATION});
    Storage.clear();
    await this.router.navigate(['/login']);
    window.location.reload();
  }
}
