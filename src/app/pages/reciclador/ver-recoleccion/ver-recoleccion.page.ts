import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from '@capacitor/storage';
import { AlertController, LoadingController, NavController, MenuController } from '@ionic/angular';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';
import { RutaService } from '../../../services/ruta.service';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { CollectionPoint } from '../../../model/CollectionPoint';
import { Route } from '../../../model/Route';
import { resolve } from 'dns';
import { rejects } from 'assert';
declare var google;

@Component({
  selector: 'app-ver-recoleccion',
  templateUrl: './ver-recoleccion.page.html',
  styleUrls: ['./ver-recoleccion.page.scss'],
})
export class VerRecoleccionPage implements OnInit ,AfterViewInit {

  fabAction = false;
  data = null;
  ruta : Route[] = [];
  puntos : CollectionPoint[] = [];
  puntosActivos : CollectionPoint[] = [];
  listaNueva : CollectionPoint[] = [];

  map : any;
  marker : any;
  @ViewChild('mapVer') divMap: ElementRef;

  ubicacion : string;
  material : string;

  mapOptions = {
    center: {lat: 4.815683 ,lng: -74.353531},    
    zoom: 17,
    disableDefaultUI: true,
    clickableIcons: false
  };

  destino = { lat: 0, lng: 0 }; 

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private puntoRecoleccionService : PuntoRecoleccionService,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private rutaService : RutaService,
    private userService : UserService,
    private apiService : ApiService
    ){
    Geolocation.checkPermissions();
  }

  ngOnInit(){
    this.userService.obtenerInfoReciclador(this.apiService.emailUser).subscribe(data =>{
      if(data.status === 200){      
        this.rutaService.obtenerRutaActiva(data.data.id).subscribe(dataR=>{
          this.ruta = dataR.data;
          for (let index = 0; index < this.ruta.length; index++) {
            if(this.ruta[index].endDate.toString() === '0001-01-01T00:00:00'){
              this.puntos = this.ruta[index].collectionPoints;
              this.cargarRutaActiva(this.ruta[index].id);
            }
          }
        });
      }
    });
  }

  ngAfterViewInit(){
    this.loadMap();
  }

  toggleFab(){
    this.fabAction = !this.fabAction;
  }

  loadMap(){
    this.getPositionNormmal();
  }

  async getPosition(){
    const loading = await this.loadingController.create();
    loading.present();
    this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);
    navigator.geolocation.watchPosition(async (position)=>{
      console.log('La posicion' + JSON.stringify(position));            
      this.puntoRecoleccionService.origin.lat = position.coords.latitude;
      this.puntoRecoleccionService.origin.lng = position.coords.longitude;  
      this.mapOptions.center.lat = position.coords.latitude;
      this.mapOptions.center.lng = position.coords.longitude;      
      if(this.marker === undefined){
        this.marker = new google.maps.Marker({
          position: this.mapOptions.center,
          map: this.map,
        });
      }else{
        this.marker.setPosition(this.mapOptions.center);
      }            
      let geocoder = new google.maps.Geocoder();
      await geocoder.geocode({location : this.mapOptions.center}).then((result)=>{
        const { results } = result;
        this.ubicacion = results[0].formatted_address;
        loading.dismiss();
      });
    },
    (error) =>{
      console.log(error);      
    });
  }

  async getPositionNormmal(){
    const loading = await this.loadingController.create();
    loading.present();
    this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);
    Geolocation.watchPosition(
      {
        enableHighAccuracy: true, timeout: 1000, maximumAge: Infinity
      }, async (position)=>{
      console.log('La posicion' + JSON.stringify(position));            
      this.puntoRecoleccionService.origin.lat = position.coords.latitude;
      this.puntoRecoleccionService.origin.lng = position.coords.longitude;  
      this.mapOptions.center.lat = position.coords.latitude;
      this.mapOptions.center.lng = position.coords.longitude;      
      if(this.marker === undefined){
        this.marker = new google.maps.Marker({
          position: this.mapOptions.center,
          map: this.map,
        });
        
      }else{
        this.marker.setPosition(this.mapOptions.center);
      }
      this.map.panTo(this.mapOptions.center);          
      let geocoder = new google.maps.Geocoder();
      await geocoder.geocode({location : this.mapOptions.center}).then((result)=>{
        const { results } = result;
        this.ubicacion = results[0].formatted_address;
        loading.dismiss();
      });
    });
  }

  async buscarRuta(){    
    if(this.material){
      if(this.material === 'Todos'){
        this.buscarRutaTodos();
      }else{
        this.buscarRutaMaterial();
      }
    }else{       
      this.presentAlert("Selecciona un tipo de material.");
    }
  }

  async buscarRutaMaterial(){
    this.listaNueva = [];
    const loading = await this.loadingController.create();
    loading.present();
    this.data = await this.puntoRecoleccionService.getCollectionPointMaterial(0,10,'Espera',this.material).toPromise();
    console.log(JSON.stringify(this.data));      
    if(this.data.status === 200 && this.data.data.numberOfRecords !== 0){
      //this.puntoRecoleccionService.listaRecoleccion = await this.data.data.records;
      await this.arreglarRuta(this.data.data.records, this.mapOptions.center,);
      setTimeout(async () => {
        this.puntoRecoleccionService.listaRecoleccion = this.listaNueva;
        this.navCtrl.navigateForward('/reciclador/aceptar-recoleccion', { animated: false });        
        await loading.dismiss();
        this.toggleFab();
      }, 2000);
    }else{
      loading.dismiss();
      this.presentAlert("No se encontraron publicaciones.");
    }
  }

  async buscarRutaTodos(){
    this.listaNueva= [];
    const loading = await this.loadingController.create();
    loading.present();
    this.data = await this.puntoRecoleccionService.listaPaginada(0,10,'Espera').toPromise();
    console.log(JSON.stringify(this.data));      
    if(this.data.status === 200 && this.data.data.numberOfRecords !== 0){
      //this.puntoRecoleccionService.listaRecoleccion = await this.data.data.records;
      await this.arreglarRuta(this.data.data.records, this.mapOptions.center);   
      setTimeout(async () => {
        console.log('LISTA NUEVA '+JSON.stringify(this.listaNueva));        
        this.puntoRecoleccionService.listaRecoleccion = this.listaNueva;
        this.navCtrl.navigateForward('/reciclador/aceptar-recoleccion', { animated: false });        
        await loading.dismiss(); 
        this.toggleFab();     
      }, 2000);
    }else{
      loading.dismiss();
      this.presentAlert("No se encontraron publicaciones.");
    }
  }

  async presentAlert(mensaje : string) {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      mode: 'ios',
      header: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  cargarRutaActiva(id : number){
    for (let index = 0; index < this.puntos.length; index++) {
      if(this.puntos[index].state === 'Activo'){
        this.puntoRecoleccionService.getCollectionPoint(this.puntos[index].id).subscribe(data=>{
          const dto : CollectionPoint = data.data;
          const i = index + 1;
          this.puntosActivos.push(dto);     
          if(i === this.puntos.length){
            this.puntoRecoleccionService.id = id;
            this.arreglarRuta(this.puntosActivos, this.mapOptions.center);
            setTimeout(async () => {
              this.puntoRecoleccionService.listaRecoleccion = this.listaNueva;
              this.navCtrl.navigateForward('/reciclador/continuar-recoleccion', { animated: false });
            }, 2000);
          }
        });
      }
    }
  }

  async arreglarRuta(lista : CollectionPoint[], origen : {lat: number ,lng: number}){    
    var min = google.maps.geometry.spherical.computeDistanceBetween(origen, {lat : lista[0].address.latitude, lng : lista[0].address.longitude});  
      var datoMinimo : CollectionPoint;
      var dato = 1;
      var eliminar = 0;
      if(lista.length === 1){
        this.listaNueva.push(lista[0]);
      }else{
        for (let i = 1; i < lista.length; i++) {
          dato = dato + 1;
          const distancia = google.maps.geometry.spherical.computeDistanceBetween(origen, {lat : lista[i].address.latitude, lng : lista[i].address.longitude});
          if (distancia < min) {                   
            eliminar = i;
            datoMinimo = lista[i];
            if(dato === lista.length){
              lista.splice(eliminar,1);
              this.listaNueva.push(datoMinimo);
              if(lista.length !== 0){
                this.arreglarRuta(lista, { lat : datoMinimo.address.latitude, lng : datoMinimo.address.longitude });
              }
            }
          }
        }
      }
  }

}
