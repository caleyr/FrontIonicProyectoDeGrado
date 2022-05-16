import { Component, OnInit } from '@angular/core';
import { DireccionUrl } from './model/DireccionUrl';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './services/data.service';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm.service';
const ACCESS_TOKEN_KEY = 'my-access-token';
const NOTIFICATION = 'notify';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  componentes: Observable<DireccionUrl[]>;
  sesion = null;
  suscripcion : Subscription;

  constructor(
    private dataService : DataService,
    public apiService : ApiService,
    private router : Router,
    private platform: Platform,
    private fcmService : FcmService,
    private userService : UserService
    ) {
      this.initializeApp();
        
  }

  async initializeApp(){
    const theme = window.matchMedia('(prefers-color-scheme: dark)');
    console.log(theme.matches);    
    document.body.classList.toggle( 'light' );
    this.platform.ready().then(() => {
      Storage.get({ key: ACCESS_TOKEN_KEY }).then((token) =>{
        this.apiService.currentAccessToken = token.value;
        if(token.value!=null){
          this.apiService.getEmail(this.apiService.currentAccessToken);
          this.apiService.getRole(this.apiService.currentAccessToken);         
          this.fcmService.initPush();
          this.cargarRuta();
          this.componentes = this.dataService.getMenuOpts();
        }
      });
    });
  }



  cargarRuta(){
    if(this.apiService.roleUser === "Administrador"){
      this.router.navigateByUrl('/admin/lista-usuario-admin', { replaceUrl: true });
    }else if(this.apiService.roleUser === "Reciclador"){
      this.router.navigateByUrl('/tabs-reciclador/ver-recoleccion', { replaceUrl: true });
      this.apiService.comprobarNotificacion();
    }else if(this.apiService.roleUser === "isResident"){
      this.router.navigateByUrl('/tabs-residente/crear-publicacion', { replaceUrl: true });
      this.apiService.comprobarNotificacion();
    }else if(this.apiService.roleUser === "isShop"){
      this.router.navigateByUrl('/tabs-tienda/ver-datos-tienda', { replaceUrl: true });
    }
  }
}
