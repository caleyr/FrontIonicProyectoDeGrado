import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Shop } from '../../../model/Shop';
import { Address } from '../../../model/Address';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { VerTiedaModalPage } from '../../modal/ver-tieda-modal/ver-tieda-modal.page';
declare var google;

@Component({
  selector: 'app-ver-tienda',
  templateUrl: './ver-tienda.page.html',
  styleUrls: ['./ver-tienda.page.scss'],
})
export class VerTiendaPage implements AfterViewInit {

  map : any;
  @ViewChild('map') divMap: ElementRef;

  mapOptions = {
    center: {lat: 4.808880555805396 ,lng: -74.34592806581227},    
    zoom: 14,
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

  listaTienda : Shop[] = [];

  constructor(
    private user : UserService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap(){    
    this.map = new google.maps.Map(this.divMap.nativeElement, this.mapOptions);
    this.obtenerTienda(); 
  }

  async obtenerTienda(){
    this.user.obteneListaTienda().subscribe(data=>{
      this.listaTienda = data.data;     
      this.crearMarketResidente();
    });    
  }

  async crearMarketResidente(){    
    await this.listaTienda.forEach(element => {
      this.agregarMarket(element);
    });    
  }

  async agregarMarket(tienda : Shop){
    if(tienda.address !== null && Object.keys(tienda.orderList).length !== 0){
      let origen = new google.maps.LatLng(tienda.address.latitude, tienda.address.longitude); 
      let marker = new google.maps.Marker({
        position: origen,
        map: this.map,
        icon : "assets/images/map/market_shop.png",
      });
      marker.addListener("click", () => {
        this.map.setZoom(17);
        this.map.setCenter(marker.getPosition());
        this.modalTienda(tienda);
      });
    }    
  }

  async modalTienda(tienda : Shop){
    const modal = await this.modalController.create({
      component: VerTiedaModalPage,
      mode: 'ios',      
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps:{
        tienda,        
      }
    })
    await modal.present();
  }

  doRefresh(event){
    setTimeout(()=>{
      this.obtenerTienda();
      event.target.complete();
    }, 500);
  }
}
