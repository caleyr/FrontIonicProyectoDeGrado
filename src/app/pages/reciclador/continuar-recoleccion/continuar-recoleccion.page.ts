import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController, ModalController, NavController, AlertController } from '@ionic/angular';
import { PuntoRecoleccionService } from 'src/app/services/punto-recoleccion.service';
import { CollectionPoint } from '../../../model/CollectionPoint';
import { FinalizarRecoleccionPage } from '../finalizar-recoleccion/finalizar-recoleccion.page';
import { ImgModalPage } from '../../modal/img-modal/img-modal.page';
import { RutaService } from '../../../services/ruta.service';
import { DataService } from '../../../services/data.service';
import { time } from 'console';
import { UserService } from '../../../services/user.service';
declare var google;

@Component({
  selector: 'app-continuar-recoleccion',
  templateUrl: './continuar-recoleccion.page.html',
  styleUrls: ['./continuar-recoleccion.page.scss'],
})
export class ContinuarRecoleccionPage implements OnInit, AfterViewInit {

  fabAction = false;
  loading = null;

  map : any;
  @ViewChild('mapVerificar') divMap: ElementRef;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: '#5ecca8',
      strokeWeight: 5
    }
  });;

  destino: CollectionPoint = new CollectionPoint();

  duracion = null;
  distancia = null;
  cantidad = 0;
  boton = true;
  watch= null;
  tiempo = 6000;
  salir = false
  finalizar = false;

  mapOptions = {
    center: {lat: 0, lng: 0},
    zoom: 15,
    disableDefaultUI: true,
    clickableIcons: false,
    styles: [ 
      { 
        featureType : "poi.business", 
        stylers : [ 
          { visibility : "off" } 
        ] 
      } 
    ]
  }

  puntos = 
  {
    id: 0,
    typeOfMaterial: '',
    state: "Finalizado",
    routeId: null
  }

  idResidente = null;

  comentario = 
  {
    description : 'Punto de recoleccion finalizado.',
    userId : null
  }

  markerOri = new google.maps.Marker({
    icon: "assets/images/map/market_user.png"
  });
  markerDest = new google.maps.Marker({
    icon: "assets/images/map/market_recycler.png"
  });



  constructor(
    private puntoRecoleccionService : PuntoRecoleccionService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private loadingController: LoadingController,
    public navCtrl: NavController,
    private modalController: ModalController,
    private rutaService : RutaService,
    private dataService : DataService,
    private alertController : AlertController,
    private userService : UserService
    ) { 
       
    }

  ngOnInit() {
    this.cargarDestino();
  }

  ngAfterViewInit(){    
    this.cargar();
  }

  async cargar(){
    this.loading = await this.loadingController.create();          
    await this.loading.present();
    if(this.destino === undefined){     
      setTimeout(() => {
        this.cargar();
      }, 250);
    }else{
      this.loadMap();
    }
  }

  toggleFab(){
    this.fabAction = !this.fabAction;
  }

  async loadMap() {
    this.loadRouteNormal();
  } 

  async loadRouteNormal(){
    const position = await Geolocation.getCurrentPosition(
      {
        enableHighAccuracy: true, timeout: 1000, maximumAge: Infinity
      }
    );

    if(position){
      this.mapOptions.center.lat = position.coords.latitude;
      this.mapOptions.center.lng = position.coords.longitude;      
      this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);        
      await this.calculateRouteNormal();
    }    
  }

  async loadRoute(){
    navigator.geolocation.getCurrentPosition(async position =>{
      this.mapOptions.center.lat = position.coords.latitude;
      this.mapOptions.center.lng = position.coords.longitude;      
      this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);        
      await this.calculateRoute();
      },
      (err) =>{
        console.log(err);        
      }
    );
  }


  async calculateRouteNormal() {    
    this.watch = this.directionsDisplay.setMap(this.map);    
    this.markerDest.setMap(this.map);
    this.markerOri.setMap(this.map);
    Geolocation.watchPosition({
      enableHighAccuracy: true, timeout: 6000, maximumAge: Infinity
    },async position =>{        
      setTimeout(async () => {
        console.log('Tiempo ' + this.tiempo)
        this.puntoRecoleccionService.origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        if(this.salir !== true){
          await this.asignarRecorrido();
        }   
      }, this.tiempo);
    });
  }

  async calculateRoute() {
    this.directionsDisplay.setMap(this.map);    
    this.markerDest.setMap(this.map);
    this.markerOri.setMap(this.map);
    navigator.geolocation.watchPosition(async position =>{        
      this.puntoRecoleccionService.origin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);        
      await this.asignarRecorrido();
    },
    (error)=>{
      console.log(error);      
    });
  }

  async asignarRecorrido(){ 
    var route;
    var duration = 0;
    var distance = 0;
    this.directionsService.route({
      origin: this.puntoRecoleccionService.origin,
      destination: this.puntoRecoleccionService.destino,
      travelMode: google.maps.TravelMode.WALKING,
    }, async ( response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.tiempo = 6000;
        this.directionsDisplay.setDirections(response);
        route = await response.routes[0];
        this.markerOri.setPosition(this.puntoRecoleccionService.origin);
        this.markerDest.setPosition(this.puntoRecoleccionService.destino);        
        route.legs.forEach(function (leg) {
          duration += leg.duration.value/60;
          distance += leg.distance.value/1000;
        });
        this.duracion = duration.toFixed(0); 
        this.distancia = distance.toFixed(1);
        if(distance <= 0.01){
          this.boton = false;
        }else{
          this.boton = true;
        }
        this.loading.dismiss();
      } else {
        this.tiempo = 8500;
        console.log('Fallo ' + this.tiempo);       
      }
    });
  }

  makeMarker( position, icon ) {
    
  }


  async cargarDestino(){
    let max = this.puntoRecoleccionService.listaRecoleccion.length - 1;
    console.log(max);
    console.log(this.cantidad);
    
    if(this.cantidad <= max){
      this.puntos.id = this.puntoRecoleccionService.listaRecoleccion[this.cantidad].id;
      this.puntos.typeOfMaterial = this.puntoRecoleccionService.listaRecoleccion[this.cantidad].typeOfMaterial;
      this.idResidente = this.puntoRecoleccionService.listaRecoleccion[this.cantidad].resident;
      this.puntoRecoleccionService.destino.lat = this.puntoRecoleccionService.listaRecoleccion[this.cantidad].address.latitude;
      this.puntoRecoleccionService.destino.lng = this.puntoRecoleccionService.listaRecoleccion[this.cantidad].address.longitude;
      this.destino = this.puntoRecoleccionService.listaRecoleccion[this.cantidad];
      if(this.cantidad == max){
        this.finalizar = true;
      }else{
        this.cantidad++;
      }
    }    
  }


  async confirmarPuntoMsj() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Confirmar Recolección.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.confirmarEstado();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarEstado(){
    this.loading = await this.loadingController.create();
    this.loading.present();
    this.puntos.routeId = this.puntoRecoleccionService.id;
    const data = await this.puntoRecoleccionService.actualizarPunto(this.puntos, 'Activo').toPromise();
    if( data.status === 200 ){
      this.crearComentario(this.idResidente);
      await this.cargarDestino();
      this.boton = true;
      await this.asignarRecorrido();
    }else{
      this.loading.dismiss();
    }
  }

  async confirmarRutaMsj() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Confirmar Ruta.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.confirmarRuta();
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarRuta(){    
    this.loading = await this.loadingController.create();
    this.loading.present();
    this.puntos.routeId = await this.puntoRecoleccionService.id;
    const data = await this.puntoRecoleccionService.actualizarPunto(this.puntos, 'Activo').toPromise();
    if( data.status === 200 ){
      this.crearComentario(this.idResidente);
      const dataD = await this.rutaService.finalizarRuta(this.puntoRecoleccionService.id).toPromise();
      if( dataD.status === 202 ){       
        this.loading.dismiss();
        this.navCtrl.navigateForward('/reciclador/finalizar-recoleccion', { animated: false });
        this.salir = true;
      }else{
        this.loading.dismiss();
      }
    }else{
      this.loading.dismiss();
    }
  }

  async modalImagen(img){
    const modal = await this.modalController.create({
      component: ImgModalPage,
      componentProps:{
        img
      },
      cssClass: 'image_modal'
    })
    await modal.present();
  }

  crearComentario(idResidente : number){
    this.userService.obtenerResident(idResidente).subscribe(data=>{
      if(data.status ===200){
        this.comentario.userId = data.data.user.id;
        this.userService.crearComentario(this.comentario).subscribe();
      }
    });
  }
}
