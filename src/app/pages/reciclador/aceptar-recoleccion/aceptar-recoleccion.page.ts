import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { DOCUMENT } from '@angular/common';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { PuntoRecoleccionService } from '../../../services/punto-recoleccion.service';
import { CollectionPoint } from '../../../model/CollectionPoint';
import { UserService } from '../../../services/user.service';
import { ApiService } from '../../../services/api.service';
import { RutaService } from '../../../services/ruta.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { isBuffer } from 'util';
declare var google;

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}
@Component({
  selector: 'app-aceptar-recoleccion',
  templateUrl: './aceptar-recoleccion.page.html',
  styleUrls: ['./aceptar-recoleccion.page.scss'],
})

export class AceptarRecoleccionPage implements AfterViewInit, OnInit{
  fabAction = false;
  loading = null;
  pasa = true;

  map : any;
  @ViewChild('mapAceptar') divMap: ElementRef;
  
  directionsService = new google.maps.DirectionsService();
  directionsDisplay;

  destino: CollectionPoint = null;

  wayPoints: WayPoint[] = null;
  duracion = null;
  distancia = null;

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

  id : any;
  ruta = 
  {
    comment : {
      description : "Ruta Creada",
      date : "2022-05-06T11:30:59.844Z",
      userId: 0
    },
    recycler: 0
  }

  puntos = 
  {
    id: 0,
    typeOfMaterial: '',
    state: "Activo",
    routeId: null
  }

  comentario = 
  {
    description : 'Punto de recoleccion activo.',
    userId : null
  }

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private loadingController: LoadingController,
    private puntoRecoleccionService : PuntoRecoleccionService,
    public navCtrl: NavController,
    private alertController: AlertController,
    private userService : UserService,
    private apiService : ApiService,
    private rutaService : RutaService
  )
   {
  }
  
  ngOnInit(){
    this.cargarDatos();
  }

  cargarDatos(){
    this.cargarReciclador();
    this.cargarDestino();
    this.cargarWayPoint();
  }

  ngAfterViewInit(){
    this.cargar();    
  }

  async cargar(){
    this.loading = await this.loadingController.create();          
    await this.loading.present();
    if(this.wayPoints === null){     
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
    this.loadRoute();
  }

  loadRoute(){
    this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);
    this.calculateRoute();
  }

  async calculateRoute() {
    var route;
    var duration = 0;
    var distance = 0;
      this.directionsService.route({
        origin: this.puntoRecoleccionService.origin,
        destination: this.puntoRecoleccionService.destino,
        waypoints: this.wayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING,
      }, async ( response, status)  => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsDisplay = new google.maps.DirectionsRenderer({
            map: this.map,
            directions: response,
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#5ecca8',
              strokeWeight: 5
            }
          });
          route = await response.routes[0];
          this.makeMarker( this.puntoRecoleccionService.origin, "assets/images/map/market_user.png" );
          for (let index = 0; index < this.wayPoints.length; index++) {
            this.makeMarker(this.wayPoints[index].location , "assets/images/map/market_recycler.png");            
          }
          route.legs.forEach(function (leg) {
            duration += leg.duration.value/60;
            distance += leg.distance.value/1000;
          });
          this.duracion = duration.toFixed(0); 
          this.distancia = distance.toFixed(1);
          this.loading.dismiss();
        } else {
          alert('Could not display directions due to: ' + status);
        }
    });
  }

  makeMarker( position, icon ) {
    new google.maps.Marker({
     position: position,
     map: this.map,
     icon: icon
    });
  }

  cargarDestino(){
    let max = this.puntoRecoleccionService.listaRecoleccion.length - 1;
    this.puntoRecoleccionService.destino.lat = this.puntoRecoleccionService.listaRecoleccion[max].address.latitude;
    this.puntoRecoleccionService.destino.lng = this.puntoRecoleccionService.listaRecoleccion[max].address.longitude;
    this.destino = this.puntoRecoleccionService.listaRecoleccion[max];
  }

  cargarReciclador(){
    this.userService.obtenerInfoReciclador(this.apiService.emailUser).subscribe(data=>{
      this.id = data.data.id;
    });
  }

  cargarWayPoint(){
    this.wayPoints = [];
    this.puntoRecoleccionService.listaRecoleccion.forEach(element => {
      const market : WayPoint =
      {location: 
        { lat: element.address.latitude, 
          lng: element.address.longitude 
        }, 
        stopover: true
      }
      this.wayPoints.push(market);
    });
  }

  async crearRuta() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      message: 'Aceptar la ruta.',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.crearActualizarRuta();       
          }
        }
      ]
    });
    await alert.present();
  }

  crearActualizarRuta(){    
    this.loading.present();
    this.ruta.recycler = this.id;
    this.rutaService.crearRuta(this.ruta).subscribe(
      data =>{
        if(data.status === 201){
          this.forActualizar(data);
        }else{
          this.mensajeError();
        }
      });
  }

  async mensajeError() {
    const alert = await this.alertController.create({
      cssClass:'my-custom-class',
      header: 'Error al crear ruta.',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.navCtrl.navigateForward('/tabs-reciclador/ver-recoleccion', { animated: false });
          }
        }
      ]
    });
    await alert.present();
  }

  actualizar(data, element){
    return new Promise((resolve, reject) => {
      this.puntos.id = element.id;
      this.puntos.typeOfMaterial = element.typeOfMaterial;
      this.puntos.routeId = data.data.id;
      this.puntoRecoleccionService.id = data.data.id;
      resolve(this.puntos);
    });
  }

  async forActualizar(data){
    for (let index = 0; index < this.puntoRecoleccionService.listaRecoleccion.length; index++) {
      const i = index + 1;
      const datosA = await this.actualizar(data, this.puntoRecoleccionService.listaRecoleccion[index]);
      console.log('DATOSSSSA'+JSON.stringify(datosA));
      
      const datosAB = await this.puntoRecoleccionService.actualizarPunto(datosA, 'Espera').toPromise();
      console.log('DATOSSSSAbbb '+datosAB.status);
      if(datosAB.status !== 200){                   
        this.pasa = false;          
        const fin = await this.rutaService.eliminarRuta(data.data.id).toPromise();
        if(fin){
          this.mensajeError();
        }
      }else if(datosAB.status === 200){
        this.crearComentario(this.puntoRecoleccionService.listaRecoleccion[index].resident);
        if(i === this.puntoRecoleccionService.listaRecoleccion.length && this.pasa === true){
          this.navCtrl.navigateForward('/reciclador/continuar-recoleccion', { animated: false });
        }
      }  
    }
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
