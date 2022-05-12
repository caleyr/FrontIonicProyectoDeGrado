import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, Input, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Address } from '../../../model/Address';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
import { VerDatosResidentePage } from '../../residente/ver-datos-residente/ver-datos-residente.page';
declare var google;

@Component({
  selector: 'app-confirmar-direccion',
  templateUrl: './confirmar-direccion.page.html',
  styleUrls: ['./confirmar-direccion.page.scss'],
})
export class ConfirmarDireccionPage implements AfterViewInit {

  map : any;
  marker: any;
  infowindow: any;
  positionSet: any;
  position: any;

  mapOptions : any;

  @Input('direccion')direccion: Address;
  @Input('estado')estado: string;
  @Input('id')id: number;
  @Input('rol')rol: string;

  @ViewChild('map') divMap: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    public modalController: ModalController,
    private userService : UserService,
    private alertController: AlertController,
    private router: Router,
    private loadingController : LoadingController
    ) {
      loadingController.create();
   }

  ngAfterViewInit() {
    this.loadingController.dismiss();
    this.position = {  
      lat: this.direccion.latitude,
      lng: this.direccion.longitude
    };
    this.mapOptions = {
      center: this.position,
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
    };    
    this.loadMap();
  }

  loadMap(){
    this.initMap();
  }

  initMap() {  
    const mapEle: HTMLElement = document.getElementById('map');
    this.map = new google.maps.Map(mapEle, this.mapOptions);
    this.marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: false,
          icon : "assets/images/map/market_user.png"
    });
    this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow();
    this.addMarker(this.position);
  }

  clickHandleEvent() {
      this.map.addListener('click', (event: any) => {
            const position = {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
            };
            this.addMarker(position);
      });
  }


  addMarker(position: any): void {
      let latLng = new google.maps.LatLng(position.lat, position.lng);
      this.marker.setPosition(latLng);
      this.map.panTo(position);
      this.positionSet = position;
      this.direccion.latitude = position.lat;
      this.direccion.longitude = position.lng;
  }

  crearDireccion(){
    if(this.estado === 'crear' || this.estado === 'crearPunto'){
      if(this.rol === 'residente'){
        this.userService.guardarDireccionResidente(this.id, this.direccion).subscribe();
        this.presentAlert('Direccion Creada.');
      }else{
        this.userService.guardarDireccionTienda(this.id, this.direccion).subscribe();
        this.presentAlert('Direccion Creada.');
      }
    }else{
      this.userService.actualizarDireccion(this.id, this.direccion).subscribe();
      this.presentAlert('Direccion Actualizada.');
    }
  }

  async presentAlert(mensaje : string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: mensaje,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: (blah) => {
            if(this.estado === 'crearPunto'){
              this.router.navigateByUrl('/residente/crear-punto-recoleccion/agregar-direccion-recoleccion', { replaceUrl: true });
            }else{
              if(this.rol === 'residente'){
                this.router.navigateByUrl('/residente/ver-datos-residente', { replaceUrl: true });
              }else{
                this.router.navigateByUrl('/tienda/ver-datos-tienda', { replaceUrl: true });
              }
            }
            
            modalController.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }


}
